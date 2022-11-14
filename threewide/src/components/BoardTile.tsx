import { StaticImageData } from "next/image";
import React from "react";

type BoardTileProperties = {
  tileDimensions: {
    height: number;
    width: number;
  };
  texture: StaticImageData;
};

const BoardTile = ({ tileDimensions, texture }: BoardTileProperties) => {
  return (
    <img
      className="noSelect"
      src={texture.src}
      height={tileDimensions.height}
      width={tileDimensions.width}
    />
  );
};

export default BoardTile;
