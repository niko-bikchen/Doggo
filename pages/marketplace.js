import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";
import { NextSeo } from "next-seo";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/styles";


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
                <Grid style={{padding:'20px'}} container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{color:'#434a54', fontWeight:600}} dangerouslySetInnerHTML={{ __html: data.marketplacePageText.content_ru }} />
                    </Grid>
                </Grid>
        </PageBase>
    )
}

export default connect(mapStateToProps)(Marketplace)
