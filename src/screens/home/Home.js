import React, { Component } from "react";
import Header from "../../common/header/Header";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profilePic: "https://www.upgrad.com/favicon.ico",
      info: [],
    };
  }

  componentDidMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    let accessToken = window.sessionStorage.getItem("access-token");
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        that.setState({
          info: JSON.parse(this.responseText).data,
        });
        that.state.info.map((data) => {
          that.getImages(data.id);
          // console.log(data)
        });
      }
    });

    // https://graph.instagram.com/me/media?fields=id,caption&access_token=YourAccessToken

    xhr.open(
      "GET",
      this.props.baseUrl +
        "me/media?fields=id,caption&access_token=" +
        accessToken
    );
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  }

  getImages(id) {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    let accessToken = window.sessionStorage.getItem("access-token");
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    //graph.instagram.com/17895695668004550?fields=id,media_type,media_url,username,timestamp&access_token=YourAccessToken
    xhr.open(
      "GET",
      this.props.baseUrl +
        id +
        "?fields=id,media_type,media_url,username,timestamp&access_token=YourAccessToken" +
        accessToken
    );
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  }

  render() {
    return (
      <div>
        <Header
          home="true"
          profilePic={this.state.profilePic}
          baseUrl={this.props.baseUrl}
        />
        Home Component !!!
      </div>
    );
  }
}

export default Home;
