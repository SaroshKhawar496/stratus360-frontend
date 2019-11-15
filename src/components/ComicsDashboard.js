import React, { Component } from "react";
import Comic from "./Comic";
import Axios from "axios";
import { Button } from "react-bootstrap";

export default class ComicsDashboard extends Component {
  state = {
    // showOthers: null,
    comicNum: 1,
    comic: {
      title: "",
      img: "",
      transcript: "",
      day: "",
      month: "",
      year: ""
    }
  };

  nextComicNumHandler = () => {
    console.log("Next Comic");
    this.setState(
      prevState => ({
        // showOthers: true,
        ...prevState,
        comicNum: prevState.comicNum + 1
      }),
      () => this.getNewComic()
    );
  };
  prevComicNumHandler = () => {
    console.log("Prev Comic");
    if (this.state.comicNum > 1) {
      this.setState(
        prevState => ({
          // showOthers: true,
          ...prevState,
          comicNum: prevState.comicNum - 1
        }),
        () => this.getNewComic()
      );
    }
  };
  randomComicHandler = () => {
    let randomComic = Math.floor(Math.random() * 900) + 1; //random comic nums between 1 to 900
    this.setState(
      prevState => ({
        ...prevState,
        comicNum: randomComic
      }),
      () => this.getNewComic()
    );
  };
  getNewComic = () => {
    Axios.get(`/api/comic/${this.state.comicNum}`).then(res => {
      let comic = res.data;
      this.setState(prevState => {
        return {
          ...prevState,
          comic: {
            title: comic.title,
            img: comic.img,
            transcript: comic.transcript,
            day: comic.day,
            month: comic.month,
            year: comic.year
          }
        };
      });
    });
  };
  componentDidMount() {
    this.getNewComic();
  }
  render() {
    console.log(`comicNum: ${this.state.comicNum}`);
    let { title, img, transcript, day, month, year } = this.state.comic;
    let newTranscript;
    if (transcript != "") {
      newTranscript = transcript.replace(/[{()}]/g, ""); //remving the round and squiggly brackets
      newTranscript = newTranscript.replace(/[\[\]']+/g, ""); //removeing the square brackets
    } else {
      newTranscript = <>None Available</>;
    }
    return (
      <div>
        <div className="mt-2">
          <Button variant="warning mr-2" onClick={this.prevComicNumHandler}>
            Previous Commic
          </Button>
          <Button variant="success mr-2" onClick={this.nextComicNumHandler}>
            Next Comic
          </Button>
          <Button variant="danger" onClick={this.randomComicHandler}>
            Random Comic
          </Button>
        </div>

        <div className="mt-3">
          <h2>Comic Book: {title}</h2>
          <img src={img} />
          <p className="mt-2">
            <span className="title">Details: </span>
            <span className="details">{newTranscript}</span>
          </p>
          <p>
            <span className="title">Release Date (dd-mm-yyyy): </span>
            <span className="details">
              {day}-{month}-{year}
            </span>
          </p>
        </div>
      </div>
    );
  }
}
