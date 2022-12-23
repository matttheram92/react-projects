import React, { useEffect, useState } from "react";
import { DecadesProgress } from "./DecadesProgress";
import DecadesQuestion from "./DecadesQuestion";
import { DecadesQuestionInfo } from "./DecadesRoundInfo";
import { DecadesScoreboard } from "./DecadesScoreboard";

export function DecadesRound() {
  const randomPageNo = Math.floor(Math.random() * 200);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const handleEdit = (question: DecadesQuestionInfo) => {
    console.log(question);
  };

  useEffect(() => {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=00s&page=${randomPageNo}&format=json&limit=1&api_key=f2dc537249c67b7a5a0b7597760ee60e`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.tracks.track);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Decades Round</h2>
      <div className="text-pink-500 text-cyan-500 text-orange-200"></div>
      <div className="flex my-7 rounded-lg scorecard-container">
        <DecadesScoreboard color="pink-500" />
        <DecadesScoreboard color="cyan-500" />
        <DecadesScoreboard color="orange-200" />
      </div>
      <div className="flex">
        <DecadesProgress />
      </div>
      {items.length > 0 && (
        <DecadesQuestion questions={items} onEdit={handleEdit} />
      )}
    </>
  );
}
