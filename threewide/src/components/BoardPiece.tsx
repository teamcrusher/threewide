import React, { useEffect, useRef } from "react";
import { PieceType, Rotation } from "src/types/tetris";
import { getTileLocationsFromPieceAndRotations } from "@utils/tetris/PieceRotations";
import { getPieceSizesFromPieceType } from "@utils/tetris/PieceSizes";

import { getColorFromBoardStateTile } from "@utils/tetris/PieceColors";

type BoardPieceProperties = {
  tileDimensions: { width: number; height: number };
  rotation: Rotation;
  pieceType: PieceType;
  location: [number, number];
  isShadowPiece?: boolean; 
};

const BoardPiece = ({
  tileDimensions,
  rotation,
  pieceType,
  location,
  isShadowPiece,
}: BoardPieceProperties) => {
0
  const draw = (ctx: CanvasRenderingContext2D) => {
    if (pieceType == PieceType.None) return;

    let tiles = getTileLocationsFromPieceAndRotations(pieceType, rotation);
      for (let tile of tiles) {
        ctx.fillStyle = (isShadowPiece ?? false) ? "#c1c1c1" :  getColorFromBoardStateTile(pieceType);
        ctx.fillRect(location[0] * tileDimensions.width + tile[0]*20,(location[1]+3) * tileDimensions.height+ tile[1]*20, 20, 20)
      }
  }

  return (draw
  );
};

export default BoardPiece;
