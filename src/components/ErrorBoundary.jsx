import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background p-space-md">
          <div className="bg-surface-container-low/90 backdrop-blur-xl rounded-xl p-space-xl max-w-md text-center shadow-2xl border border-error-container/50">
            <span className="material-symbols-outlined text-[48px] text-error mb-space-sm">error_outline</span>
            <h2 className="font-headline text-headline-lg text-on-surface mb-space-xs">System Anomaly Detected</h2>
            <p className="font-body text-body-md text-on-surface-variant mb-space-md">
              The arcade engine encountered an unexpected fault. Our cadet technicians have been alerted.
            </p>
            <pre className="font-label-code text-label-code text-error-container bg-surface-container-lowest rounded p-space-sm mb-space-md text-left overflow-auto max-h-24">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-space-xl py-space-md bg-primary-container text-on-primary font-headline-sm rounded-xl shadow-[0_0_24px_rgba(0,240,255,0.4)] hover:brightness-110 transition-all"
            >
              RESTART PROTOCOL
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}