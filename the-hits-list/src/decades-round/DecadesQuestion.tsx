import { useEffect, useState } from "react";
import DecadesForm from "./DecadesForm";
import {
  DecadesGuess,
  DecadesQuestionInfo,
  QuestionStatus,
} from "./DecadesRoundInfo";
import logo from "./icons8-audio-wave.gif";

interface DecadesQuestionProps {
  question: DecadesQuestionInfo;
  toNextQuestion: (question: DecadesQuestionInfo) => void;
  answerQuestion: (status: QuestionStatus) => void;
}

function DecadesQuestion(props: DecadesQuestionProps) {
  const { question, toNextQuestion, answerQuestion } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [track, setTrack] = useState({
    previewURL: "",
    name: "",
    artistName: "",
  });
  const [playing, setPlaying] = useState(false);
  let [countdown, setCountdown] = useState(10);
  let [questionStatus, setStatus] = useState(QuestionStatus.Unanswered);

  useEffect(() => {
    if (!question) {
      return;
    }
    fetch(
      `https://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${question.name} ${question.artist.name}&per_type_limit=1&type=track`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTrack(result.search.data.tracks[0]);
        },
        (error) => {}
      );
  }, []);

  const playOnClick = (): void => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    if (audio) {
      setPlaying(true);
      //adjustCountdown();
      audio.play();
    }
  };

  const nextQuestion = (): void => {
    toNextQuestion(question);
  };

  const adjustCountdown = (): void => {
    if (countdown === 0) {
      return;
    }

    setTimeout(() => {
      setCountdown(countdown - 1);
      countdown--;
      adjustCountdown();
    }, 1000);
  };

  const formSubmitted = (guess: DecadesGuess): void => {
    if (
      guess.artist.toLowerCase() === question.artist.name.toLowerCase() &&
      guess.title.toLowerCase() === question.name.toLowerCase()
    ) {
      questionStatus = QuestionStatus.Correct;
    } else {
      questionStatus = QuestionStatus.Incorrect;
    }
    setStatus(questionStatus);
    answerQuestion(questionStatus);
  };

  return (
    <div className="grid">
      {!playing ? (
        <button
          onClick={playOnClick}
          className="shadow w-52 mx-auto my-3 border-white border-4 bg-purple-600 hover:bg-purple-400 text-4xl focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
        >
          Play
        </button>
      ) : (
        <button className="shadow h-16 w-52 mx-auto my-3 border-white border-4 bg-purple-600 text-4xl focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full">
          {/* {countdown} */}
          <img className="m-auto h-10" src={logo} alt="loading..." />
        </button>
      )}

      {questionStatus === "Incorrect" || questionStatus === "Correct" ? (
        <button
          onClick={nextQuestion}
          className="shadow w-52 mx-auto my-3 border-white border-4 bg-purple-600 hover:bg-purple-400 text-4xl focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
        >
          Next
        </button>
      ) : (
        ""
      )}
      <AudioSection isLoaded={isLoaded} track={track} />

      {questionStatus === "Incorrect" || questionStatus === "Correct" ? (
        <ul key={question.mbid} className="row m-auto text-center">
          <li>{questionStatus}</li>

          <li>{question.name}</li>
          <li>{question.artist.name}</li>
        </ul>
      ) : (
        ""
      )}

      <DecadesForm onSubmit={formSubmitted} />
    </div>
  );
}

export default DecadesQuestion;

function AudioSection(props: { isLoaded: boolean; track: any }) {
  const setPauseTimer = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    setTimeout(() => audio.pause(), 10000);
  };
  if (props.isLoaded) {
    return (
      <audio
        id="audio"
        controls
        className="audio hidden"
        onPlaying={setPauseTimer}
      >
        <source src={props.track.previewURL} type="audio/mpeg"></source>
      </audio>
    );
  }
  return <></>;
}
