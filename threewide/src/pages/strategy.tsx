import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { MouseEvent, useState } from "react";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import { PieceType } from "src/types/tetris";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { Game, Goal } from "src/models/game_description.model";
import TetrisGame from "@components/Game";
import { useSession } from "next-auth/react";
import { UserGame } from "src/server/trpc/router/gameDescription";

type ActiveGame = {
  game: Game;
  gameName: string;
  gameId: string;
  isCompleted: boolean;
};

const Strategy = () => {
  const router = useRouter();
  const session = useSession();

  const [activeGame, setActiveGame] = useState<ActiveGame | undefined>();

  const stratName: string = router.query.name as string;
  const [gameMessage, setGameMessage] = useState<string>("");

  const gameDescriptions = trpc.gameDescription.getGames.useQuery({
    name: stratName,
    userId: session.data?.user?.name!,
  });

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
    };

    setGameMessage("");
    setActiveGame({ game: gameCopy, gameName, gameId, isCompleted });
  };

  const onGameWin = (): void => {
    userGameResult.mutate({
      userId: session.data?.user?.name!,
      gameId: activeGame?.gameId!,
      isCompleted: true,
    });

    let game = gameDescriptions.data!.games!.filter(
      (game) => game.gameId == activeGame!.gameId
    )[0]!;

    game.isAttempted = true;
    game.isCompleted = true;
    setGameMessage("You win");
  };

  const onGameLose = (): void => {
    if (!activeGame?.isCompleted)
      userGameResult.mutate({
        userId: session.data?.user?.name!,
        gameId: activeGame?.gameId!,
        isCompleted: false,
      });

    gameDescriptions.data!.games!.filter(
      (game) => game.gameId == activeGame!.gameId
    )[0]!.isAttempted = true;

    setGameMessage("Try again");
  };

  return (
    <>
      <Head>
        <title>Three wide {stratName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full p-4">
        <div className="flex w-full flex-col justify-start pt-6 text-2xl text-blue-500">
          {gameDescriptions.data ? (
            gameDescriptions.data.games?.map(
              (game: UserGame, index: number) => (
                <p
                  key={`game ${index}`}
                  style={{
                    color: game.isCompleted
                      ? "green"
                      : game.isAttempted
                      ? "yellow"
                      : "blue",
                  }}
                  onClick={(e) =>
                    updateBoard(
                      e,
                      game,
                      `game ${index}`,
                      game.gameId,
                      game.isCompleted
                    )
                  }
                >
                  Game: {index}
                </p>
              )
            )
          ) : (
            <p> Loading... </p>
          )}
        </div>
        <div className="ml-0 mr-auto">
          <TetrisGame
            key={`Active game: ${activeGame?.gameName}`}
            game={activeGame?.game}
            onGameLose={onGameLose}
            onGameWin={onGameWin}
          />
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

  if (!session) {
    return {
      redirect: { destination: "/login" },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Strategy;
