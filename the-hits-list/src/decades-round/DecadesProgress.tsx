import { DecadesProgressHex } from "./DecadesProgressHex";
import { Decades, QuestionStatus } from "./DecadesRoundInfo";

export function DecadesProgress(props: {
  progress: { decade: Decades; status: QuestionStatus }[];
}) {
  return (
    <div className="flex m-auto">
      {props.progress.map((x) => {
        return (
          <DecadesProgressHex
            key={x.decade}
            text={x.decade}
            status={x.status}
          />
        );
      })}
    </div>
  );
}
