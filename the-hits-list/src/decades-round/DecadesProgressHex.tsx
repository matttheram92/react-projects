import { BsHexagon, BsHexagonFill } from "react-icons/bs";
import { QuestionStatus } from "./DecadesRoundInfo";

export function DecadesProgressHex(props: {
  text: string;
  status: QuestionStatus;
}) {
  return (
    <div className="flex">
      <BsHexagonFill className="text-8xl text-purple-700" />
      <BsHexagon className="text-8xl -ml-24 text-purple-900" />
      <p className="text-white mx-5 mt-6 text-4xl absolute font-bold">
        {props.text}
      </p>
    </div>
  );
}
