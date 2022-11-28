import React from "react";
import { PieceType, Rotation } from "src/types/tetris";
import { getTileLocationsFromPieceAndRotations } from "@utils/tetris/PieceRotations";
import { getPieceSizesFromPieceType } from "@utils/tetris/PieceSizes";
import { StaticImageData } from "next/image";

type PieceProperties = {
  tileDimensions: { width: number; height: number };
  texture: StaticImageData;
  rotation: Rotation;
  pieceType: PieceType;
  location: [number, number];
};

const Piece = ({
  tileDimensions,
  texture,
  rotation,
  pieceType,
  location,
}: PieceProperties) => {
  if (pieceType == PieceType.None) return <></>;
  function getPiece() {
    return getTileLocationsFromPieceAndRotations(pieceType, rotation).map(
      (pieceLocation: [number, number]) => {
        return (
          <img
            key={`${location[0]}${location[1]}${rotation}${pieceType}${pieceLocation[0]}${pieceLocation[1]}`}
            style={{
              left: `${pieceLocation[0] * tileDimensions.width}px`,
              top: `${pieceLocation[1] * tileDimensions.height}px`,
            }}
            className="absolute"
            src={texture.src}
            width={tileDimensions.width}
            height={tileDimensions.height}
          />
        );
      }
    );
  }

  return (
    <div
      style={{
        left: `${location[0] * tileDimensions.width}px`,
        top: `${location[1] * tileDimensions.height}px`,
        width: `${
          tileDimensions.width * getPieceSizesFromPieceType(pieceType)
        }px`,
      }}
      className="relative z-10"
    >
      {getPiece()}
    </div>
  );
};

export default Piece;
