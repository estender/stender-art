

export function clamp(val, min, max) {
  return Math.max(min, Math.min(val, max));
}

export function isOdd(val) {
  return val % 2 === 1;
}

export function oneOrNegOne() {
  return Math.random() > 0.5 ? 1 : -1;
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
