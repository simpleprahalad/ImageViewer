import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = (theme) => ({
  media: {
    height: 0,
    objectFit: "cover",
    paddingTop: "56.25%", // 16:9
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profilePic:
        "https://instagram.fblr1-3.fna.fbcdn.net/v/t51.2885-19/s320x320/145135244_432529917944662_4618383355731614603_n.jpg?tp=1&_nc_ht=instagram.fblr1-3.fna.fbcdn.net&_nc_ohc=gwvhBj0cQ1UAX9g_7sP&oh=706ee3d41b8fdd74c3fe2ecefc22afe1&oe=60701196",
      endpoint1: [],
      postListForSearch: [],
      postList: [],
      likeIcon: "dispBlock",
      likedIcon: "dispNone",
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
        that.state.endpoint1.map((info) => {
          return that.getImages(info);
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

  getImages(info) {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;
    let accessToken = window.sessionStorage.getItem("access-token");
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let parsedData = JSON.parse(this.responseText);
        let newStateArray;
        let post = {};
        post.id = parsedData.id;
        post.caption = info.caption || "This is default caption";
        post.media_url = parsedData.media_url;
        post.profilePic = that.state.profilePic;
        post.username = parsedData.username;
        post.likeIcon = "dispBlock";
        post.likedIcon = "dispNone";
        post.likes = {};
        post.likes.count = 5;
        post.timestamp = new Date(parsedData.timestamp);
        newStateArray = that.state.postList.slice();
        newStateArray.push(post);
        that.setState({ postList: newStateArray });
        that.setState({ postListForSearch: newStateArray });
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

  myCallback = (filteredPost) => {
    this.setState({ postList: filteredPost });
  };

  //function to add a like to a post
  likeClickHandler = (id) => {
    let postList = this.state.postList;
    postList.forEach(function (post) {
      // if the post id equal to the liked post id then display
      // the likedIcon, hide the likeIcon, and increment like count by 1
      if (post.id === id) {
        post.likes.count += 1;
        post.likeIcon = "dispNone";
        post.likedIcon = "dispBlock";
        this.setState({
          likeIcon: "dispNone",
          likedIcon: "dispBlock",
        });
      }
    }, this);
  };

  //function to unlike a post
  likedClickHandler = (id) => {
    let postList = this.state.postList;
    postList.forEach(function (post) {
      // if the post id equal to the liked post id then display the likeIcon, hide the likedIcon, and decrement like count by 1
      if (post.id === id) {
        post.likes.count -= 1;
        post.likeIcon = "dispBlock";
        post.likedIcon = "dispNone";
        this.setState({
          likeIcon: "dispBlock",
          likedIcon: "dispNone",
        });
      }
    }, this);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* display the contents only if the user is logged in */}
        {sessionStorage.getItem("access-token") !== null ? (
          <div>
            <Header
              home="true"
              profilePic={this.state.profilePic}
              baseUrl={this.props.baseUrl}
              list={this.state.postListForSearch}
              callbackFromHome={this.myCallback}
            />
            <div className="container">
              {this.state.postList.map((post) => (
                <Card className="cards-layout" key={"post" + post.id}>
                  <div className="posts">
                    <CardHeader
                      avatar={<Avatar src={post.profilePic} alt="pic" />}
                      title={post.username}
                      // subheader="03/10/2018 16:07:24"
                      subheader={
                        post.timestamp.getMonth() +
                        1 +
                        "/" +
                        post.timestamp.getDate() +
                        "/" +
                        post.timestamp.getFullYear() +
                        " " +
                        post.timestamp.getHours() +
                        ":" +
                        post.timestamp.getMinutes() +
                        ":" +
                        post.timestamp.getSeconds()
                      }
                    />
                    <CardMedia
                      className={classes.media}
                      image={post.media_url}
                      title="Paella dish"
                    />
                    <CardContent>
                      <Typography variant="body2" color="inherit" component="p">
                        {post.caption}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <div className="likes">
                        <div
                          className={post.likeIcon}
                          onClick={() => this.likeClickHandler(post.id)}
                        >
                          <FavoriteBorderIcon />
                        </div>
                        <div className={post.likedIcon}>
                          <FavoriteIcon
                            style={{ color: "red" }}
                            onClick={() => this.likedClickHandler(post.id)}
                          />
                        </div>
                        <span style={{ marginLeft: 10, marginBottom: 8 }}>
                          {post.likes.count < 2 ? (
                            <div> {post.likes.count} like </div>
                          ) : (
                            <div> {post.likes.count} likes </div>
                          )}
                        </span>
                      </div>
                    </CardActions>
                    <CardActions enablespacing="true">
                      <TextField placeholder="Add a comment" />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addClickHandler}
                      >
                        ADD
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Home);
