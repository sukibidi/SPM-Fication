import { memo } from 'react';

function Logo({ size = 32 }) {
  return (
    <span
      className="inline-flex items-center justify-center bg-primary text-on-primary"
      style={{ width: size, height: size }}
      aria-label="SPM paper logo"
      role="img"
    >
      <span className="material-symbols-outlined" style={{ fontSize: Math.round(size * 0.625) }}>
        article
      </span>
    </span>
  );
}

export default memo(Logo);
