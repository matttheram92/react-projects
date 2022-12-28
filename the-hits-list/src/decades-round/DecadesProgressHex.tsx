import { BsHexagon, BsHexagonFill } from "react-icons/bs";
import { QuestionStatus } from "./DecadesRoundInfo";

export function DecadesProgressHex(props: {
  text: string;
  status: QuestionStatus;
}) {
  const getTextColor = () => {
    switch (props.status) {
      case QuestionStatus.Unanswered:
      default:
        return "purple-500";
      case QuestionStatus.Answering:
        return "white";
      case QuestionStatus.Correct:
        return "green-400";
      case QuestionStatus.Incorrect:
        return "red-500";
    }
  };
  return (
    <div className="flex text-purple-500 text-amber-200 text-green-400 text-red-500">
      <BsHexagonFill className="text-8xl text-purple-700" />
      <BsHexagon className="text-8xl -ml-24 text-purple-900" />
      <p
        className={`text-${getTextColor()} mx-5 mt-6 text-4xl absolute font-bold`}
      >
        {props.text}
      </p>
    </div>
  );
}
