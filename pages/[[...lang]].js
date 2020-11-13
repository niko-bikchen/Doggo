import gql from 'graphql-tag';
import React from "react";
import Client from "../lib/apollo"
import { NextSeo } from 'next-seo';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import styles from './styles/index.module.css';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';
import PageBase from '../components/PageBase/PageBase'
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import logoDark from "public/Doggo_dark.png"
import logoLight from "public/Doggo_light.png"
import blob from "public/Blub_v2.0.png"
const QUERY = gql`
    query($ua:Boolean!){
      mainPageText{
        steps_title_ua @include(if:$ua),
        steps_title_ru @skip(if:$ua),
        motto_ua @include(if:$ua),
        motto_ru @skip(if:$ua),
        top_content_ua @include(if:$ua),
        top_content_ru @skip(if:$ua),
        step_1_ua @include(if:$ua),
        step_1_ru @skip(if:$ua),
        step_2_ua @include(if:$ua),
        step_2_ru @skip(if:$ua),
        step_3_ua @include(if:$ua),
        step_3_ru @skip(if:$ua),
        bottom_content_ua @include(if:$ua),
        bottom_content_ru @skip(if:$ua)
      }
    }
`;

const useStyles = makeStyles((theme) => ({
    headRoot: {
        [theme.breakpoints.down('md')]: {
            textAlign: 'center',
            margin: '15px 0'
        }
    },
    gridContainer: {
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    }
}));
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
    const newData = {}

    const { data } = await Client.query({
        query: QUERY,variables:{ua}
    })
    Object.keys(data.mainPageText).forEach(key=>{
        if(!key.startsWith("__"))
            newData[key.slice(0,-3)]=data.mainPageText[key]
    })
    return {
        props: { data:newData }, // will be passed to the page component as props
    }
}

const Index = ({ data }) => {
    console.log({data})
    if(data==null){
        return <div>Loading...</div>
    }
    const classes = useStyles();
    return (
        <PageBase background="Landing_body.jpg" footerParams={{ backgroundColor: "#2B2B3B", theme: "light" }} >
            <NextSeo canonical="https://doggo.co.ua/" title="Doggo | Сервис выгула собак" description="Не держите своего питомца дома в четырех стенах! DOGGO - сервис, где вы сможете найти идеального выгульщика, или стать им." />
            <Grid container alignItems={"center"} justify={"center"} className={styles["Index-top"]}>
                <div style={{ color: "white", textAlign: "center" }}>
                    <div className={styles["Index-top--content"]}>
                        <div>
                            <img src={logoLight} alt="Doggo logo" />
                        </div>
                        <h1 className="h1-responsive m-5 font-bold">
                            {data.motto}
                        </h1>
                        <DoggoBtn size={"large"} id="find-walker-1">
                            Найти догвокера
                        </DoggoBtn>
                    </div>
                </div>
            </Grid>
            <div className={styles["Index-body"]}>
                <Paper className={styles["Index-body--card-1"]}>
                    <Box className={styles["Index-body--card-content"]}>
                        <Box mb={4}>
                            <img src={logoDark} alt="Doggo logo" />
                        </Box>
                        <Box>
                            <img className={styles["blob-2"]} src={blob} alt="A picture of a dog" />
                            <Box className={styles["paper-text"]} dangerouslySetInnerHTML={{ __html: data.top_content }}></Box>
                        </Box>
                    </Box>
                </Paper>
                <Paper className={styles["Index-body--card-2"]}>
                    <Box className={styles["Index-body--card-content"]}>
                        <Box mb={4}>
                            <Typography variant="h4" className="h1-responsive" dangerouslySetInnerHTML={{ __html: data.steps_title }} />
                        </Box>
                        <Box textAlign="left">
                            <Grid container spacing={6}>
                                <Grid xs={12} item container>
                                    <Grid xs={12} md={1} item container alignItems="center" classes={{ root: classes.gridContainer }}>
                                        <Box className={styles["Index--round-number"]}>1</Box>
                                    </Grid>
                                    <Grid xs={12} md={11} item container>
                                        <Grid xs={12} item>
                                            <Box className={styles["paper-text"]} dangerouslySetInnerHTML={{ __html: data.step_1 }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} item container>
                                    <Grid xs={12} md={1} item container alignItems="center" classes={{ root: classes.gridContainer }}>
                                        <Box className={styles["Index--round-number"]}>2</Box>
                                    </Grid>
                                    <Grid xs={12} md={11} item container>
                                        <Grid xs={12} item>
                                            <Box className={styles["paper-text"]} dangerouslySetInnerHTML={{ __html: data.step_2 }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} item container>
                                    <Grid xs={12} md={1} item container alignItems="center" classes={{ root: classes.gridContainer }}>
                                        <Box className={styles["Index--round-number"]}>3</Box>
                                    </Grid>
                                    <Grid xs={12} md={11} item container>
                                        <Grid xs={12} item>
                                            <Box className={styles["paper-text"]} dangerouslySetInnerHTML={{ __html: data.step_3 }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box textAlign="center" mt={3}>
                                <DoggoBtn style={{ marginTop: "20px" }} size="large" id="find-walker-2">
                                    Знайти догвокера
                                </DoggoBtn>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </div>
        </PageBase>
    )
};

export default Index;

