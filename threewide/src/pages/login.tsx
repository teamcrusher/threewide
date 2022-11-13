import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const signInUser = async () => {
    let signInOptions = { redirect: false, username, password };
    const res = await signIn("credentials", signInOptions);
    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      return await router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Three wide</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Login</div>
      <label htmlFor="">Username</label>
      <input
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="">Password</label>
      <input
        type="text"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={(e) => signInUser()}>Log in or sign up</button>
      <div>{errorMessage}</div>
    </>
  );
};

export default Login;
