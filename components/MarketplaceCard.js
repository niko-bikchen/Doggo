import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from "@material-ui/lab/Skeleton";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LocationLink from "./LocationLink";
import {Grid} from "@material-ui/core";
import CenterContent from "./CenterContent";

import PhoneIcon from '@material-ui/icons/Phone'
import TelegramIcon from '@material-ui/icons/Telegram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Icon from "@material-ui/core/Icon";
import * as _ from "underscore";
import ViberIcon from "./ViberIcon";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
});

const textSplit = ({length, text}) => {
    length -= 3
    return text.length >= length ? text.substring(0, length) + "..." : text
}

const defaultRegion = {point: {lng: 30.505835, lat: 50.397912}, radius: 100, text: "Голосіївський район"}

const defaultContacts = [{type: "viber", value: "+380xxxxxxxxx"},{type:"phone",value:"+380xxxxxxxxx"},{type:"telegram",value:"+380xxxxxxxxx"},{type:"whatsapp",value:"+380xxxxxxxxx"}]

const contactIconsMap = {
    "phone": <PhoneIcon style={{padding:"2px",color:"white", backgroundColor:"#2CBB00",borderRadius:"4px"}}/>,
    "telegram": <TelegramIcon style={{padding:"2px",color:"white",backgroundColor:"#279EDA",borderRadius:"4px"}}/>,
    "whatsapp": <WhatsAppIcon style={{padding:"2px", color: "white",backgroundColor:"#4AC358",borderRadius:"4px" }}/>,
    "viber": <ViberIcon style={{padding:"2px",color:"white",backgroundColor:"#665CAC",borderRadius:"4px"}}/>
}

const mapContacts = contacts => _.map(contacts, (c, i) => <Button key={i}
                                                                startIcon={contactIconsMap[c.type]}>{c.value}</Button>)

const MarketplaceCard = ({name = "Name", contacts = defaultContacts, region = defaultRegion}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
                <CardMedia
                    alt="Contemplative Reptile"
                    height="200"
                    title="Contemplative Reptile"
                    image={""}
                >
                    <Skeleton variant="rect" height={200}/>
                </CardMedia>
                <CardContent style={{ minHeight: "100px", minWidth: "313px"}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Grid container>
                        {mapContacts(contacts).map((c,i)=><Grid key={i} xs={12} md={6} item>{c}</Grid>)}
                    </Grid>
                </CardContent>
            <CardActions>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CenterContent>
                            <LocationLink text={region.text} point={region.point} radius={region.radius}/>
                        </CenterContent>
                    </Grid>
                    <Grid item xs={12}>
                        <CenterContent>
                            <Rating name="read-only"
                                    value={3.5}
                                    precision={0.5}
                                    emptyIcon={<StarBorderIcon fontSize="inherit"/>} readOnly/>
                        </CenterContent>
                    </Grid>
                    {/*<Grid xs={6} item>
                        <CenterContent>
                            <Button color="primary">
                                Вибрати
                            </Button>
                        </CenterContent>
                    </Grid>*/}
                </Grid>

            </CardActions>
        </Card>
    );
}

export default MarketplaceCard;
