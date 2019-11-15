import React, { Component } from "react";
import Axios from "axios";

class Comic extends Component {
  state = {
    found: false,
    comic: {
      title: "",
      img: "",
      transcript: null,
      day: "",
      month: "",
      year: ""
    }
  };

  componentDidMount() {
    if (this.props.latest) {
      //call and use api for latest
      Axios.get(`/api/comic/latest`).then(res => {
        let latestComic = res.data;
        this.setState({
          found: true,
          comic: {
            title: latestComic.title,
            img: latestComic.img,
            transcript: latestComic.transcript,
            day: latestComic.day,
            month: latestComic.month,
            year: latestComic.year
          }
        });
      });
    } else {
      console.log("Comic.js props comicNum:", this.props.comicNum);
      //either comicNum comes from props or the route param. check for either
      let comicId;
      // if (this.props.comicNum != null) {
      // comicId = this.props.comicNum;
      // } else {
      comicId = this.props.match.params.comicId;
      // }
      // comicId = this.props.comicNum || this.props.match.params.comicId;
      // //use the route params
      // console.log("COMIC ID in Comic.js: ",comicId);
      if (Number(comicId)) {
        if (comicId > 0) {
          // console.log(`comicId: ${comicId}`);
          Axios.get(`/api/comic/${comicId}`).then(res => {
            let comic = res.data;
            if (res.status === 200) {
              this.setState({
                found: true,
                comic: {
                  title: comic.title,
                  img: comic.img,
                  transcript: comic.transcript,
                  day: comic.day,
                  month: comic.month,
                  year: comic.year
                }
              });
            } else if (res.status === 404) {
              this.setState(prevState => ({
                ...prevState,
                found: false
              }));
            }
          });
        }
      }
    }
  }

  render() {
    let comic;
    if (this.state.found) {
      let { title, img, transcript, day, month, year } = this.state.comic;
      let newTranscript;
      if (transcript !== "") {
        newTranscript = transcript.replace(/[{()}]/g, ""); //remving the round and squiggly brackets
        newTranscript = newTranscript.replace(/[\[\]']+/g, ""); //removeing the square brackets
      } else {
        newTranscript = <>None Available</>;
      }

      comic = (
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
      );
    } else {
      comic = <p>Comic Book Not Found. Try something else</p>;
    }

    return <div>{comic}</div>;
  }
}

export default Comic;
