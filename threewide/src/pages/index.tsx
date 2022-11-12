import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Tetris from "@components/Tetris";
import { PieceType } from "src/types/tetris";
import { getPieceSizesFromPieceType } from "@utils/tetris/PieceSizes";

const Home: NextPage = () => {
  const [search, setSearch] = useState(PieceType.None);

  // const stratagies = trpc.strategy.search.useQuery({ name: search });

  const convertStringsToPieceType = (grid: string[][]): PieceType[][] => {
    let pieceTypeGrid: PieceType[][] = [];

    for (let row of grid) {
      let pieceTypeRow: PieceType[] = [];

      for (let item of row) {
        switch (item) {
          case "":
            pieceTypeRow.push(PieceType.None);
            break;
          case "T":
            pieceTypeRow.push(PieceType.T);
            break;
          case "L":
            pieceTypeRow.push(PieceType.L);
            break;
          case "S":
            pieceTypeRow.push(PieceType.S);
            break;
          case "Z":
            pieceTypeRow.push(PieceType.Z);
            break;
          case "I":
            pieceTypeRow.push(PieceType.I);
            break;
          case "O":
            pieceTypeRow.push(PieceType.O);
            break;
          case "J":
            pieceTypeRow.push(PieceType.J);
            break;
          default:
            pieceTypeRow.push(PieceType.None);
        }
      }
      pieceTypeGrid.push(pieceTypeRow);
    }
    return pieceTypeGrid;
  };

  const startingBoardState: PieceType[][] = convertStringsToPieceType([
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
  ]);

  const startingBoardQueue: PieceType[] = [];

  return (
    <>
      <Head>
        <title>Three wide</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className="flex w-full flex-col items-center justify-center pt-6 text-2xl text-blue-500">
        <input
          className="border-2 border-black"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        {stratagies.data ? (
          stratagies.data.results?.map((result) => <p>{result.name}</p>)
        ) : (
          <p>Loading..</p>
        )}
      </div> */}

      <Tetris
        width={200}
        height={400}
        startingBoardState={startingBoardState}
        startingPieceQueue={startingBoardQueue}
        generatePieceQueue={true}
      />
    </>
  );
};

export default Home;
