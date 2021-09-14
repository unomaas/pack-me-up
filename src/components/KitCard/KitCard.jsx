//#region ⬇⬇ Document setup below: 
import './KitCard.css';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 



export default function KitCard({ kit }) {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  //#endregion ⬆⬆ Event handles above. 

  // ⬇ Rendering:
  return (
    <Grid container >
      <Grid item xs={4}>
        <Card className="KitCard-cards">
          <CardActionArea>
            <CardMedia
              className="KitCard-media"
              image={kit.image}
              title={kit.kit_name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {kit.kit_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {kit.kit_description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
