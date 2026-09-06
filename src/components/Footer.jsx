import { memo } from 'react';

function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest/90 backdrop-blur-md py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs">
          <span className="w-8 h-8 bg-primary text-on-primary flex items-center justify-center" aria-label="SPM paper logo">
            <span className="material-symbols-outlined text-[20px]">article</span>
          </span>
          <span className="font-headline-sm text-headline-sm text-primary">SPM-FICATION</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">SPM Arcade Battleground &copy; 2026</span>
        </div>
        <div className="flex items-center gap-space-md font-label-code text-label-code text-on-surface-variant">
          <span>v2.4.0-PROD // 2026. Aaeroo</span>
          <span className="text-outline">|</span>
          <span>PULSE: SYNCHRONIZED</span>
          <span className="text-outline">|</span>
          <span className="text-secondary-fixed-dim">EXP BOOST: 1.0X</span>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
