import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import AvPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline'
import IconButton from 'material-ui/IconButton';
import {white500} from 'material-ui/styles/colors';

const styles = {
  CardMedia: {
  },
  CardText: {
    width: 220,
    height: 150
  },
  overlayStyle: {
    height: "150px !important" ,

  },
  IconButton: {
    padding: 0,
    width: 220,
    height: 130,
    overflow: 'hidden',
    backgroundColor: "rgba(195, 195, 195, 0.18)"
  },
  iconPlay: {
    height: 60,
    width: 60,
    color: "white",
    position: "absolute",
    zIndex: 1,
    top: 34,
    left: 80
  } 
}
const TileCard = ({book, video=false}) => (
  <div className="TileCard">
    <div className="CardMedia">
      <IconButton style={styles.IconButton}>
        {(video) ? <AvPlayCircleOutline color={white500} style={styles.iconPlay}/> : <div></div>}
        <img src="/images/avatar2.jpg" alt=""/>
      </IconButton>
      {(video) ? <div className="CardMedia-timer">03:04</div> : <div></div>}
    </div>
    <div className="CardText">
      {book.title}
    </div>
  </div>
);

export default TileCard;