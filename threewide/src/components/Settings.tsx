import React, { useState } from "react";

export type SettingsProperties = {
  showSettings: boolean;
};

export type Settings = {
  moveLeft: string;
  moveRight: string;
  rotate90: string;
  rotate180: string;
  rotate270: string;
  hardDrop: string;
  softDrop: string;
  holdPiece: string;
  dasAmount: number;
};

type Moves =
  | "moveLeft"
  | "moveRight"
  | "rotate90"
  | "rotate180"
  | "rotate270"
  | "holdPiece"
  | "softDrop"
  | "hardDrop";

const SettingsPage = ({ showSettings }: SettingsProperties) => {
  if (!showSettings) return <></>;

  const defaultSettings: Settings = {
    moveLeft: "ArrowLeft",
    moveRight: "ArrowRight",
    rotate180: "KeyQ",
    rotate90: "ArrowUp",
    rotate270: "KeyW",
    holdPiece: "Tab",
    softDrop: "ArrowDown",
    hardDrop: "KeyD",
    dasAmount: 80,
  };

  const [changingSetting, setChangingSetting] = useState<Moves | undefined>();

  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const setSetting = (settingName: Moves, keyCode: string) => {
    let newSettings = { ...settings };

    newSettings[settingName] = keyCode;

    setSettings(newSettings);
  };

  const onUpdateChangingSetting = (settingType: Moves) => {
    setChangingSetting(settingType);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (changingSetting) {
          setSetting(changingSetting, e.code);
          setChangingSetting(undefined);
        }
      }}
      onClick={(e) => {
        setChangingSetting(undefined);
      }}
      className="absolute left-0 top-0 flex h-[100vh] w-[100vw] items-center justify-center"
    >
      <div className="relative z-10 flex flex-col rounded-xl border-2 border-white bg-black  p-6 text-white">
        <h1 className="text-center text-2xl">SETTINGS</h1>
        <div className="p-3"></div>
        <h1 className="text-center text-xl">CONTROLS</h1>
        <div className="p-2"></div>
        <div className="flex ">
          <div className="mr-10">MOVE PIECE LEFT</div>
          <KeySetting
            onUpdateChangingSetting={onUpdateChangingSetting}
            settingKey={settings.moveLeft}
            settingType="moveLeft"
            changingSetting={changingSetting}
            settings={settings}
          />
        </div>
        <div className="flex ">
          <div className="mr-10">MOVE PIECE RIGHT</div>
          <KeySetting
            onUpdateChangingSetting={onUpdateChangingSetting}
            settingKey={settings.moveRight}
            settingType="moveRight"
            changingSetting={changingSetting}
            settings={settings}
          />
        </div>
        <div className="flex ">
          <div className="mr-10">SOFT DROP</div>
          <KeySetting
            onUpdateChangingSetting={onUpdateChangingSetting}
            settingKey={settings.softDrop}
            settingType="softDrop"
            changingSetting={changingSetting}
            settings={settings}
          />
        </div>
        <div className="flex ">
          <div className="mr-10">HARD DROP</div>
          <KeySetting
            onUpdateChangingSetting={onUpdateChangingSetting}
            settingKey={settings.hardDrop}
            settingType="hardDrop"
            changingSetting={changingSetting}
            settings={settings}
          />
        </div>
        <div className="flex ">
          <div className="mr-10">ROTATE COUNTERCLOCKWISE</div>
          <KeySetting
            onUpdateChangingSetting={onUpdateChangingSetting}
            settingKey={settings.rotate270}
            settingType="rotate270"
            changingSetting={changingSetting}
            settings={settings}
          />
        </div>
        <div className="flex ">
          <div className="mr-10">ROTATE CLOCKWISE</div>
          <KeySetting
            onUpdateChangingSetting={onUpdateChangingSetting}
            settingKey={settings.rotate90}
            settingType="rotate90"
            changingSetting={changingSetting}
            settings={settings}
          />
        </div>
        <div className="flex ">
          <div className="mr-10">ROTATE 180</div>
          <KeySetting
            onUpdateChangingSetting={onUpdateChangingSetting}
            settingKey={settings.rotate180}
            settingType="rotate180"
            changingSetting={changingSetting}
            settings={settings}
          />
        </div>
        <div className="flex ">
          <div className="mr-10">SWAP HOLD PIECE</div>
          <KeySetting
            onUpdateChangingSetting={onUpdateChangingSetting}
            settingKey={settings.holdPiece}
            settingType="holdPiece"
            changingSetting={changingSetting}
            settings={settings}
          />
        </div>
        <div className="p-3"></div>
        <h1 className="text-center text-xl">HANDLING</h1>
        <div className="p-2"></div>
        <div className="flex ">
          <div className="mr-10">DAS</div>
          <div className="ml-auto mr-0">
            <input
              className="mr-1 w-6 bg-black !outline-none selection:bg-white selection:text-black hover:cursor-pointer"
              type="text"
              defaultValue={80}
              onClick={(e) => {
                e.currentTarget.select();
              }}
            />
            MS
          </div>
        </div>
        <div className="p-3"></div>
        <div className="w-fit self-end rounded-xl border-2 pt-1 pb-1 pl-5 pr-5 hover:cursor-pointer hover:bg-white hover:text-black">
          Save and exit
        </div>
      </div>
    </div>
  );
};
type KeySettingProperties = {
  changingSetting: Moves | undefined;
  onUpdateChangingSetting: (settingType: Moves) => void;
  settingKey: string;
  settingType: Moves;
  settings: Settings;
};

const KeySetting = ({
  changingSetting,
  onUpdateChangingSetting,
  settingKey,
  settingType,
  settings,
}: KeySettingProperties) => {
  const convertKeyCodeTostring = (keyCode: string, move: Moves): string => {
    if (move == changingSetting) {
      return "[NOT SET]";
    }

    return keyCode;
  };

  const posibleActions: Moves[] = [
    "hardDrop",
    "holdPiece",
    "moveLeft",
    "moveRight",
    "rotate180",
    "rotate270",
    "rotate90",
    "softDrop",
  ];

  const isValid = (): boolean => {
    let moveKeyCount = 0;
    posibleActions.forEach((move) => {
      if (settings[move] == settingKey) {
        moveKeyCount += 1;
      }
    });

    return moveKeyCount <= 1;
  };

  return (
    <div
      className={`ml-auto mr-0 w-24 text-right hover:cursor-pointer ${
        isValid() ? "" : "text-red-500"
      }  ${settingType == changingSetting ? "text-red-500" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onUpdateChangingSetting(settingType);
      }}
    >
      {convertKeyCodeTostring(settingKey, settingType)}
    </div>
  );
};

export default SettingsPage;
