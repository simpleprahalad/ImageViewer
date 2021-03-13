import React, { Component } from "react";
import Header from "../../common/header/Header";
import profileImg from "../../assets/images/profilePic.jpg";
import "./Profile.css";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profilePic: profileImg,
      endpoint1: [],
      username: "",
      totalPostCount: 0,
      NumOfUsersFollowed: 10, // hard coded
      NumOfFollowers: 50,
      fullName: "Prahalad Maheswari",
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
          endpoint1: JSON.parse(this.responseText).data,
        });
        that.setState({
          totalPostCount: that.state.endpoint1.length,
        });
        that.getImages(that.state.endpoint1[0]);
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

  getImages(info) {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    let accessToken = window.sessionStorage.getItem("access-token");
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let parsedData = JSON.parse(this.responseText);
        that.setState({ username: parsedData.username });
      }
    });

    //graph.instagram.com/17895695668004550?fields=id,media_type,media_url,username,timestamp&access_token=YourAccessToken
    xhr.open(
      "GET",
      this.props.baseUrl +
        info.id +
        "?fields=id,media_type,media_url,username,timestamp&access_token=" +
        accessToken
    );
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  }

  render() {
    return (
      <div>
        {sessionStorage.getItem("access-token") !== null ? (
          <div>
            <Header
              profile="true"
              profilePic={this.state.profilePic}
              baseUrl={this.props.baseUrl}
              history={this.props.history}
            />
            <div className="profile-container">
              <div className="profile-header">
                <img
                  className="header-image"
                  src={this.state.profilePic}
                  alt={this.state.username}
                />
                <div className="header-content">
                  <Typography variant="h5" component="h1">
                    {this.state.username}
                  </Typography>
                  <div className="profile-header-row2">
                    <Typography
                      variant="body1"
                      component="h1"
                      style={{ marginRight: "80px" }}
                    >
                      Posts: {this.state.totalPostCount}
                    </Typography>
                    <div>
                      <Typography
                        variant="body1"
                        component="h1"
                        style={{ marginRight: "80px" }}
                      >
                        Follows: {this.state.NumOfUsersFollowed}
                      </Typography>
                    </div>
                    <Typography variant="body1" component="h1">
                      Followed By: {this.state.NumOfFollowers}
                    </Typography>
                  </div>
                  {
                    <div className="profile-header-row3">
                      <Typography
                        variant="h6"
                        component="h1"
                        style={{ marginRight: "20px" }}
                      >
                        {this.state.fullName}
                      </Typography>
                      <Fab color="secondary" aria-label="edit">
                        <EditIcon />
                      </Fab>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Profile;
