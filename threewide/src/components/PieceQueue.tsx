import React from "react";
import {
  ITile,
  JTile,
  LTile,
  STile,
  ZTile,
  OTile,
  TTile,
  DefaultTile,
} from "@public/BoardTiles";
import { PieceType } from "src/types/tetris";
import { StaticImageData } from "next/image";
import Piece from "./Piece";

const PieceQueue = ({ queue }: { queue: PieceType[] }) => {
  function getTextureFromBoardStateTile(boardTile: PieceType): StaticImageData {
    let tile;

    switch (boardTile) {
      case "T":
        tile = TTile;
        break;
      case "I":
        tile = ITile;
        break;
      case "J":
        tile = JTile;
        break;
      case "L":
        tile = LTile;
        break;
      case "S":
        tile = STile;
        break;
      case "Z":
        tile = ZTile;
        break;
      case "O":
        tile = OTile;
        break;
      default:
        tile = DefaultTile;
        break;
    }
    return tile;
  }

  function getPieceQueue(q: PieceType[]) {
    const pieces = [];
    let index = 0;
    for (const queueElement of q) {
      pieces.push(
        <Piece
          key={`piece queue - ${index}`}
          pieceType={queueElement}
          location={[0, index * 3]}
          rotation={0}
          texture={getTextureFromBoardStateTile(queueElement)}
          tileDimensions={{ width: 15, height: 15 }}
        />
      );
      index += 1;
      if (pieces.length == 7) break;
    }

    return pieces;
  }

  return <div className="w-20 p-2">{getPieceQueue(queue)}</div>;
};

export default PieceQueue;
