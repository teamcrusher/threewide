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

type ActiveGame = {
  game: Game;
  gameName: string;
  gameIndex: number;
};

const Strategy = (session: Session) => {
  const router = useRouter();

  const [activeGame, setActiveGame] = useState<ActiveGame | undefined>();

  const stratName: string = router.query.name as string;
  const [gameMessage, setGameMessage] = useState<string>("");

  const gameDescriptions = trpc.gameDescription.getGames.useQuery({
    name: stratName,
  });

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
    gameIndex: number
  ): void => {
    e.preventDefault();
    let gameCopy: Game = {
      startingBoardState: copyBoard(game.startingBoardState),
      startingPieceQueue: [...game.startingPieceQueue],
      goal: game.goal,
    };

    console.log(gameCopy.startingBoardState);
    setGameMessage("");
    setActiveGame({ game: gameCopy, gameName, gameIndex });
  };

  const onGameWin = (): void => {
    setGameMessage("You win");
  };

  const onGameLose = (): void => {
    // setActiveGame({
    //   game: activeGame!.game,
    //   gameName: activeGame!.gameName + new Date().getTime().toString(),
    // });
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
            gameDescriptions.data.games?.map((game, index) => (
              <p
                key={`game ${index}`}
                onClick={(e) => updateBoard(e, game, `game ${index}`, index)}
              >
                Game: {index}
              </p>
            ))
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
    props: {
      session,
    },
  };
};

export default Strategy;
