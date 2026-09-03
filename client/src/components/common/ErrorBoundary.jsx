import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled rendering error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto my-12 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-md text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              Interface Recovery Shield
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-outfit">
              Component Display Interrupted
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              A temporary rendering issue occurred while displaying this dossier view. No data was lost.
            </p>
          </div>

          {this.state.error && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-[11px] text-slate-600 font-mono overflow-x-auto">
              {this.state.error.message || String(this.state.error)}
            </div>
          )}

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              size="sm"
              variant="secondary"
              icon={RotateCcw}
              onClick={this.handleReset}
            >
              Try Again
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={Home}
              onClick={() => {
                this.handleReset();
                window.location.hash = '';
                if (typeof window !== 'undefined') {
                  window.history.pushState(null, '', '/dashboard');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
