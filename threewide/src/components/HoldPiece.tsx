import React, { useEffect, useRef } from "react";
import type { PieceType, Rotation } from "src/types/tetris";
import { getTileLocationsFromPieceAndRotations } from "@utils/tetris/PieceRotations";
import { getColorFromBoardStateTile } from "@utils/tetris/PieceColors";

type PieceProperties = {
  tileDimensions: { width: number; height: number };
  rotation: Rotation;
  pieceType: PieceType;
};

const HoldPiece = ({
  tileDimensions,
  rotation,
  pieceType,
}: PieceProperties) => {
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, tileDimensions.width * 4, tileDimensions.height * 4);
    if (pieceType == "") return;

    const tiles = getTileLocationsFromPieceAndRotations(pieceType, rotation);
    for (const tile of tiles) {
      ctx.fillStyle = getColorFromBoardStateTile(pieceType);
      ctx.fillRect(
        tile[0] * tileDimensions.width,
        tile[1] * tileDimensions.height,
        tileDimensions.width,
        tileDimensions.height
      );
    }
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d");
    if (context) draw(context);
  }, [draw]);

  return (
    <div className="relative z-10">
      <canvas
        className="absolute"
        width={tileDimensions.width * 4}
        height={tileDimensions.height * 4}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default HoldPiece;
