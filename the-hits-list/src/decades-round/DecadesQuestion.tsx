import { useEffect, useState } from "react";
import DecadesForm from "./DecadesForm";
import { DecadesQuestionInfo } from "./DecadesRoundInfo";

interface DecadesQuestionProps {
  questions: DecadesQuestionInfo[];
  onEdit: (question: DecadesQuestionInfo) => void;
}

function DecadesQuestion(props: DecadesQuestionProps) {
  const { questions, onEdit } = props;
  const handleEditClick = (questionBeingEdited: DecadesQuestionInfo) => {
    onEdit(questionBeingEdited);
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [track, setTrack] = useState({
    previewURL: "",
    name: "",
    artistName: "",
  });

  useEffect(() => {
    if (questions.length === 0) {
      return;
    }
    fetch(
      `https://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${questions[0].name} ${questions[0].artist.name}&per_type_limit=1&type=track`
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
      audio.play();
    }
  };

  return (
    <ul className="row">
      <button onClick={playOnClick}>Play</button>
      <AudioSection isLoaded={isLoaded} track={track} />
      {questions.map((question) => (
        <div key={question.mbid}>
          <li>{track.name}</li>
          <li>{track.artistName}</li>
          <button
            className="font-bold underline"
            onClick={() => {
              handleEditClick(question);
            }}
          >
            <span className="icon-edit "></span>Edit
          </button>
        </div>
      ))}
      <DecadesForm />
    </ul>
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
      <audio id="audio" controls className="audio" onPlaying={setPauseTimer}>
        <source src={props.track.previewURL} type="audio/mpeg"></source>
      </audio>
    );
  }
  return <></>;
}
