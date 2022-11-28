import {
  GetServerSideProps,
  GetServerSidePropsContext,
  type NextPage,
} from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Tetris from "@components/Tetris";
import { PieceType } from "src/types/tetris";
import { getServerAuthSession } from "src/server/common/get-server-auth-session";
import { Session } from "next-auth";
import { Settings } from "@components/Settings";

const Home = (session: Session) => {
  const [search, setSearch] = useState<string>("");

  const stratagies = trpc.strategy.search.useQuery({ name: search });

  const startingSettings: Settings = {
    keySettings: {
      moveLeft: "ArrowLeft",
      moveRight: "ArrowRight",
      rotate180: "KeyQ",
      rotate270: "KeyW",
      rotate90: "ArrowUp",
      holdPiece: "Tab",
      hardDrop: "KeyD",
      softDrop: "ArrowDown",
      reset: "KeyR",
      next: "KeyY",
      previous: "KeyT",
    },
    dasAmount: 80,
  };

  const startingBoardState: PieceType[][] = [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["S", "S", "S", "S", "S", "S", "", "", "", ""],
    ["S", "S", "S", "S", "S", "S", "", "", "", ""],
    ["S", "S", "S", "S", "S", "S", "", "S", "S", ""],
  ] as PieceType[][];

  const startingBoardQueue: PieceType[] = [];

  return (
    <>
      <Head>
        <title>Three wide</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full p-4">
        <div className="flex w-full flex-col justify-start pt-6 text-2xl text-blue-500">
          <input
            className="border-2 border-black"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
          {stratagies.data ? (
            stratagies.data.results?.map((result, index) => (
              <Link
                href={`/strategy?name=${result.name}`}
                key={`result #${index}`}
              >
                {result.name}
              </Link>
            ))
          ) : (
            <p>Loading..</p>
          )}
        </div>
        <div className="ml-0 mr-auto">
          <Tetris
            width={200}
            height={400}
            startingBoardState={startingBoardState}
            startingPieceQueue={startingBoardQueue}
            generatePieceQueue={true}
            settings={startingSettings}
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
