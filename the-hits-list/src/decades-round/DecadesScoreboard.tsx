import React from "react";
import { FiPlay } from "react-icons/fi";

export function DecadesScoreboard(props: { color: string }) {
  return (
    <div className="flex m-auto">
      <div className="mt-36">
        <FiPlay className={`text-9xl text-${props.color}`} />
        <FiPlay className={`-mt-14 rotate-180 text-9xl text-${props.color}`} />
        <FiPlay className={`-mt-14 text-9xl text-${props.color}`} />
        <FiPlay className={`-mt-14 rotate-180 text-9xl text-${props.color}`} />
        <FiPlay className={`-mt-14 text-9xl text-${props.color}`} />
      </div>
      <div className="-ml-8">
        <FiPlay className={`rotate-180 text-9xl text-${props.color}`} />
        <FiPlay className={`-mt-14 text-9xl text-${props.color}`} />
        <FiPlay className={`-mt-14 rotate-180 text-9xl text-${props.color}`} />
        <FiPlay className={`-mt-14 text-9xl text-${props.color}`} />
        <FiPlay className={`-mt-14 rotate-180 text-9xl text-${props.color}`} />
      </div>
    </div>
  );
}
