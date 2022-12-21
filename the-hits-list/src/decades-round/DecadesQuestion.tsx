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
  return (
    <ul className="row">
      {questions.map((question) => (
        <div key={question.mbid}>
          <li>{question.name}</li>
          <li>{question.artist.name}</li>
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
    </ul>
  );
}

export default DecadesQuestion;
