import React, { useEffect, useRef } from "react";
import type { PieceType } from "src/types/tetris";
import { getTileLocationsFromPieceAndRotations } from "@utils/tetris/PieceRotations";
import { getColorFromBoardStateTile } from "@utils/tetris/PieceColors";

const PieceQueue = ({ queue }: { queue: PieceType[] }) => {
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 84, 400);
    for (let pieceNum = 0; pieceNum < 6; pieceNum++) {
      const pieceTile = queue[pieceNum];
      if (!pieceTile) break;

      const tiles = getTileLocationsFromPieceAndRotations(pieceTile, 0);

      for (const tile of tiles) {
        ctx.fillStyle = getColorFromBoardStateTile(pieceTile);
        ctx.fillRect(
          12 + tile[0] * 15,
          12 + pieceNum * 45 + tile[1] * 15,
          15,
          15
        );
      }
    }
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d");

    if (context) draw(context);
  }, [draw]);

  return (
    <div className="w-20 p-2">
      <canvas ref={canvasRef} width={84} height={400}></canvas>
    </div>
  );
};

export default PieceQueue;
