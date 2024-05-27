type CanvasStyleOptions = {
  [key in keyof CanvasRenderingContext2D]?: CanvasRenderingContext2D[key];
};

function contextWrapper(
  ctx: CanvasRenderingContext2D,
  styleOptions: CanvasStyleOptions | null = null,
  callback: (ctx: CanvasRenderingContext2D) => void
) {
  ctx.save();

  if (styleOptions) {
    for (const [key, value] of Object.entries(styleOptions)) {
      if (key in ctx) {
        (ctx as any)[key] = value;
      }
    }
  }

  callback(ctx);

  ctx.stroke();
  ctx.restore();
}

export { contextWrapper };
