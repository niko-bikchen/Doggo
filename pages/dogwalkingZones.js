import React, {useEffect, useRef, useState} from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";

import {NextSeo} from "next-seo";

import Map from "../components/Map"
import _ from "underscore"
import {Marker} from "@react-google-maps/api";

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

    return (<div></div>
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

const DogwalkingZones = ({dogWalkingZones, dogwalkingZonesPageText}) => {
    const locations = _.groupBy(dogWalkingZones, 'district')
    const [currLocation, setCurrLocation] = useState({lat: dogWalkingZones[0].lat, lng: dogWalkingZones[0].lng})
    const onAddressClick = ({lng, lat}) => {
        return () => {
            console.log("click")
            setCurrLocation({lng, lat})
        }
    }
    return (
        <PageBase background="Landing_body.jpg">
            <NextSeo canonical="https://doggo.co.ua/dogwalkingZones" title="Doggo | Места для выгула"/>
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "40px",
                alignItems: "center"
            }}>
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
            </div>
        </PageBase>
    )
}

export default DogwalkingZones
