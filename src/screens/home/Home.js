import React, { Component } from "react";
import Header from "../../common/header/Header";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profilePic: "",
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
        that.setState({
          info: JSON.parse(this.responseText).data
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
    xhr.send(data);
  }

  render() {
    return (
      <div>
        <Header baseUrl={this.props.baseUrl} />
        Home Component !!!
        {this.state.info.map((value, index) => {
            <div> value.id </div>
            // <div> value.caption </div>
        })}
      </div>
    );
  }
}

export default Home;
