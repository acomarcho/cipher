export const modulo = (n: number, m: number) => {
  return ((n % m) + m) % m;
};

export const moduloInverse = (a: number, m: number) => {
  a = ((a % m) + m) % m;
  if (!a || m < 2) {
    return NaN;
  }
  const s = [];
  let b = m;
  while (b) {
    [a, b] = [b, a % b];
    s.push({ a, b });
  }
  if (a !== 1) {
    return NaN;
  }
  let x = 1;
  let y = 0;
  for (let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)];
  }
  return ((y % m) + m) % m;
};
