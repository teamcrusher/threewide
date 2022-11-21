import React from "react";

export type SettingsProperties = {
  showSettings: boolean;
};

type Settings = {
  moveLeft: string;
  moveRight: string;
  rotate90: string;
  rotate180: string;
  rotate270: string;
  hardDrop: string;
  softDrop: string;
  dasAmount: number;
};

const SettingsPage = ({ showSettings }: SettingsProperties) => {
  console.log("Showing settings");
  return (
    <div className="z-2 bg-gray-400 p-5">
      <h1>SETTING</h1>
      <h1>CONTROLS</h1>
      <div className="flex ">
        <div>MOVE PIECE LEFT</div>
        <div className="ml-auto mr-0">{"[NOT SET]"}</div>
      </div>
      <div className="flex ">
        <div>MOVE PIECE RIGHT</div>
        <div className="ml-auto mr-0">{"[NOT SET]"}</div>
      </div>
      <div className="flex ">
        <div>SOFT DROP</div>
        <div className="ml-auto mr-0">{"[NOT SET]"}</div>
      </div>
      <div className="flex ">
        <div>HARD DROP</div>
        <div className="ml-auto mr-0">{"[NOT SET]"}</div>
      </div>
      <div className="flex ">
        <div>ROTATE COUNTERCLOCKWISE</div>
        <div className="ml-auto mr-0">{"[NOT SET]"}</div>
      </div>
      <div className="flex ">
        <div>ROTATE CLOCKWISE</div>
        <div className="ml-auto mr-0">{"[NOT SET]"}</div>
      </div>
      <div className="flex ">
        <div>ROTATE 180</div>
        <div className="ml-auto mr-0">{"[NOT SET]"}</div>
      </div>
      <div className="flex ">
        <div>SWAP HOLD PIECE</div>
        <div className="ml-auto mr-0">{"[NOT SET]"}</div>
      </div>
      <h1>HANDLING</h1>

      <div className="flex ">
        <div>DAS</div>
        <div className="ml-auto mr-0">{"[NOT SET] MS"}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
