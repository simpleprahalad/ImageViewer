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
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import profilePic from '../../assets/images/profilePic.jpg';

const useStyles = (theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    objectFit: "cover",
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profilePic: "",
      endpoint1: [],
      postList: [],
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
          that.getImages(info);
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
        post.caption = info.caption;
        post.media_url = parsedData.media_url;
        post.profilePic = profilePic;
        post.username = parsedData.username;
        post.timestamp = new Date(parseInt(parsedData.timestamp) * 1000);
        newStateArray = that.state.postList.slice();
        newStateArray.push(post);
        that.setState({postList: newStateArray});
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

  getCardIconImage() {
    return "https://www.upgrad.com/favicon.ico";
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* display the contents only if the user is logged in */}
        {sessionStorage.getItem("access-token") !== null ? (
          <div>
            <Header
              home="true"
              profilePic={profilePic}
              baseUrl={this.props.baseUrl}
            />
            <div>
              {this.state.postList.map((post) => (
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <img src={post.profilePic} alt="pic"/>
                      </Avatar>
                    }
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
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <Typography variant="body1" color="inherit" component="p">
                      7 likes
                    </Typography>
                  </CardActions>
                  <CardActions enablespacing="true">
                    <TextField placeholder="Add a comment" />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.loginClickHandler}
                    >
                      Login
                    </Button>
                  </CardActions>
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
