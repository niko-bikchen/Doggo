import React, { useEffect, useRef, useState } from "react";
import Client from "../../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../../components/PageBase/PageBase";
import { useRouter } from 'next/router'
import { NextSeo } from "next-seo";
import { makeStyles } from '@material-ui/core/styles';
import Map from "../../components/map/Map"
import _ from "underscore"
import { Marker } from "@react-google-maps/api";
import StyledTreeView, { StyledTreeItem } from "../../components/StyledTreeView";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import RoomIcon from '@material-ui/icons/Room';
import Box from '@material-ui/core/Box';

const QUERY = gql`
    query($ua:Boolean!){
        dogwalkingZonesPageText{
            content_ru @skip(if:$ua),
            content_ua @include(if:$ua)
        },
        dogWalkingZones{
            district,
            address,
            lat,
            lng
        }
    }
`

export async function getStaticPaths(){
    return {
        paths:[{params:{lang:["ru"]}},{params:{lang:[]}}],
        fallback:false
    }
}
export async function getStaticProps({params}) {

    let ua = true;

    if(params != null && params.lang != null && params.lang[0] != null){
        ua = params.lang[0] !== "ru"
    }

    const { data } = await Client.query({ query: QUERY, variables:{ua} })
    let { dogWalkingZones, dogwalkingZonesPageText } = data;
    const text = ua?dogwalkingZonesPageText.content_ua:dogwalkingZonesPageText.content_ru;
    return { props: { dogWalkingZones, text } }
}

const LocationsToTree = React.memo(({ locations, onAddressClick }) => {
    let count = 0;

    return (
        <StyledTreeView>
            {_.values(_.mapObject(locations, (value, key) => {
                return (
                    <StyledTreeItem nodeId={key} key={key} labelText={key} labelIcon={LocationCityIcon}>
                        {value.map((el, i) => {
                            count++;
                            return (
                                <StyledTreeItem
                                    onClick={onAddressClick({ lat: el.lat, lng: el.lng })}
                                    key={count + ""}
                                    nodeId={count + ""}
                                    labelText={el.address}
                                    labelIcon={RoomIcon} />
                            )
                        })}
                    </StyledTreeItem>
                )
            }))}
        </StyledTreeView>
    )
}, () => true)
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: "0",
        textAlign: 'center',
        height: '70vh',
        color: theme.palette.text.secondary,
    },
}));
const DogwalkingZones = ({ dogWalkingZones, text }) => {
    const router = useRouter();
    if (dogWalkingZones == undefined) {
        return <div>Loading...</div>
    }
    const locations = _.groupBy(dogWalkingZones, 'district')
    const [currLocation, setCurrLocation] = useState({ lat: dogWalkingZones[0].lat, lng: dogWalkingZones[0].lng })
    const onAddressClick = ({ lng, lat }) => {
        return () => {
            setCurrLocation({ lng, lat })
        }
    }
    const classes = useStyles();
    return (
        <PageBase footerParams={{ theme: 'dark' }}>
            <NextSeo canonical="https://doggo.co.ua/dogwalkingZones" title="Doggo | Места для выгула" />
            <Box textAlign="center" style={{ color: '#2B2B3B' }}>
                <h1>Місця вигулу</h1>
            </Box>
            <Grid style={{ padding: '20px' }} spacing={3} container>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <div style={{ padding: "20px" }}>
                            <LocationsToTree locations={locations} onAddressClick={onAddressClick} />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Map zoom={16} containerStyle={{ width: "100%", height: "100%", borderRadius: "4px" }} center={currLocation}>
                            <Marker position={currLocation} />
                        </Map>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <div dangerouslySetInnerHTML={{ __html: text }} />
                </Grid>
            </Grid>
        </PageBase>
    )
}

export default DogwalkingZones
