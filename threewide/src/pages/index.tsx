import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [search, setSearch] = useState("")

  const stratagies = trpc.strategy.search.useQuery({ name: search });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
        <div className="flex flex-col w-full items-center justify-center pt-6 text-2xl text-blue-500">
          <input className="border-2 border-black" type="text" onChange={(e) => setSearch(e.target.value)} />
          {stratagies.data ? stratagies.data.results?.map(result => <p>{result.name}</p>) : <p>Loading..</p>}
        </div>
    </>
  );
};

export default Home;