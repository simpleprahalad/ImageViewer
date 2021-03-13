import React, { Component } from "react";
import Header from "../../common/header/Header";
import profileImg from "../../assets/images/profilePic.jpg";
import "./Profile.css";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "20px",
  },

  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "95%",
    height: 750,
    cursor: "pointer",
    overflow: "hidden",
  },
});

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
      openModal: false,
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

  openModalHandler = () => {
    this.setState({ openModal: true });
  };

  modalCloseHander = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { classes } = this.props;
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
                  <div className="profile-header-row3">
                    <Typography
                      variant="h6"
                      component="h1"
                      style={{ marginRight: "20px" }}
                    >
                      {this.state.fullName}
                    </Typography>
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      onClick={this.openModalHandler}
                    >
                      <EditIcon />
                    </Fab>
                  </div>
                </div>
                <Modal
                  open={this.state.openModal}
                  onClose={this.modalCloseHander}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={getModalStyle()} className={classes.paper}>
                    <Typography
                      variant="h5"
                      component="h1"
                      style={{ marginBottom: "25px" }}
                    >
                      Edit
                    </Typography>
                    <br />
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.editNameHandler}
                    >
                      Update
                    </Button>
                  </div>
                </Modal>
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

export default withStyles(styles)(Profile);
