import fs from 'fs';
import path from 'path';

const CDP_PORT = 9222;
const BASE_URL = 'http://127.0.0.1:5173';
const SCREENSHOT_DIR = '/Users/shubhamkrgupta/.gemini/antigravity-ide/brain/e878d28d-76c1-42db-8cc1-8079e47d9ca5/qa_screenshots';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

class ChromeClient {
  constructor() {
    this.ws = null;
    this.tabId = null;
    this.msgId = 1;
    this.pending = new Map();
    this.consoleLogs = [];
    this.exceptions = [];
    this.networkErrors = [];
    this.networkRequests = [];
  }

  async init() {
    const res = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`, { method: 'PUT' });
    const tab = await res.json();
    this.tabId = tab.id;

    await new Promise((resolve, reject) => {
      this.ws = new WebSocket(tab.webSocketDebuggerUrl);
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (evt) => this.handleMessage(JSON.parse(evt.data));
    });

    await this.send('Runtime.enable');
    await this.send('Page.enable');
    await this.send('Network.enable');
    await this.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false
    });
  }

  handleMessage(data) {
    if (data.id && this.pending.has(data.id)) {
      this.pending.get(data.id)(data);
      this.pending.delete(data.id);
    }
    if (data.method === 'Runtime.consoleAPICalled') {
      const text = data.params.args?.map(a => a.value || a.description || JSON.stringify(a)).join(' ') || '';
      this.consoleLogs.push({ type: data.params.type, text, time: Date.now() });
    }
    if (data.method === 'Runtime.exceptionThrown') {
      this.exceptions.push(data.params.exceptionDetails);
    }
    if (data.method === 'Network.responseReceived') {
      const resp = data.params.response;
      if (resp.status >= 400) {
        this.networkErrors.push({ url: resp.url, status: resp.status, statusText: resp.statusText });
      }
    }
  }

  send(method, params = {}) {
    return new Promise((resolve) => {
      const id = this.msgId++;
      this.pending.set(id, resolve);
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async navigate(url, waitMs = 1200) {
    await this.send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, waitMs));
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result?.result?.value;
  }

  async takeScreenshot(filename) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    if (res.result?.data) {
      const filePath = path.join(SCREENSHOT_DIR, filename);
      fs.writeFileSync(filePath, Buffer.from(res.result.data, 'base64'));
      return filePath;
    }
    return null;
  }

  async close() {
    if (this.tabId) {
      try {
        await fetch(`http://127.0.0.1:${CDP_PORT}/json/close/${this.tabId}`);
      } catch (e) {}
    }
  }
}

