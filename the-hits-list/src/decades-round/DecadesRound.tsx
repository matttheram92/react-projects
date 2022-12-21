import React, { useEffect, useState } from "react";
import DecadesQuestion from "./DecadesQuestion";
import { DecadesQuestionInfo } from "./DecadesRoundInfo";
import { MOCK_DECADES_ROUND } from "./MockDecadesRound";

function DecadesRound() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const handleEdit = (question: DecadesQuestionInfo) => {
    console.log(question);
  };

  useEffect(() => {
    fetch(
      "http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=00s&page=1&format=json&limit=1&api_key=f2dc537249c67b7a5a0b7597760ee60e"
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
      <h1 className="text-3xl font-bold underline">Decades Round</h1>
      <DecadesQuestion questions={items} onEdit={handleEdit} />
    </>
  );
}

export default DecadesRound;
