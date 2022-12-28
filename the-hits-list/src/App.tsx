import React from "react";
import { IoIosPlay } from "react-icons/io";
import { DecadesRound } from "./decades-round/DecadesRound";

function App() {
  const goToNextRound = (): void => {
    console.log("next round");
    return;
  };

  return (
    <div className="container w-full max-w-full h-full py-8 px-10 lg:px-64 font-sans bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex font-bold text-center">
        <div className="flex m-auto">
          <h1 className="text-xl my-auto">The</h1>
          <h1 className="text-3xl">Hits</h1>
          <IoIosPlay className="text-4xl" />
          <h1 className="text-3xl">List</h1>
        </div>
      </div>
      <DecadesRound key="decades" toNextRound={goToNextRound} />
    </div>
  );
}

export default App;
