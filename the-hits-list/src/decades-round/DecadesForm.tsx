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
      <div className="max-w-xs m-auto">
        <form onSubmit={this.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Artist
            <input
              type="text"
              name="artist"
              placeholder="Artist"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={this.state.artist}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <AutocompleteSelect list={this.searchedTracks}></AutocompleteSelect>
        <AutocompleteSelect list={this.searchedArtists}></AutocompleteSelect>
      </div>
    );
  }
}

export default DecadesForm;

function AutocompleteSelect(props: { list: string[] }) {
  return (
    <ul className="row list-none">
      {props.list.map((item) => (
        <li>
          <a>{item}</a>
        </li>
      ))}
    </ul>
  );
}
