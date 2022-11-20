import React from "react";
import Logo from "../../public/logo.svg";

const Header = () => {
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
    </div>
  );
};

export default Header;
