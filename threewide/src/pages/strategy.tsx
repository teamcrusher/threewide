import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { MouseEvent, useState } from "react";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import { PieceType } from "src/types/tetris";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";
import { Session, User } from "next-auth";
import { useRouter } from "next/router";
import { Game, Goal } from "src/models/game_description.model";
import TetrisGame from "@components/Game";
import { useSession } from "next-auth/react";
import { UserGame } from "src/server/trpc/router/gameDescription";
import Header from "@components/Header";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { Settings } from "@components/Settings";
import { userAgent } from "next/server";

type ActiveGame = {
  game: Game;
  gameName: string;
  gameId: string;
  isCompleted: boolean;
};

const Strategy = (user: User) => {
  const router = useRouter();
  const [overlay, setOverlay] = useState(false);

  const [activeGame, setActiveGame] = useState<ActiveGame | undefined>();

  const stratName: string = router.query.name as string;
  const [gameMessage, setGameMessage] = useState<string>("");

  const gameDescriptions = trpc.gameDescription.getGames.useQuery({
    name: stratName,
    userId: user.name!,
  });

  const defaultSettings: Settings = {
    keySettings: {
      moveLeft: "ArrowLeft",
      moveRight: "ArrowRight",
      rotate180: "KeyQ",
      rotate270: "KeyW",
      rotate90: "ArrowUp",
      holdPiece: "Tab",
      hardDrop: "KeyD",
      softDrop: "ArrowDown",
    },
    dasAmount: 80,
  };

  const userSettings = trpc.user.getUserSettings.useQuery({
    userId: user.name,
  });

  const saveUserSettings = trpc.user.saveUserSettings.useMutation();

  const [settings, setSettings] = useState<Settings | undefined>(
    userSettings.data?.settings
  );

  if (userSettings.data && !settings) {
    setSettings(userSettings.data.settings);
  }

  const userGameResult = trpc.userGameResult.createUserGameResult.useMutation();

  const copyBoard = (board: PieceType[][]): PieceType[][] => {
    let newBoard: PieceType[][] = [];

    for (let row of board) {
      let newRow: PieceType[] = [];
      for (let item of row) {
        newRow.push(item);
      }
      newBoard.push(newRow);
    }
    return newBoard;
  };

  const updateBoard = (
    e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>,
    game: Game,
    gameName: string,
    gameId: string,
    isCompleted: boolean
  ): void => {
    e.preventDefault();
    console.log(game.startingBoardState);

    let gameCopy: Game = {
      startingBoardState: copyBoard(game.startingBoardState),
      startingPieceQueue: [...game.startingPieceQueue],
      goal: game.goal,
      gameId: game.gameId,
      name: game.name,
    };

    setGameMessage("");
    setActiveGame({ game: gameCopy, gameName, gameId, isCompleted });
  };

  const onGameWin = (): void => {
    userGameResult.mutate({
      userId: user.name!,
      gameId: activeGame?.gameId!,
      isCompleted: true,
    });

    let game = gameDescriptions.data!.games!.filter(
      (game) => game.gameId == activeGame!.gameId
    )[0]!;

    game.isAttempted = true;
    game.isCompleted = true;
  };

  const onGameLose = (): void => {
    if (!activeGame?.isCompleted)
      userGameResult.mutate({
        userId: user.name!,
        gameId: activeGame?.gameId!,
        isCompleted: false,
      });

    gameDescriptions.data!.games!.filter(
      (game) => game.gameId == activeGame!.gameId
    )[0]!.isAttempted = true;
  };

  const clickRandom = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ): void => {
    e.preventDefault();
    if (!gameDescriptions.data) return;
    let randomGame =
      gameDescriptions.data?.games![
        Math.floor(gameDescriptions.data.games?.length! * Math.random())
      ];

    updateBoard(
      e,
      randomGame!,
      randomGame?.name!,
      randomGame?.gameId!,
      randomGame?.isCompleted!
    );
  };

  const onOverlayToggle = (over: boolean) => {
    setOverlay(over);
  };

  const onSettingsUpdateHandler = (newSettings: Settings) => {
    saveUserSettings.mutate({
      userId: user.name,
      settings: newSettings,
    });

    setSettings(newSettings);
  };

  return (
    <>
      <Head>
        <title>{`Threewide ${stratName}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <style>{dom.css()}</style>
      </Head>
      <div
        className={overlay ? "fixed z-20 h-[100%] w-[100%] bg-black/70" : ""}
      ></div>
      <Header addHomeIcon={true} />
      <div className="flex w-full p-4">
        <div className="flex w-full flex-col justify-start pt-6 text-2xl text-blue-500"></div>
        <div className="ml-0 mr-auto">
          <h1 className="mb-4 text-center text-2xl capitalize">
            {activeGame?.gameName ?? "Practice mode"}
          </h1>
          <TetrisGame
            key={`Active game: ${activeGame?.gameName}`}
            game={activeGame?.game}
            onGameLose={onGameLose}
            onGameWin={onGameWin}
            onOverlayToggle={onOverlayToggle}
            settings={settings ?? defaultSettings}
            onSettingsUpdate={onSettingsUpdateHandler}
          >
            {userSettings.data ? (
              <></>
            ) : (
              <p className="m-2 text-center text-white">Loading settings...</p>
            )}
          </TetrisGame>

          <div className="mt-3 grid grid-cols-3">
            {gameDescriptions.data ? (
              gameDescriptions.data.games?.map(
                (game: UserGame, index: number) => (
                  <p
                    key={`game ${index}`}
                    className={`mr-2 ml-2 select-none rounded-lg border-2 text-center text-white hover:cursor-pointer hover:bg-white ${
                      game.isCompleted
                        ? "border-green-500 bg-green-500 hover:text-green-500"
                        : game.isAttempted
                        ? "border-yellow-500 bg-yellow-500 hover:text-yellow-500"
                        : "border-black bg-black hover:text-black"
                    }`}
                    onClick={(e) =>
                      updateBoard(
                        e,
                        game,
                        game.name,
                        game.gameId,
                        game.isCompleted
                      )
                    }
                  >
                    {game.name}
                  </p>
                )
              )
            ) : (
              <p> Loading... </p>
            )}
          </div>
          <div className="mt-3 grid grid-cols-3">
            <div className="mr-2 ml-2"></div>
            <div
              onClick={(e) => clickRandom(e)}
              className="mr-2 ml-2 select-none rounded-lg border-2 border-black bg-black text-center text-white hover:cursor-pointer hover:bg-white hover:text-black"
            >
              Random
            </div>
            <div className="mr-2 ml-2"></div>
          </div>

          <div>{gameMessage}</div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  if (!session || !session?.user?.name) {
    return {
      redirect: { destination: "/login" },
      props: {},
    };
  }
  return {
    props: session.user,
  };
};

export default Strategy;
