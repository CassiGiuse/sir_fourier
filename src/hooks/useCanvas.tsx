"use client";

import { useRef, useEffect } from "react";

type DrawFunction = (ctx: CanvasRenderingContext2D, frameCount: number) => void;

export default function useCanvas({ draw }: { draw: DrawFunction }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Creiamo un riferimento al canvas

  /*
  Le funzioni in JavaScript sono riferimenti che vengono ricreati ogni volta che il componente viene renderizzato. 
  Questo significa che ogni volta che il componente Canvas viene renderizzato, viene creata una nuova istanza della funzione draw. 
  */
  // function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
  //   const parent: HTMLElement | null = canvas.parentElement;

  //   if (!parent) return false;

  //   const width = parent.clientWidth;
  //   const height = parent.clientHeight;

  //   if (canvas.width !== width || canvas.height !== height) {
  //     canvas.width = width;
  //     canvas.height = height;
  //     return true;
  //   }

  //   return false;
  // }

  useEffect(() => {
    // Otteniamo l'elemento canvas dal riferimento
    const canvas: HTMLCanvasElement | null = canvasRef.current;

    if (!canvas) return;

    // Otteniamo il contesto 2D del canvas
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!context) return;

    let frameCount: number = 0;
    let animationFrameId: number;

    // Operiamo sulla canvas o sul contesto
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      // il browser pianifica l'esecuzione di una funzione prima del prossimo repaint.
      // Questo è utile per creare animazioni fluide perché sincronizza l'animazione con il refresh rate del display.
      // Inoltre restituisce un ID unico per la richiesta, utilizzabile per annullarla
      animationFrameId = window.requestAnimationFrame(render);
      // resizeCanvasToDisplaySize(canvas);
    };
    render();

    return () => {
      // Annulla la richiesta di animazione: la funzione di animazione pianificata non verrà eseguita.
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
}
