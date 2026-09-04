/**
 * Safely format improvedSpecification into a clean string representation.
 * Prevents React Error #31 (Objects are not valid as a React child) when
 * backend or legacy seed returns structured specification objects.
 */
export const formatSpecificationText = (spec) => {
  if (!spec) return '';
  if (typeof spec === 'string') return spec;

  if (typeof spec === 'object') {
    // If it's an array of lines or clauses
    if (Array.isArray(spec)) {
      return spec
        .map(item => (typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)))
        .join('\n');
    }

    // Structured object format: title, productDescription, technicalRequirements, testingRequirements, applicableStandardsList
    const sections = [];
    const title = spec.title || 'TECHNICAL SPECIFICATION & PROCUREMENT SCHEDULE';
    sections.push(`${title.toUpperCase()}\n${'='.repeat(Math.min(80, Math.max(40, title.length)))}`);

    if (spec.productDescription) {
      sections.push(`\n1. PRODUCT DESCRIPTION & SCOPE\n${'-'.repeat(40)}\n${spec.productDescription}`);
    }

    if (spec.applicableStandardsList || spec.standards) {
      const stds = spec.applicableStandardsList || spec.standards;
      sections.push(`\n2. APPLICABLE INDIAN STANDARDS\n${'-'.repeat(40)}\n${typeof stds === 'object' ? (Array.isArray(stds) ? stds.join('\n') : JSON.stringify(stds, null, 2)) : stds}`);
    }

    if (spec.technicalRequirements || spec.parameters) {
      const tech = spec.technicalRequirements || spec.parameters;
      sections.push(`\n3. TECHNICAL & PERFORMANCE REQUIREMENTS\n${'-'.repeat(40)}\n${typeof tech === 'object' ? JSON.stringify(tech, null, 2) : tech}`);
    }

    if (spec.testingRequirements || spec.testing) {
      const testing = spec.testingRequirements || spec.testing;
      sections.push(`\n4. QUALITY ASSURANCE & TESTING NORMS\n${'-'.repeat(40)}\n${typeof testing === 'object' ? JSON.stringify(testing, null, 2) : testing}`);
    }

    if (spec.statutoryMandate || spec.certification) {
      const cert = spec.statutoryMandate || spec.certification;
      sections.push(`\n5. STATUTORY CERTIFICATION & BIS MANDATE\n${'-'.repeat(40)}\n${typeof cert === 'object' ? JSON.stringify(cert, null, 2) : cert}`);
    }

    // Any remaining unexpected properties
    const knownKeys = new Set([
      'title',
      'productDescription',
      'applicableStandardsList',
      'standards',
      'technicalRequirements',
      'parameters',
      'testingRequirements',
      'testing',
      'statutoryMandate',
      'certification'
    ]);

    for (const [key, value] of Object.entries(spec)) {
      if (!knownKeys.has(key) && value) {
        const readableKey = key
          .replace(/([A-Z])/g, ' $1')
          .trim()
          .toUpperCase();
        sections.push(`\n${readableKey}\n${'-'.repeat(40)}\n${typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}`);
      }
    }

    if (sections.length > 1) {
      return sections.join('\n');
    }

    // Fallback if no known keys matched
    try {
      return JSON.stringify(spec, null, 2);
    } catch {
      return String(spec);
    }
  }

  return String(spec);
};
