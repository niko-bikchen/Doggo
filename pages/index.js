import gql from 'graphql-tag';
import React from "react";
import Client from "../lib/apollo"
import { NextSeo } from 'next-seo';
import Paper from "@material-ui/core/Paper";
import styles from './styles/index.module.css';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';
import PageBase from '../components/PageBase/PageBase'
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
export async function getStaticProps(context) {
    const { data } = await Client.query({
        query: QUERY
    })
    return {
        props: { data }, // will be passed to the page component as props
    }
}

const Index = ({ data }) => {
    return (
        <PageBase background="Landing_body.jpg" footerParams={{backgroundColor:"#2B2B3B",theme:"dark"}} >
            <NextSeo canonical="https://doggo.co.ua/" title="Doggo | Сервис выгула собак" description="Не держите своего питомца дома в четырех стенах! DOGGO - сервис, где вы сможете найти идеального выгульщика, или стать им." />
            <Grid container alignItems={"center"} justify={"center"} className={styles["Index-top"]}>
                <div style={{color:"white", textAlign:"center"}}>
                    <div className={styles["Index-top--content"]}>
                        <div>
                            <img src="Doggo_light.png" alt="Doggo logo" />
                        </div>
                        <h1 className="h1-responsive m-5 font-bold">
                            {data.mainPageText.motto_ru}
                        </h1>
                        <DoggoBtn variant="contained" disableElevation>
                            Найти догвокера
                        </DoggoBtn>
                    </div>
                </div>
            </Grid>
            <div className={styles["Index-body"]}>
                <Paper className={styles["Index-body--card-1"]}>
                    <div className={styles["Index-body--card-content"]}>
                        <div>
                            <img src="Doggo_dark.png" alt="Doggo logo" />
                        </div>
                        <div>
                            <img className={styles["blob-2"]} src="Blub_v3.0.png" alt="A picture of a dog" />
                            <span style={{ display: 'block' }} className={styles["paper-text"]} dangerouslySetInnerHTML={{ __html: data.mainPageText.top_content_ru }}></span>
                        </div>
                    </div>
                </Paper>
                <Paper className={styles["Index-body--card-2"]}>
                    <div className={styles["Index-body--card-content"]}>
                        <Typography variant="h4" className="h1-responsive" style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.steps_title_ru }} />
                        <div >
                            <span className={styles["paper-text"]} style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_1_ru }} />
                            <img className={styles["blob-3"]} src="Blub_v1.1.png" alt="A picture of a dog" />
                            <img className={styles["step-1"]} src="step_1.png" alt="Number 1 in a circle" />
                        </div>
                    </div>
                </Paper>
                <Paper className={styles["Index-body--card-3"]}>
                    <div className={styles["Index-body--card-content"]}>
                        <div>
                            <span className={styles["text-1"]}>
                                <span className={styles["paper-text"]} style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_2_ru }} />
                            </span>
                            <span className={styles["text-2"]}>
                                <span className={styles["paper-text"]} style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_3_ru }} />
                            </span>
                            <img className={styles["blob-1"]} src="Blub_v2.0.png" alt="A picture of a dog" />
                            <img className={styles["step-2"]} src="step_2.png" alt="Number 2 and 3 in a circle" />
                        </div>
                    </div>
                </Paper>
                <Paper className={styles["Index-body--card-4"]}>
                    <div className={styles["Index-body--card-content"]}>
                        <div>
                            <img className={styles["blob-4"]} src="Blub_v4.0.png" alt="A picture of a dog" />
                            <span className={styles["paper-text"]} style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_3_ru }} />
                            <span className="d-block">
                                <DoggoBtn size="large" >
                                    Найти догвокера
                                </DoggoBtn>
                            </span>
                        </div>
                    </div>
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

