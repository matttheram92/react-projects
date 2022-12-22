import React, { useState } from "react";

interface DecadesGuess {
  title: string;
  artist: string;
}

class DecadesForm extends React.Component<{}, { [key: string]: string }> {
  searchedTracks: string[];
  searchedArtists: string[];
  constructor(props: {}) {
    super(props);
    this.state = { title: "", artist: "" };
    this.searchedTracks = [];
    this.searchedArtists = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    const value = event.target.value;
    const name = event.target.name as "title" | "artist";

    if (name === "title" && value.length > 0) {
      this.fetchTitles(value);
    }

    if (name === "artist" && value.length > 0) {
      this.fetchArtists(value);
    }

    this.setState({
      [name]: value,
    });
  }

  fetchTitles(title: string): void {
    fetch(
      //`https://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${title}&per_type_limit=5&type=track`
      `http://ws.audioscrobbler.com/2.0/?format=json&method=track.search&track=${title}&api_key=f2dc537249c67b7a5a0b7597760ee60e&limit=5`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.searchedTracks = result.results.trackmatches.track.map(
            (x: any) => x.name
          );
        },
        (error) => {}
      );
  }

  fetchArtists(title: string): void {
    fetch(
      //`https://api.napster.com/v2.2/search?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${title}&per_type_limit=5&type=track`
      `http://ws.audioscrobbler.com/2.0/?format=json&method=artist.search&artist=${title}&api_key=f2dc537249c67b7a5a0b7597760ee60e&limit=5`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.searchedArtists = result.results.artistmatches.artist.map(
            (x: any) => x.name
          );
        },
        (error) => {}
      );
  }

  handleSubmit(event: any) {
    alert("A name was submitted: " + JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              className="outline"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Artist:
            <input
              type="text"
              name="artist"
              className="outline"
              value={this.state.artist}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.searchedTracks}</p>
        <p>{this.searchedArtists}</p>
      </div>
    );
  }
}

export default DecadesForm;
