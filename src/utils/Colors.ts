import chroma from "chroma-js";

function randomColor(): string {
  return chroma.random().hex();
}

export { randomColor };
