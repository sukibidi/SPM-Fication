const BLOCKED_NAME_PARTS = [
  'fuck',
  'shit',
  'bitch',
  'bastard',
  'asshole',
  'dick',
  'pussy',
  'cock',
  'cunt',
  'whore',
  'slut',
  'sex',
  'porn',
  'nude',
  'boob',
  'penis',
  'vagina',
];

const NAME_MAX_LENGTH = 24;
const NAME_MIN_LENGTH = 2;

export function normalizePlayerName(value) {
  return String(value || '')
    .replace(/[^a-zA-Z0-9 .'_-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NAME_MAX_LENGTH)
    .split(' ')
    .filter(Boolean)
    .map(capitalizeNamePart)
    .join(' ');
}

export function validatePlayerName(value) {
  const normalized = normalizePlayerName(value);
  const compact = normalized.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (normalized.length < NAME_MIN_LENGTH) {
    return { valid: false, name: normalized, error: `Name must be at least ${NAME_MIN_LENGTH} characters.` };
  }

  if (BLOCKED_NAME_PARTS.some((word) => compact.includes(word))) {
    return { valid: false, name: normalized, error: 'Name contains blocked language. Please use a proper student name.' };
  }

  if (!/[a-zA-Z0-9]/.test(normalized)) {
    return { valid: false, name: normalized, error: 'Name must include letters or numbers.' };
  }

  return { valid: true, name: normalized, error: '' };
}

export function getInitials(value) {
  return normalizePlayerName(value)
    .split(/\s+|[._-]/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'G';
}

function capitalizeNamePart(part) {
  return part
    .split(/([-'])/)
    .map((segment) => {
      if (segment === '-' || segment === "'") return segment;
      return segment ? segment[0].toUpperCase() + segment.slice(1).toLowerCase() : segment;
    })
    .join('');
}
