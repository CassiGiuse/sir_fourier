
import chroma from 'chroma-js';

class Colors {
  public static randomColor(): string {
    return chroma.random().hex();
  }
}

export default Colors;