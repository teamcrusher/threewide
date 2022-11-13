import {
  GetServerSideProps,
  GetServerSidePropsContext,
  type NextPage,
} from "next";
import { MouseEvent, useState } from "react";
import Head from "next/head";
import { Schema } from "mongoose";

import { trpc } from "../utils/trpc";
import Tetris from "@components/Tetris";
import { PieceType } from "src/types/tetris";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { GameDescription } from "src/models/game_description.model";

const Home = (session: Session) => {
  const router = useRouter();

  const [startingBoardState, setStartingBoardState] = useState<PieceType[][]>([
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
    [
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
      PieceType.None,
    ],
  ]);
  const [startingPieceQueue, setStartingPieceQueue] = useState<PieceType[]>([]);
  const [playGame, setPlayGame] = useState<boolean>(false);
  const [gameName, setGameName] = useState("");
  const stratName: string = router.query.name as string;

  const gameDescriptions = trpc.gameDescription.getGames.useQuery({
    name: stratName,
  });

  const gameData = gameDescriptions.data;

  const updateBoard = (
    e: MouseEvent<HTMLParagraphElement, globalThis.MouseEvent>,
    startingBoardState: PieceType[][],
    startingPieceQueue: PieceType[],
    gameName: string
  ): void => {
    e.preventDefault();
    setStartingBoardState(startingBoardState);
    setStartingPieceQueue(startingPieceQueue);
    setPlayGame(true);
    setGameName(gameName);
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
                onClick={(e) =>
                  updateBoard(
                    e,
                    game.startingBoardState,
                    game.startingPieceQueue,
                    `game ${index}`
                  )
                }
              >
                Game: {index}
              </p>
            ))
          ) : (
            <p> Loading... </p>
          )}
        </div>
        <div className="ml-0 mr-auto">
          <Tetris
            key={`Active game: ${gameName}`}
            width={200}
            height={400}
            startingBoardState={startingBoardState}
            startingPieceQueue={startingPieceQueue}
            generatePieceQueue={false}
            playGame={playGame}
          />
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

export default Home;
