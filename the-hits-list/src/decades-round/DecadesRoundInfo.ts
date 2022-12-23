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

export enum QuestionStatus {
  Unaswered = "Unaswered",
  Correct = "Correct",
  Incorrect = "Incorrect",
}
