import React, {useEffect, useRef, useState} from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";

import {NextSeo} from "next-seo";
import { makeStyles } from '@material-ui/core/styles';
import Map from "../components/Map"
import _ from "underscore"
import {Marker} from "@react-google-maps/api";
import StyledTreeView, {StyledTreeItem} from "../components/StyledTreeView";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LocationCityIcon from '@material-ui/icons/LocationCity';
import RoomIcon from '@material-ui/icons/Room';

const QUERY = gql`
    query{
      dogwalkingZonesPageText{
        content_ru
      },
      dogWalkingZones{
        district,
        address,
        lat,
        lng
      }
    }
`

export async function getStaticProps(ctx) {
    const {data} = await Client.query({query: QUERY})
    const {dogWalkingZones, dogwalkingZonesPageText} = data;
    return {props: {dogWalkingZones, dogwalkingZonesPageText}}
}

const LocationsToTree = React.memo(({locations, onAddressClick}) => {
    let count = 0;

    return (
        <StyledTreeView>
            {_.values(_.mapObject(locations, (value, key) => {
                return (
                    <StyledTreeItem nodeId={key}  key={key} labelText={key} labelIcon={LocationCityIcon}>
                        {value.map((el, i) =>{
                            count++;
                            return (
                                <StyledTreeItem
                                    onClick={onAddressClick({lat: el.lat, lng: el.lng})}
                                    key={count+""}
                                    nodeId={count+""}
                                    labelText={el.address}
                                    labelIcon={RoomIcon} />
                            )
                        })}
                    </StyledTreeItem>
                )
            }))}
        </StyledTreeView>
        /*<MDBTreeview
            theme='animated'
        >
            {_.values(_.mapObject(locations, (value, key) => {
                return (
                    <MDBTreeviewList key={key} icon='city' title={key}  opened={count===0}>
                        {value.map((el, i) =>{
                            count++;
                            return (
                                    <MDBTreeviewItem  key={key + i} onClick={onAddressClick({lat: el.lat, lng: el.lng})}
                                                     icon='building' title={el.address} far/>

                            )
                        }

                        )}

                    </MDBTreeviewList>
                )
            }))}

        </MDBTreeview>*/
    )
}, () => true)
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const DogwalkingZones = ({dogWalkingZones, dogwalkingZonesPageText}) => {
    const locations = _.groupBy(dogWalkingZones, 'district')
    const [currLocation, setCurrLocation] = useState({lat: dogWalkingZones[0].lat, lng: dogWalkingZones[0].lng})
    const onAddressClick = ({lng, lat}) => {
        return () => {
            console.log("click")
            setCurrLocation({lng, lat})
        }
    }
    const classes = useStyles();
    return (
        <PageBase background="Landing_body.jpg">
            <NextSeo canonical="https://doggo.co.ua/dogwalkingZones" title="Doggo | Места для выгула"/>
                <Grid style={{padding:'20px'}} container spacing={3}>

                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <LocationsToTree locations={locations} onAddressClick={onAddressClick}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper} style={{padding:"0"}}>
                            <Map zoom={16} containerStyle={{width: "100%",borderRadius:"4px"}} center={currLocation}>
                                <Marker position={currLocation}/>
                            </Map>
                        </Paper>
                    </Grid>
                </Grid>

                {/*<MDBCard style={{width: "80vw"}}>
                    <MDBCardBody>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="6" key={"static"}>
                                    <LocationsToTree locations={locations} onAddressClick={onAddressClick}/>
                                </MDBCol>
                                <MDBCol md="6">
                                    <Map zoom={16} containerStyle={{width: "100%"}} center={currLocation}>
                                        <Marker position={currLocation}/>
                                    </Map>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <div className="mt-2">
                                    <div dangerouslySetInnerHTML={{__html: dogwalkingZonesPageText.content_ru}}/>
                                </div>
                            </MDBRow>
                        </MDBContainer>

                    </MDBCardBody>
                </MDBCard>*/}
        </PageBase>
    )
}

export default DogwalkingZones
