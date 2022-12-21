import {
  Artist,
  Decades,
  DecadesQuestionInfo,
  DecadesRoundInfo,
} from "./DecadesRoundInfo";

export const MOCK_DECADES_ROUND = [
  new DecadesRoundInfo("1", [
    new DecadesQuestionInfo(
      "1",
      "ABC",
      new Artist("Jackson 5", "1", ""),
      Decades["70s"],
      ""
    ),
    new DecadesQuestionInfo(
      "2",
      "Back In Black",
      new Artist("AC/DC", "2", ""),
      Decades["80s"],
      ""
    ),
  ]),
];
