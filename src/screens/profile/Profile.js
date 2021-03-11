import React, { Component } from "react";
import Header from "../../common/header/Header";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profilePic:
        "https://instagram.fblr1-3.fna.fbcdn.net/v/t51.2885-19/s320x320/145135244_432529917944662_4618383355731614603_n.jpg?tp=1&_nc_ht=instagram.fblr1-3.fna.fbcdn.net&_nc_ohc=gwvhBj0cQ1UAX9g_7sP&oh=706ee3d41b8fdd74c3fe2ecefc22afe1&oe=60701196",
    };
  }
  render() {
    return (
      <div>
        {sessionStorage.getItem("access-token") !== null ? (
          <Header
            profile="true"
            profilePic={this.state.profilePic}
            baseUrl={this.props.baseUrl}
            history={this.props.history}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Profile;
