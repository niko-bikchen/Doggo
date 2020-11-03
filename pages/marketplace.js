import React, {useCallback, useEffect, useRef, useState} from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";
import { NextSeo } from "next-seo";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import DogwalkerCard from "../components/marketplace/DogwalkerCard";
import {ACTION_TYPES, ACTIONS} from "../store/marketplace_store";
import Regions from "../components/map/Regions";
import DogwalkerDetailedCard, {DogWalkerDetailedCardModal} from "../components/marketplace/DogwalkerDetailedCard";


const QUERY = gql`
    query{
      marketplacePageText{
        content_ru
      }
    }
`

const mapRegion = ({lng,lat,radius,name}) => ({point:{lng,lat},radius,name})
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
    },
}));
const mapDogwalker = (dogwalker) => dogwalker != undefined ? {...dogwalker,avatar_url:dogwalker.avatar[0].url}:{}
export async function getStaticProps(ctx) {
    const { data } = await Client.query({ query: QUERY })
    return { props: { data } }
}

const Marketplace = ({ data, jwt, dogwalkers=[], fetchDogwalkers }) => {
    useEffect(()=>{
        fetchDogwalkers()
    },[])
    const regions = dogwalkers.map((el)=>{
        const {region} = el;
        return {center:{lat:region.lat,lng:region.lng},radius:region.radius}
    })
    const {marketplacePageText} = {...data}
    const dwModal = useRef()
    const onRegionClick = useCallback(({index})=>{
        const dogwalker = mapDogwalker(dogwalkers[index])
        dwModal.current.open({dogwalker})
    },[dogwalkers])
    const [regionIndex,setRegionIndex] = useState(0)
    return (
        <PageBase /*background="Landing_body.jpg"*/>
            <NextSeo canonical="https://doggo.co.ua/marketplace" title="Doggo | Выгульщики собак" />
                <Grid style={{padding:'20px',color:'#434a54', fontWeight:600}} container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Grid container alignContent={"center"} direction={"column"}>
                            <Regions
                                onRegionClick={onRegionClick}
                                regions={regions}
                                mapProps={
                                 {
                                     containerStyle:{width: "100%", height:"80vh",borderRadius:"4px"},
                                     center: regions.length>0?regions[0].center:{lat:50.488917, lng:30.481178}
                                 }
                                } />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={3} alignContent={"center"} justify={"center"} >
                            {dogwalkers.map((el,i)=>{
                                return (
                                    <Grid key={i}  item xs={12}>
                                        <Grid container justify={"center"}>
                                            <DogwalkerCard name={el.name} avatar_url={el.avatar[0].url} contacts={el.contacts} region={mapRegion(el.region)}/>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div  dangerouslySetInnerHTML={{ __html: marketplacePageText.content_ru }} />
                    </Grid>
                </Grid>
            <DogWalkerDetailedCardModal ref={dwModal} dogwalker={mapDogwalker(dogwalkers[regionIndex])} />
        </PageBase>
    )
}
const mapStateToProps = ({jwt,marketplace}) => {return {...jwt,...marketplace}}
const mapDispatchToProps = dispatch => {
    return {
        fetchDogwalkers: () => dispatch(ACTIONS[ACTION_TYPES.FETCH_DOGWALKERS]())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Marketplace)
