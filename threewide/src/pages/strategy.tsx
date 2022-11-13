import {
  GetServerSideProps,
  GetServerSidePropsContext,
  type NextPage,
} from "next";
import { useState } from "react";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import Tetris from "@components/Tetris";
import { PieceType } from "src/types/tetris";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import Piece from "@components/Piece";

const Home = (session: Session) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

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
      PieceType.None,
    ],
  ]);
  const [startingPieceQueue, setStartingPieceQueue] = useState<PieceType[]>([]);

  const stratagies = trpc.strategy.search.useQuery({ name: search });

  return (
    <>
      <Head>
        <title>Three wide {router.query.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full p-4">
        <div className="flex w-full flex-col justify-start pt-6 text-2xl text-blue-500"></div>
        <div className="ml-0 mr-auto">
          <Tetris
            width={200}
            height={400}
            startingBoardState={startingBoardState}
            startingPieceQueue={startingPieceQueue}
            generatePieceQueue={false}
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
