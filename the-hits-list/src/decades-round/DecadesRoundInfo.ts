export class DecadesRoundInfo {
  id!: string;
  questions: DecadesQuestionInfo[] = [];

  constructor(id: string, questions: DecadesQuestionInfo[]) {
    this.id = id;
    this.questions = questions;
  }
}

export class DecadesQuestionInfo {
  mbid!: string;
  name!: string;
  artist!: Artist;
  decade!: Decades;
  url!: string;
  correct?: boolean;

  constructor(
    id: string,
    name: string,
    artist: Artist,
    decade: Decades,
    url: string,
    correct?: boolean
  ) {
    this.mbid = id;
    this.name = name;
    this.artist = artist;
    this.decade = decade;
    this.url = url;
    this.correct = correct;
  }
}

export class Artist {
  name!: string;
  mbid!: string;
  url!: string;

  constructor(name: string, mbid: string, url: string) {
    this.name = name;
    this.mbid = mbid;
    this.url = url;
  }
}

export enum Decades {
  "70s" = "70s",
  "80s" = "80s",
  "90s" = "90s",
  "00s" = "00s",
  "10s" = "10s",
}

// export const YearsByDecade: { [key: string]: number[] } = {
//   "70s": [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979],
//   "80s": [1980, 1981],
//   "90s": [1990, 1991],
//   "00s": [2000, 2001],
//   "10s": [2010, 2011],
// };

export const getRandomYearInDecade = (decade: Decades): string => {
  const yearsByDecade = {
    "70s": "197",
    "80s": "198",
    "90s": "199",
    "00s": "200",
    "10s": "201",
  };
  const randNum = Math.floor(Math.random() * 9);
  return `${yearsByDecade[decade]}${randNum}`;
};

export enum QuestionStatus {
  Unanswered = "Unanswered",
  Answering = "Answering",
  Correct = "Correct",
  Incorrect = "Incorrect",
}

export interface DecadesGuess {
  title: string;
  artist: string;
}