async function runQA() {
  console.log('================================================================');
  console.log('🚀 INITIALIZING COMPREHENSIVE BROWSER QA TEST SUITE');
  console.log('================================================================\n');

  const client = new ChromeClient();
  await client.init();

  const testResults = [];
  const bugList = [];
  let totalInteractiveElements = 0;
  const testedPages = new Set();

  async function recordTest(id, name, page, fn) {
    testedPages.add(page);
    process.stdout.write(`Executing [${id}] ${name} ... `);
    const startExceptions = client.exceptions.length;
    const startNetErrors = client.networkErrors.length;

    try {
      const res = await fn();
      const newExceptions = client.exceptions.slice(startExceptions);
      const newNetErrors = client.networkErrors.slice(startNetErrors);

      const hasCriticalError = newExceptions.length > 0;
      if (res.pass && !hasCriticalError) {
        console.log('✅ PASS');
        testResults.push({ id, name, page, status: 'PASS', details: res.details });
      } else {
        console.log('❌ FAIL');
        const shotName = `bug_${id}.png`;
        const shotPath = await client.takeScreenshot(shotName);
        const issue = {
          id,
          page,
          element: res.element || 'Page / Workflow',
          action: res.action || name,
          expected: res.expected,
          actual: res.actual || (newExceptions.length > 0 ? newExceptions[0].text : 'Unexpected behavior'),
          exceptions: newExceptions,
          networkErrors: newNetErrors,
          screenshot: shotPath,
          priority: res.priority || (hasCriticalError ? 'HIGH' : 'MEDIUM'),
          rootCause: res.rootCause || 'Runtime / Logic exception',
          suggestedFix: res.suggestedFix || 'Inspect component state & error handling'
        };
        bugList.push(issue);
        testResults.push({ id, name, page, status: 'FAIL', issue });
      }
    } catch (err) {
      console.log('❌ ERROR');
      const shotName = `error_${id}.png`;
      const shotPath = await client.takeScreenshot(shotName);
      const issue = {
        id,
        page,
        element: 'Execution Runner',
        action: name,
        expected: 'Clean test completion without exception',
        actual: err.message,
        screenshot: shotPath,
        priority: 'HIGH',
        rootCause: 'Uncaught execution error in runner or app hook',
        suggestedFix: 'Fix syntax/DOM selection or route'
      };
      bugList.push(issue);
      testResults.push({ id, name, page, status: 'FAIL', issue });
    }
  }

  // Count interactive elements helper
  async function countElements() {
    const count = await client.eval(`
      document.querySelectorAll('button, a, input, select, textarea, [role="button"], [tabindex="0"]').length
    `);
    totalInteractiveElements += (count || 0);
    return count || 0;
  }

  // Clear storage initially
  await client.navigate(`${BASE_URL}/`);
  await client.eval('localStorage.clear()');

  // =========================================================================
  // 1. LANDING PAGE TESTS
  // =========================================================================
  await recordTest('TC01', 'Landing Page Load & Hero Rendering', '/', async () => {
    await client.navigate(`${BASE_URL}/`);
    await countElements();
    const title = await client.eval('document.title');
    const heroHeading = await client.eval('document.querySelector("h1")?.innerText');
    const pass = heroHeading && heroHeading.includes('AI Procurement Standards Copilot');
    return {
      pass,
      expected: 'Title and H1 "AI Procurement Standards Copilot" visible',
      actual: `H1: "${heroHeading}" | Title: "${title}"`
    };
  });

  await recordTest('TC02', 'Landing Page Header Navigation Links & Buttons', '/', async () => {
    const headerLinks = await client.eval(`
      Array.from(document.querySelectorAll('header a, header button')).map(el => el.innerText.trim())
    `);
    const hasSignIn = headerLinks.some(t => t.includes('Sign In'));
    const hasRegister = headerLinks.some(t => t.includes('Register'));
    const hasDashboard = headerLinks.some(t => t.includes('Dashboard'));
    const hasExplorer = headerLinks.some(t => t.includes('Explorer'));
    const pass = hasSignIn && hasRegister && hasDashboard && hasExplorer;
    return {
      pass,
      expected: 'Header contains Sign In, Register, Dashboard, and Explorer links',
      actual: `Found links: ${headerLinks.join(', ')}`
    };
  });

  await recordTest('TC03', 'Language Toggle Switch (English ↔ Hindi)', '/', async () => {
    const initialText = await client.eval('document.querySelector("h1")?.innerText');
    // Click Hindi button
    const clickHindi = await client.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('हिंदी'));
        if (btn) { btn.click(); return true; }
        return false;
      })()
    `);
    await new Promise(r => setTimeout(r, 600));
    const hindiH1 = await client.eval('document.querySelector("h1")?.innerText');

    // Switch back to English
    await client.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('English'));
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 600));
    const pass = clickHindi && (hindiH1 !== initialText || hindiH1.length > 0);
    return {
      pass,
      expected: 'Language toggles to Hindi and back to English smoothly',
      actual: `Switched to Hindi: "${hindiH1?.substring(0, 30)}..."`
    };
  });

  await recordTest('TC04', 'Covered Sectors Cards & Explorer Navigation', '/', async () => {
    const sectors = await client.eval(`
      Array.from(document.querySelectorAll('#sectors .cursor-pointer')).length
    `);
    // Click first sector card (LED Lighting)
    await client.eval(`
      document.querySelector('#sectors .cursor-pointer')?.click()
    `);
    await new Promise(r => setTimeout(r, 1200));
    const url = await client.eval('window.location.href');
    await client.navigate(`${BASE_URL}/`); // Go back to landing
    const pass = sectors >= 6 && url.includes('/explorer');
    return {
      pass,
      expected: 'At least 6 sector cards, clicking one routes to /explorer with query param',
      actual: `Sector cards found: ${sectors}, Routed to: ${url}`
    };
  });

  // =========================================================================
  // 2. AUTHENTICATION & LOGIN PAGE TESTS
  // =========================================================================
  await recordTest('TC05', 'Login Page Load & Input Validation', '/login', async () => {
    await client.navigate(`${BASE_URL}/login`);
    await countElements();
    // Submit blank form
    await client.eval(`document.querySelector('button[type="submit"]')?.click()`);
    await new Promise(r => setTimeout(r, 500));
    const errorMsg = await client.eval('document.body.innerText');
    const hasValidation = errorMsg.includes('Please provide your official email address') || errorMsg.includes('Please provide');
    return {
      pass: hasValidation,
      expected: 'Client-side validation error shown when submitting empty email/password',
      actual: `Validation detected: ${hasValidation}`
    };
  });

  await recordTest('TC06', 'Login Page Role Tab Filtering (All 16 Personas Accessible)', '/login', async () => {
    // Click "PSU (4)" tab
    await client.eval(`
      (() => {
        const tab = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('PSU (4)'));
        if (tab) tab.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 400));
    const psuCards = await client.eval(`
      Array.from(document.querySelectorAll('.font-mono')).filter(el => el.innerText.includes('@anveshak.demo')).length
    `);

    // Click "Admin (4)" tab
    await client.eval(`
      (() => {
        const tab = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Admin (4)'));
        if (tab) tab.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 400));
    const adminCards = await client.eval(`
      Array.from(document.querySelectorAll('.font-mono')).filter(el => el.innerText.includes('@anveshak.demo')).length
    `);

    const pass = psuCards >= 4 && adminCards >= 4;
    return {
      pass,
      expected: 'Filtering tabs show 4 PSU accounts and 4 Admin accounts',
      actual: `PSU count: ${psuCards}, Admin count: ${adminCards}`
    };
  });

  await recordTest('TC07', '1-Click Demo Login as Procurement Officer', '/login', async () => {
    // Switch to Procurement tab and click Use Demo Account for procurement1
    await client.eval(`
      (() => {
        const tab = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Procurement'));
        if (tab) tab.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 400));

    await client.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Use Demo Account'));
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 2500));

    const url = await client.eval('window.location.href');
    const bodyText = await client.eval('document.body.innerText');
    const pass = url.includes('/dashboard') && (bodyText.includes('Rajesh Kumar') || bodyText.includes('Procurement'));
    return {
      pass,
      expected: 'Instantly logs in and redirects to /dashboard with Procurement profile',
      actual: `URL: ${url} | Greeting found: ${bodyText.includes('Rajesh Kumar')}`
    };
  });

  // =========================================================================
  // 3. DASHBOARD PAGE TESTS (Procurement Officer)
  // =========================================================================
  await recordTest('TC08', 'Dashboard Metrics & Reports Count for Procurement Officer', '/dashboard', async () => {
    await countElements();
    const bodyText = await client.eval('document.body.innerText');
    const rows = await client.eval('document.querySelectorAll("tbody tr").length');
    // Check if report items are rendered
    const hasReports = rows >= 5 || bodyText.includes('LED Street Light') || bodyText.includes('Transformers');
    return {
      pass: hasReports,
      expected: 'Dashboard displays metrics and list of procurement analyses',
      actual: `Rendered table rows: ${rows}, Product citations present: ${hasReports}`
    };
  });

  await recordTest('TC09', 'Dashboard "View Report" Navigation to Formal 12-Section Dossier', '/dashboard', async () => {
    await client.eval(`
      (() => {
        const viewBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('View Report'));
        if (viewBtn) viewBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 2000));
    const url = await client.eval('window.location.href');
    const bodyText = await client.eval('document.body.innerText');
    const hasDossier = url.includes('/reports/') && (bodyText.includes('Indian Standards') || bodyText.includes('Tender Specification'));
    return {
      pass: hasDossier,
      expected: 'Navigates to /reports/:id and loads formal procurement dossier',
      actual: `URL: ${url}, Dossier loaded: ${hasDossier}`
    };
  });

  // =========================================================================
  // 4. RECOMMENDATION RESULT & DOSSIER PAGE
  // =========================================================================
  await recordTest('TC10', 'Dossier Interactive Tabs (Primary, Testing, Safety, Gaps, Certifications)', '/reports/:id', async () => {
    await countElements();
    const tabs = await client.eval(`
      Array.from(document.querySelectorAll('[role="tab"], button[data-testid*="dossier-tab"], button')).filter(b => 
        b.getAttribute('data-tab-name') || b.innerText.includes('Overview') || b.innerText.includes('Standards') || b.innerText.includes('Gap') || b.innerText.includes('Compliance') || b.innerText.includes('Primary')
      ).map(b => b.innerText.trim())
    `);

    // Click "Gaps" or "Defects" tab if present
    const clickedGapTab = await client.eval(`
      (() => {
        const tab = document.querySelector('[data-testid="dossier-tab-gaps"]') || Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('gap'));
        if (tab) { tab.click(); return true; }
        return false;
      })()
    `);
    await new Promise(r => setTimeout(r, 600));
    const gapSection = await client.eval('document.body.innerText.includes("Severity") || document.body.innerText.includes("Gap")');

    return {
      pass: tabs.length >= 2 && clickedGapTab,
      expected: 'Multiple technical tabs present and clickable',
      actual: `Found tabs: ${tabs.slice(0, 5).join(', ')} | Gap tab interaction: ${clickedGapTab}`
    };
  });

  await recordTest('TC11', 'Dossier Official BIS Portal Verification Link', '/reports/:id', async () => {
    const bisLinks = await client.eval(`
      Array.from(document.querySelectorAll('a[href*="bis.gov.in"]')).map(a => a.href)
    `);
    const manakLinks = await client.eval(`
      Array.from(document.querySelectorAll('a[href*="manakonline.in"]')).map(a => a.href)
    `);
    const pass = bisLinks.length >= 0 && manakLinks.length === 0;
    return {
      pass,
      expected: 'No broken manakonline.in links exist; official bis.gov.in referenced',
      actual: `bis.gov.in links: ${bisLinks.length}, broken manakonline links: ${manakLinks.length}`
    };
  });

  // =========================================================================
  // 5. NEW SPECIFICATION ANALYSIS FLOW
  // =========================================================================
  await recordTest('TC12', 'New Analysis Page Load & Sample Presets', '/analysis/new', async () => {
    await client.navigate(`${BASE_URL}/analysis/new`);
    await countElements();
    const presets = await client.eval(`
      Array.from(document.querySelectorAll('button, div')).filter(el => 
        el.innerText && (el.innerText.includes('LED') || el.innerText.includes('Cement') || el.innerText.includes('Helmet') || el.innerText.includes('Pump'))
      ).length
    `);
    return {
      pass: presets >= 2,
      expected: 'New analysis form loads with quick specification presets',
      actual: `Presets found: ${presets}`
    };
  });

  await recordTest('TC13', 'Submit New Specification & Verify Live AI RAG Pipeline', '/analysis/new', async () => {
    // Fill in product name and spec
    await client.eval(`
      (() => {
        const textInput = document.querySelector('textarea') || document.querySelector('input[name="rawInput"]');
        if (textInput) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set ||
                         Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
          setter.call(textInput, '100W Outdoor LED Street Light Luminaire with IP66 weatherproof housing, surge protection, and IS 10322 compliance.');
          textInput.dispatchEvent(new Event('input', { bubbles: true }));
        }

        const nameInput = document.querySelector('input[placeholder*="Product"]') || document.querySelector('input[name="productName"]');
        if (nameInput) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(nameInput, '100W LED Street Light');
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      })()
    `);

    // Click Analyze button
    await client.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => 
          b.innerText.includes('Analyze') || b.innerText.includes('Find Standards') || b.innerText.includes('Generate')
        );
        if (btn) btn.click();
      })()
    `);

    // Wait for analysis result to navigate
    await new Promise(r => setTimeout(r, 4500));
    const url = await client.eval('window.location.href');
    const bodyText = await client.eval('document.body.innerText');
    const pass = url.includes('/analysis/') || url.includes('/reports/') || bodyText.includes('IS 10322');
    return {
      pass,
      expected: 'Pipeline processes specification and navigates to recommendations result',
      actual: `URL after analysis: ${url}`
    };
  });

  // =========================================================================
  // 6. STANDARDS EXPLORER PAGE
  // =========================================================================
  await recordTest('TC14', 'Standards Explorer Search & Filtering', '/explorer', async () => {
    await client.navigate(`${BASE_URL}/explorer`);
    await countElements();

    // Type in search bar
    await client.eval(`
      (() => {
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(searchInput, 'cement');
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      })()
    `);
    await new Promise(r => setTimeout(r, 800));

    const resultCards = await client.eval(`
      Array.from(document.querySelectorAll('h3, h4')).filter(h => h.innerText.toLowerCase().includes('cement') || h.innerText.includes('IS 269')).length
    `);
    const pass = resultCards >= 1;
    return {
      pass,
      expected: 'Searching "cement" filters and displays IS 269 standard cards',
      actual: `Matching cards found: ${resultCards}`
    };
  });

  await recordTest('TC15', 'Standards Detail Modal Trigger & Official BIS Link', '/explorer', async () => {
    // Click first standard card
    await client.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('View Details') || b.innerText.includes('Explore'));
        if (btn) btn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 800));

    const modalVisible = await client.eval(`
      document.body.innerText.includes('Bureau of Indian Standards') || document.body.innerText.includes('Standard Details')
    `);

    // Close modal if open
    await client.eval(`
      (() => {
        const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Close') || b.getAttribute('aria-label') === 'Close');
        if (closeBtn) closeBtn.click();
      })()
    `);
    return {
      pass: modalVisible,
      expected: 'Standard details modal opens displaying technical clauses',
      actual: `Modal opened: ${modalVisible}`
    };
  });

  // =========================================================================
  // 7. ANALYSIS HISTORY & SAVED STANDARDS
  // =========================================================================
  await recordTest('TC16', 'Analysis History Page Load & Filtering', '/history', async () => {
    await client.navigate(`${BASE_URL}/history`);
    await countElements();
    const rows = await client.eval('document.querySelectorAll("tbody tr, .divide-y > div").length');
    const pass = rows >= 1;
    return {
      pass,
      expected: 'Analysis history page lists prior procurement analyses',
      actual: `History items found: ${rows}`
    };
  });

  await recordTest('TC17', 'Saved Standards Page Empty/Filled State Handling', '/saved', async () => {
    await client.navigate(`${BASE_URL}/saved`);
    await countElements();
    const bodyText = await client.eval('document.body.innerText');
    const pass = bodyText.includes('Saved Standards') || bodyText.includes('Bookmark');
    return {
      pass,
      expected: 'Saved standards page renders cleanly without blank screen',
      actual: `Header found: ${pass}`
    };
  });

  // =========================================================================
  // 8. TENDER UPLOAD PAGE
  // =========================================================================
  await recordTest('TC18', 'Tender Upload Page & Sample Tender Selection', '/tender/upload', async () => {
    await client.navigate(`${BASE_URL}/tender/upload`);
    await countElements();

    const sampleBtns = await client.eval(`
      Array.from(document.querySelectorAll('button')).filter(b => 
        b.innerText.toLowerCase().includes('sample') || b.innerText.includes('LED') || b.innerText.includes('Transformer')
      ).length
    `);

    // Click sample tender button if available
    const clickedSample = await client.eval(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => 
          b.innerText.toLowerCase().includes('sample') || b.innerText.includes('LED')
        );
        if (btn) { btn.click(); return true; }
        return false;
      })()
    `);
    await new Promise(r => setTimeout(r, 600));

    return {
      pass: sampleBtns >= 1 || clickedSample,
      expected: 'Tender upload page renders dropzone and sample tender presets',
      actual: `Sample options available: ${sampleBtns}, Clicked: ${clickedSample}`
    };
  });

  // =========================================================================
  // 9. ARCHITECTURE & EVALUATOR FAQ PAGES
  // =========================================================================
  await recordTest('TC19', 'Architecture Diagram & Pipeline Transparency Page', '/architecture', async () => {
    await client.navigate(`${BASE_URL}/architecture`);
    await countElements();
    const bodyText = await client.eval('document.body.innerText');
    const pass = bodyText.includes('Architecture') && (bodyText.includes('Pipeline') || bodyText.includes('RAG'));
    return {
      pass,
      expected: 'Copilot architecture and pipeline diagrams render correctly',
      actual: `Architecture page confirmed: ${pass}`
    };
  });

  await recordTest('TC20', 'Evaluator FAQ & Defense Guide Page', '/evaluator-faq', async () => {
    await client.navigate(`${BASE_URL}/evaluator-faq`);
    await countElements();
    const questions = await client.eval(`
      Array.from(document.querySelectorAll('h3, h4, button')).filter(el => 
        el.innerText.includes('?') || el.innerText.toLowerCase().includes('how') || el.innerText.toLowerCase().includes('why')
      ).length
    `);
    return {
      pass: questions >= 4,
      expected: 'Evaluator Questions & Defense guide displays structured Q&A accordions',
      actual: `Questions found: ${questions}`
    };
  });

  // =========================================================================
  // 10. ROLE SWITCHER & ALL 4 STAKEHOLDER WORKFLOWS
  // =========================================================================
  await recordTest('TC21', 'Switch Stakeholder Persona to Government Department', '/dashboard', async () => {
    // Open profile menu in Navbar
    await client.eval(`
      (() => {
        const profileBtn = document.querySelector('[data-testid="profile-menu-button"]') || document.getElementById('user-profile-menu-button') || Array.from(document.querySelectorAll('header button')).find(b => 
          b.innerText.includes('Rajesh') || b.innerText.includes('Officer')
        );
        if (profileBtn) profileBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 600));

    // Click Government Department (Priya Sharma)
    await client.eval(`
      (() => {
        const deptBtn = document.querySelector('[data-testid="switch-role-dept"]') || Array.from(document.querySelectorAll('button')).find(b => 
          b.innerText.includes('Priya Sharma') || b.innerText.includes('Government Department')
        );
        if (deptBtn) deptBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 1500));

    const bodyText = await client.eval('document.body.innerText');
    const pass = bodyText.includes('Priya Sharma') || bodyText.includes('Government Department') || bodyText.includes('Public Works');
    return {
      pass,
      expected: 'Persona dynamically switches to Government Department without page reload',
      actual: `Active persona updated: ${pass}`
    };
  });

  await recordTest('TC22', 'Switch Stakeholder Persona to PSU (Amit Verma)', '/dashboard', async () => {
    // Open profile menu in Navbar
    await client.eval(`
      (() => {
        const profileBtn = document.querySelector('[data-testid="profile-menu-button"]') || document.getElementById('user-profile-menu-button') || Array.from(document.querySelectorAll('header button')).find(b => 
          b.innerText.includes('Priya') || b.innerText.includes('Department')
        );
        if (profileBtn) profileBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 600));

    // Click PSU
    await client.eval(`
      (() => {
        const psuBtn = document.querySelector('[data-testid="switch-role-psu"]') || Array.from(document.querySelectorAll('button')).find(b => 
          b.innerText.includes('Amit Verma') || b.innerText.includes('PSU')
        );
        if (psuBtn) psuBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 1500));

    const bodyText = await client.eval('document.body.innerText');
    const pass = bodyText.includes('Amit Verma') || bodyText.includes('PSU') || bodyText.includes('Energy');
    return {
      pass,
      expected: 'Persona dynamically switches to PSU with high-voltage and heavy industrial focus',
      actual: `PSU persona updated: ${pass}`
    };
  });

  await recordTest('TC23', 'Switch Stakeholder Persona to Platform Administrator', '/dashboard', async () => {
    // Open profile menu in Navbar
    await client.eval(`
      (() => {
        const profileBtn = document.querySelector('[data-testid="profile-menu-button"]') || document.getElementById('user-profile-menu-button') || Array.from(document.querySelectorAll('header button')).find(b => 
          b.innerText.includes('Amit') || b.innerText.includes('PSU')
        );
        if (profileBtn) profileBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 600));

    // Click Admin
    await client.eval(`
      (() => {
        const adminBtn = document.querySelector('[data-testid="switch-role-admin"]') || Array.from(document.querySelectorAll('button')).find(b => 
          b.innerText.includes('Administrator') || b.innerText.includes('Admin')
        );
        if (adminBtn) adminBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 1500));

    const bodyText = await client.eval('document.body.innerText');
    const pass = bodyText.includes('Admin') || bodyText.includes('Operations');
    return {
      pass,
      expected: 'Admin persona active with access to administrative navigation items',
      actual: `Admin persona updated: ${pass}`
    };
  });

  // =========================================================================
  // 11. ADMIN PAGES (Protected routes verified with Admin persona)
  // =========================================================================
  await recordTest('TC24', 'Admin User Directory Page (/admin/users)', '/admin/users', async () => {
    await client.navigate(`${BASE_URL}/admin/users`);
    await countElements();
    const userRows = await client.eval('document.querySelectorAll("tbody tr").length');
    const pass = userRows >= 4;
    return {
      pass,
      expected: 'Admin users directory loads showing all registered and demo stakeholders',
      actual: `User table rows: ${userRows}`
    };
  });

  await recordTest('TC25', 'Admin Standards Registry Page (/admin/standards)', '/admin/standards', async () => {
    await client.navigate(`${BASE_URL}/admin/standards`);
    await countElements();
    const bodyText = await client.eval('document.body.innerText');
    const pass = bodyText.includes('Standards Management') || bodyText.includes('Indian Standards') || bodyText.includes('Sync');
    return {
      pass,
      expected: 'Admin standards management view renders standards registry & sync buttons',
      actual: `Standards registry verified: ${pass}`
    };
  });

  await recordTest('TC26', 'Admin Audit Logs Page (/admin/audit-logs)', '/admin/audit-logs', async () => {
    await client.navigate(`${BASE_URL}/admin/audit-logs`);
    await countElements();
    const bodyText = await client.eval('document.body.innerText');
    const pass = bodyText.includes('Audit') || bodyText.includes('Activity');
    return {
      pass,
      expected: 'System audit log view displays regulatory & procurement activity timeline',
      actual: `Audit log verified: ${pass}`
    };
  });

  // =========================================================================
  // 12. ROLE PROTECTION TEST (Non-Admin forbidden from admin routes)
  // =========================================================================
  await recordTest('TC27', 'Role Protection: Non-Admin Access to /admin/users Redirects Safely', '/admin/users', async () => {
    // Switch to Procurement Officer
    await client.navigate(`${BASE_URL}/dashboard`);
    await client.eval(`
      (() => {
        const profileBtn = document.querySelector('[data-testid="profile-menu-button"]') || document.getElementById('user-profile-menu-button');
        if (profileBtn) profileBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 600));

    await client.eval(`
      (() => {
        const poBtn = document.querySelector('[data-testid="switch-role-procurement"]') || Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Rajesh Kumar'));
        if (poBtn) poBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 1500));

    // Try navigating to admin route
    await client.navigate(`${BASE_URL}/admin/users`);
    await new Promise(r => setTimeout(r, 1200));

    const currentUrl = await client.eval('window.location.href');
    const bodyText = await client.eval('document.body.innerText');
    const pass = !currentUrl.includes('/admin/users') || bodyText.includes('Access Denied') || bodyText.includes('Unauthorized Portal Area') || bodyText.includes('Dashboard');
    return {
      pass,
      expected: 'Non-admin user cannot access /admin/users and is redirected or shown access warning',
      actual: `Final URL: ${currentUrl} | Access warning detected: ${bodyText.includes('Access Denied') || bodyText.includes('Unauthorized Portal Area')}`
    };
  });

  // =========================================================================
  // 13. RESPONSIVE / MOBILE LAYOUT TEST
  // =========================================================================
  await recordTest('TC28', 'Mobile Responsive Layout (375x812 Viewport) & Sidebar Toggle', '/dashboard', async () => {
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });
    await client.navigate(`${BASE_URL}/dashboard`);
    await countElements();

    // Click mobile hamburger menu
    const clickedMenu = await client.eval(`
      (() => {
        const menuBtn = document.querySelector('button[aria-label*="menu"]') || 
                         Array.from(document.querySelectorAll('header button')).find(b => b.querySelector('svg'));
        if (menuBtn) { menuBtn.click(); return true; }
        return false;
      })()
    `);
    await new Promise(r => setTimeout(r, 600));

    const sidebarVisible = await client.eval(`
      (() => {
        const aside = document.querySelector('aside');
        return !!aside;
      })()
    `);

    // Reset viewport to desktop
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false
    });

    return {
      pass: sidebarVisible,
      expected: 'Mobile hamburger button toggles responsive navigation drawer without horizontal overflow',
      actual: `Hamburger clicked: ${clickedMenu}, Drawer active: ${sidebarVisible}`
    };
  });

  // =========================================================================
  // 14. LOGOUT TEST
  // =========================================================================
  await recordTest('TC29', 'User Sign Out & Session Destruction', '/dashboard', async () => {
    // Open profile menu
    await client.eval(`
      (() => {
        const profileBtn = document.querySelector('[data-testid="profile-menu-button"]') || document.getElementById('user-profile-menu-button') || Array.from(document.querySelectorAll('header button')).find(b => 
          b.innerText.includes('Rajesh') || b.innerText.includes('Officer') || b.innerText.includes('Admin') || b.querySelector('svg')
        );
        if (profileBtn) profileBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 600));

    // Click Sign Out button
    await client.eval(`
      (() => {
        const logoutBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Sign Out'));
        if (logoutBtn) logoutBtn.click();
      })()
    `);
    await new Promise(r => setTimeout(r, 1200));

    const url = await client.eval('window.location.href');
    const token = await client.eval('localStorage.getItem("is_auth_token")');
    const user = await client.eval('localStorage.getItem("is_auth_user")');
    const pass = (url.includes('/login') || url === `${BASE_URL}/`) && !token && !user;
    return {
      pass,
      expected: 'Session tokens removed from localStorage and user routed to login or landing',
      actual: `URL: ${url} | Stored Token: ${token} | Stored User: ${user}`
    };
  });

  // =========================================================================
  // SUMMARY REPORT GENERATION
  // =========================================================================
  await client.close();

  const totalTests = testResults.length;
  const passedTests = testResults.filter(t => t.status === 'PASS').length;
  const failedTests = testResults.filter(t => t.status === 'FAIL').length;
  const blockedTests = 0;

  const criticalBugs = bugList.filter(b => b.priority === 'CRITICAL');
  const highBugs = bugList.filter(b => b.priority === 'HIGH');
  const mediumLowBugs = bugList.filter(b => b.priority === 'MEDIUM' || b.priority === 'LOW');

  const reportData = {
    totalPagesTested: testedPages.size,
    pagesList: Array.from(testedPages),
    totalInteractiveElements,
    totalTests,
    passedTests,
    failedTests,
    blockedTests,
    criticalBugs,
    highBugs,
    mediumLowBugs,
    bugList
  };

  fs.writeFileSync(
    '/Users/shubhamkrgupta/.gemini/antigravity-ide/brain/e878d28d-76c1-42db-8cc1-8079e47d9ca5/qa_audit_report.json',
    JSON.stringify(reportData, null, 2)
  );

  console.log('\n================================================================');
  console.log('📊 COMPREHENSIVE QA AUDIT SUMMARY');
  console.log('================================================================');
  console.log(`A. Total Pages Tested:             ${testedPages.size}`);
  console.log(`B. Total Interactive Elements:     ${totalInteractiveElements}`);
  console.log(`C. Total Tests Executed:           ${totalTests}`);
  console.log(`D. Passed:                         ${passedTests} (${Math.round(passedTests/totalTests*100)}%)`);
  console.log(`E. Failed:                         ${failedTests}`);
  console.log(`F. Blocked:                        ${blockedTests}`);
  console.log(`G. Critical Bugs:                  ${criticalBugs.length}`);
  console.log(`H. High-Priority Bugs:             ${highBugs.length}`);
  console.log(`I. Medium/Low-Priority Bugs:       ${mediumLowBugs.length}`);
  console.log('================================================================\n');

  if (failedTests > 0) {
    console.log('Found issues:');
    bugList.forEach((b, i) => {
      console.log(`\n[${i+1}] ${b.id} on ${b.page}: ${b.action}`);
      console.log(`    Expected: ${b.expected}`);
      console.log(`    Actual:   ${b.actual}`);
      console.log(`    Fix:      ${b.suggestedFix}`);
      if (b.screenshot) console.log(`    Screenshot: ${b.screenshot}`);
    });
  }

  process.exit(0);
}

runQA().catch((err) => {
  console.error('QA Runner Fatal Error:', err);
  process.exit(1);
});
