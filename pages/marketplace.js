import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";
import { NextSeo } from "next-seo";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import MarketplaceCard from "../components/MarketplaceCard";


const QUERY = gql`
    query{
      marketplacePageText{
        content_ru
      }
    }
`
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
    },
}));
export async function getStaticProps(ctx) {
    const { data } = await Client.query({ query: QUERY })
    return { props: { data } }
}
const mapStateToProps = ({jwt}) => ({jwt})
const Marketplace = ({ data, jwt }) => {
    const classes = useStyles();
    console.log(jwt)
    return (
        <PageBase /*background="Landing_body.jpg"*/>
            <NextSeo canonical="https://doggo.co.ua/marketplace" title="Doggo | Выгульщики собак" />
                <Grid style={{padding:'20px',color:'#434a54', fontWeight:600}} container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <Grid container alignContent={"center"} direction={"column"}>
                            Filters...
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={3} alignContent={"center"} justify={"center"}>
                            {[...Array(20).keys()].map((el,i)=>{
                                return (
                                    <Grid key={i}  item xs={12} md={6} xl={3} >
                                        <Grid container justify={"center"}>
                                            <MarketplaceCard/>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div  dangerouslySetInnerHTML={{ __html: data.marketplacePageText.content_ru }} />
                    </Grid>
                </Grid>
        </PageBase>
    )
}

export default connect(mapStateToProps)(Marketplace)
