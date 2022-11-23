import React from "react";
import Logo from "../../public/logo.svg";
import Link from "next/link";

export type HeaderProps = {
  addHomeIcon: boolean;
};

const Header = ({ addHomeIcon }: HeaderProps) => {
  function addHome() {
    if (addHomeIcon) {
      return (
        <Link
          className="z-0 rounded-xl border-2 border-black bg-black pl-4 pr-4 pt-1 pb-1 text-lg text-white hover:bg-white hover:text-black"
          href={"/"}
        >
          Home
        </Link>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div className="flex items-center border-b-4 border-black">
      <img src={Logo.src} height={150} width={150} alt="" />

      <div>
        <h1 className="text-5xl">
          <span className="text-red-500">Th</span>
          <span className="text-orange-500">r</span>
          <span className="text-yellow-500">ee</span>
          <span className="text-green-500">W</span>
          <span className="text-blue-500">id</span>
          <span className="text-purple-500">e</span>
        </h1>
        <h2 className="text-2xl">Educational Tetris Platform</h2>
      </div>
      <div className="ml-auto mr-0 flex h-[150px] flex-col-reverse p-5">
        {addHome()}
      </div>
    </div>
  );
};

export default Header;
