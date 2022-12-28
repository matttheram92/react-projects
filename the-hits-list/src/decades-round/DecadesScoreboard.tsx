import React from "react";
import { BsPlay, BsPlayFill } from "react-icons/bs";

export function DecadesScoreboard(props: {
  color: string;
  correctAnswers: boolean[];
}) {
  return (
    <div className="flex m-auto">
      <div className="mt-36">
        <BsPlay className={`-mt-20 text-9xl text-${props.color}`} />
        {props.correctAnswers.length >= 5 ? (
          <BsPlayFill className={`-mt-32 text-9xl text-${props.color}`} />
        ) : (
          ""
        )}
        <BsPlay className={`-mt-20 rotate-180 text-9xl text-${props.color}`} />
        {props.correctAnswers.length >= 4 ? (
          <BsPlayFill
            className={`-mt-32 rotate-180 text-9xl text-${props.color}`}
          />
        ) : (
          ""
        )}
        <BsPlay className={`-mt-20 text-9xl text-${props.color}`} />
        {props.correctAnswers.length >= 3 ? (
          <BsPlayFill className={`-mt-32 text-9xl text-${props.color}`} />
        ) : (
          ""
        )}
        <BsPlay className={`-mt-20 rotate-180 text-9xl text-${props.color}`} />
        {props.correctAnswers.length >= 2 ? (
          <BsPlayFill
            className={`-mt-32 rotate-180 text-9xl text-${props.color}`}
          />
        ) : (
          ""
        )}
        <BsPlay className={`-mt-20 text-9xl text-${props.color}`} />
        {props.correctAnswers.length >= 1 ? (
          <BsPlayFill className={`-mt-32 text-9xl text-${props.color}`} />
        ) : (
          ""
        )}
      </div>
      <div className="-ml-14">
        <BsPlay className={`rotate-180 text-9xl text-${props.color}`} />
        <BsPlay className={`-mt-20 text-9xl text-${props.color}`} />
        <BsPlay className={`-mt-20 rotate-180 text-9xl text-${props.color}`} />
        <BsPlay className={`-mt-20 text-9xl text-${props.color}`} />
        <BsPlay className={`-mt-20 rotate-180 text-9xl text-${props.color}`} />
      </div>
    </div>
  );
}
