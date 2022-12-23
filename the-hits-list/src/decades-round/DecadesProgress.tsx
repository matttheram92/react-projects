import { BsHexagon, BsHexagonFill } from "react-icons/bs";
import { DecadesProgressHex } from "./DecadesProgressHex";
import { QuestionStatus } from "./DecadesRoundInfo";

export function DecadesProgress() {
  return (
    <div className="flex m-auto">
      <DecadesProgressHex text="10s" status={QuestionStatus.Unaswered} />
      <DecadesProgressHex text="00s" status={QuestionStatus.Unaswered} />
      <DecadesProgressHex text="90s" status={QuestionStatus.Unaswered} />
      <DecadesProgressHex text="80s" status={QuestionStatus.Unaswered} />
      <DecadesProgressHex text="70s" status={QuestionStatus.Unaswered} />
    </div>
  );
}
