function convertBase(n: number, base: number): string {
  return Number(n).toString(base);
}

function fromRadToDeg(v: number): number {
  return (v * 180) / Math.PI;
}

function fromDegToRad(v: number): number {
  return (v * Math.PI) / 180;
}

export { convertBase, fromDegToRad, fromRadToDeg };
