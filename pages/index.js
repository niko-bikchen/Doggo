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

const QUERY = gql`
    query{
      mainPageText{
        steps_title_ru,
        motto_ru,
        top_content_ru,
        step_1_ru,
        step_2_ru,
        step_3_ru,
        bottom_content_ru
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

export async function getStaticProps(context) {
    const { data } = await Client.query({
        query: QUERY
    })
    return {
        props: { data }, // will be passed to the page component as props
    }
}

const Index = ({ data }) => {
    const classes = useStyles();

    return (
        <PageBase background="Landing_body.jpg" footerParams={{ backgroundColor: "#2B2B3B", theme: "dark" }} >
            <NextSeo canonical="https://doggo.co.ua/" title="Doggo | Сервис выгула собак" description="Не держите своего питомца дома в четырех стенах! DOGGO - сервис, где вы сможете найти идеального выгульщика, или стать им." />
            <Grid container alignItems={"center"} justify={"center"} className={styles["Index-top"]}>
                <div style={{ color: "white", textAlign: "center" }}>
                    <div className={styles["Index-top--content"]}>
                        <div>
                            <img src="Doggo_light.png" alt="Doggo logo" />
                        </div>
                        <h1 className="h1-responsive m-5 font-bold">
                            {data.mainPageText.motto_ru}
                        </h1>
                        <DoggoBtn size={"large"}>
                            Найти догвокера
                        </DoggoBtn>
                    </div>
                </div>
            </Grid>
            <div className={styles["Index-body"]}>
                <Paper className={styles["Index-body--card-1"]}>
                    <Box className={styles["Index-body--card-content"]}>
                        <Box mb={4}>
                            <img src="Doggo_dark.png" alt="Doggo logo" />
                        </Box>
                        <Box>
                            <img className={styles["blob-2"]} src="Blub_v2.0.png" alt="A picture of a dog" />
                            <Box className={styles["paper-text"]} dangerouslySetInnerHTML={{ __html: data.mainPageText.top_content_ru }}></Box>
                        </Box>
                    </Box>
                </Paper>
                <Paper className={styles["Index-body--card-2"]}>
                    <Box className={styles["Index-body--card-content"]}>
                        <Box mb={4}>
                            <Typography variant="h4" className="h1-responsive" dangerouslySetInnerHTML={{ __html: data.mainPageText.steps_title_ru }} />
                        </Box>
                        <Box textAlign="left">
                            <Grid container spacing={4}>
                                <Grid xs={12} item container>
                                    <Grid xs={12} md={1} item container alignItems="center" classes={{ root: classes.gridContainer }}>
                                        <Box className={styles["Index--round-number"]}>1</Box>
                                    </Grid>
                                    <Grid xs={12} md={11} item container>
                                        <Grid xs={12} item>
                                            <Typography classes={{ root: classes.headRoot }} variant="h4" className="h1-responsive">Перший крок</Typography>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <Box className={styles["paper-text"]} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_1_ru }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} item container>
                                    <Grid xs={12} md={1} item container alignItems="center" classes={{ root: classes.gridContainer }}>
                                        <Box className={styles["Index--round-number"]}>2</Box>
                                    </Grid>
                                    <Grid xs={12} md={11} item container>
                                        <Grid xs={12} item>
                                            <Typography classes={{ root: classes.headRoot }} variant="h4" className="h1-responsive">Перший крок</Typography>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <Box className={styles["paper-text"]} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_2_ru }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} item container>
                                    <Grid xs={12} md={1} item container alignItems="center" classes={{ root: classes.gridContainer }}>
                                        <Box className={styles["Index--round-number"]}>3</Box>
                                    </Grid>
                                    <Grid xs={12} md={11} item container>
                                        <Grid xs={12} item>
                                            <Typography classes={{ root: classes.headRoot }} variant="h4" className="h1-responsive">Перший крок</Typography>
                                        </Grid>
                                        <Grid xs={12} item>
                                            <Box className={styles["paper-text"]} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_3_ru }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
                <Paper className={styles["Index-body--card-4"]}>
                    <DoggoBtn style={{ marginTop: "20px" }} size="large" >
                        Найти догвокера
                    </DoggoBtn>
                </Paper>
            </div>
            <div className={styles["Index-bottom"]}>
                <div className={styles["Index-bottom--text"]}>
                    {data.mainPageText.bottom_content_ru}
                </div>
                <img style={{ width: "100%" }} src="Landing_bottom.png" alt="A picture of a dog" />
            </div>
        </PageBase>
    )
};

export default Index;

