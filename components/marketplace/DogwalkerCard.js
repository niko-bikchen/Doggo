import React, {useState} from 'react';
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
import LocationLink from "../map/LocationLink";
import {Grid} from "@material-ui/core";
import CenterContent from "../CenterContent";

import {contactIconsMap} from "./lib";
import * as _ from "underscore";


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 400,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const defaultRegion = {point: {lng: 30.505835, lat: 50.397912}, radius: 100, name: "Голосіївський район"}

const defaultContacts = [{type: "viber", value: "+380xxxxxxxxx"}, {
    type: "phone",
    value: "+380xxxxxxxxx"
}, {type: "telegram", value: "+380xxxxxxxxx"}, {type: "whatsapp", value: "+380xxxxxxxxx"}]

const mapContacts = contacts => _.map(contacts, (c, i) => <Button style={{padding: "2px"}} key={i}
                                                                  startIcon={contactIconsMap[c.type]}>{c.value}</Button>)

const DogwalkerCard = ({name = "Name", avatar_url = "", description = "", contacts = defaultContacts, region = defaultRegion}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                alt="Dogwalker"
                height="200"
                title="Dogwalker"
                image={avatar_url}
            >
                <Skeleton variant="rect" height={200}/>
            </CardMedia>
            <CardContent style={{minHeight: "100px", minWidth: "313px"}}>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Grid container justify={"space-between"}>
                    {mapContacts(contacts).map((c, i) => (
                        <Grid style={{}} key={i} sm={12} lg={6} item>
                            {c}
                        </Grid>))}
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CenterContent>
                            <LocationLink text={region.name} point={region.point} radius={region.radius}/>
                        </CenterContent>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CenterContent>
                            <Rating name="read-only"
                                    value={3.5}
                                    precision={0.5}
                                    emptyIcon={<StarBorderIcon fontSize="inherit"/>} readOnly/>
                        </CenterContent>
                    </Grid>
                    <Grid xs={12} md={6} item>
                        <CenterContent>
                            <Button onClick={() => {
                                setTimeout(()=>setOpen(true),0)
                                // setOpen(true)
                            }} color="primary">
                                Детальніше
                            </Button>
                        </CenterContent>
                    </Grid>
                </Grid>
            </CardActions>



        </Card>

    );
}

export default DogwalkerCard;
