import { memo } from 'react';

function Powerups({ shields, freezes, onShield, onFreeze, onSkip }) {
  return (
    <div className="flex flex-wrap gap-space-xs pt-1">
      <PowerupButton onClick={onShield} disabled={shields <= 0} label="50/50 SHIELD" hotkey="1" value={`${shields} LEFT`} />
      <PowerupButton onClick={onFreeze} disabled={freezes <= 0} label="FREEZE 5S" hotkey="2" value={`${freezes} LEFT`} />
      <PowerupButton onClick={onSkip} label="SKIP" hotkey="SPC" value="OVERRIDE" muted />
    </div>
  );
}

function PowerupButton({ onClick, disabled, label, hotkey, value, muted }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-space-xs py-space-xs px-space-sm border transition-colors duration-75 disabled:opacity-40 disabled:cursor-not-allowed ${
        muted
          ? 'bg-surface-container-low border-dashed border-primary text-on-surface-variant hover:text-primary'
          : 'bg-surface-container-lowest border-primary text-primary hover:bg-primary hover:text-on-primary'
      }`}
      type="button"
      aria-label={`${label}: ${value}`}
    >
      <span className={`font-label-badge text-[9px] font-bold px-space-2xs ${muted ? 'border border-primary' : 'bg-primary text-on-primary'}`}>[{hotkey}]</span>
      <span className="font-label-badge text-label-badge font-bold uppercase">{label}</span>
      <span className="font-label-badge text-[9px] uppercase opacity-75">{value}</span>
    </button>
  );
}

export default memo(Powerups);
