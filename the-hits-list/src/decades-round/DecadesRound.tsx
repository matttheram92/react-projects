import React, { useEffect, useRef, useState } from "react";
import { DecadesProgress } from "./DecadesProgress";
import DecadesQuestion from "./DecadesQuestion";
import {
  Decades,
  DecadesQuestionInfo,
  getRandomYearInDecade,
  QuestionStatus,
} from "./DecadesRoundInfo";
import { DecadesScoreboard } from "./DecadesScoreboard";

interface DecadesRoundProps {
  toNextRound: () => void;
}

export function DecadesRound(props: DecadesRoundProps) {
  const { toNextRound } = props;
  const decadesFetchedRef = useRef([] as Decades[]);
  const [tracks, setTracks] = useState([] as DecadesQuestionInfo[]);
  const [decade, setDecade] = useState(Decades["10s"]);
  const [progress, setProgress] = useState([
    { decade: Decades["10s"], status: QuestionStatus.Answering },
    { decade: Decades["00s"], status: QuestionStatus.Unanswered },
    { decade: Decades["90s"], status: QuestionStatus.Unanswered },
    { decade: Decades["80s"], status: QuestionStatus.Unanswered },
    { decade: Decades["70s"], status: QuestionStatus.Unanswered },
  ] as { decade: Decades; status: QuestionStatus }[]);

  const handleAnswerQuestion = (status: QuestionStatus) => {
    const currentDecadeIndex = progress.findIndex((x) => x.decade === decade);
    progress[currentDecadeIndex].status = status;
    setProgress(progress);
  };

  const handleNextQuestion = async (question: DecadesQuestionInfo) => {
    const currentDecadeIndex = progress.findIndex((x) => x.decade === decade);
    const nextQuestion = progress[currentDecadeIndex + 1];
    if (!nextQuestion) {
      toNextRound();
      return;
    }

    await fetchTrack(nextQuestion.decade);
    nextQuestion.status = QuestionStatus.Answering;
    setDecade(nextQuestion.decade);
  };

  useEffect(() => {
    if (decadesFetchedRef.current.includes(decade)) {
      return;
    }
    fetchTrack(decade);
    decadesFetchedRef.current.push(decade);
  }, []);

  const fetchTrack = async (decadeToGet: Decades): Promise<void> => {
    const yearToGet = getRandomYearInDecade(decadeToGet);
    const randomPageNo = Math.floor(Math.random() * 100);
    await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${yearToGet}&page=${randomPageNo}&format=json&limit=1&api_key=f2dc537249c67b7a5a0b7597760ee60e`
    )
      .then((res) => res.json())
      .then((result) => {
        setTracks(result.tracks.track);
      });
  };

  const correctAnswers = (): boolean[] => {
    return progress
      .filter((x) => x.status === QuestionStatus.Correct)
      .map(() => true);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Decades Round</h2>
      <div className="text-pink-500 text-cyan-500 text-orange-200"></div>
      <div className="flex my-7 rounded-lg scorecard-container">
        <DecadesScoreboard color="pink-500" correctAnswers={correctAnswers()} />
        <DecadesScoreboard color="cyan-500" correctAnswers={[]} />
        <DecadesScoreboard color="orange-200" correctAnswers={[]} />
      </div>
      <div className="flex">
        {progress.length > 0 && <DecadesProgress progress={progress} />}
      </div>
      {tracks.length > 0 && (
        <DecadesQuestion
          key={decade}
          question={tracks[0]}
          toNextQuestion={handleNextQuestion}
          answerQuestion={handleAnswerQuestion}
        />
      )}
    </>
  );
}
