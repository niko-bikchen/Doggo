import gql from 'graphql-tag';
import React from "react";
import Client from "../lib/apollo"
import { NextSeo } from 'next-seo';
import { MDBCardTitle, MDBCard, MDBCardText, MDBCardBody } from "mdbreact";

import styles from './styles/index.module.css';

import DoggoBtn from '../components/DoggoBtn/DoggoBtn';
import PageBase from '../components/PageBase/PageBase'

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
        <PageBase background="Landing_body.jpg">
            <NextSeo canonical="https://doggo.co.ua/" title="Doggo | Сервис выгула собак" description="Не держите своего питомца дома в четырех стенах! DOGGO - сервис, где вы сможете найти идеального выгульщика, или стать им." />
            <div className={styles["Index-top"]}>
                <div className="text-white text-center">
                    <div className={styles["Index-top--content"]}>
                        <div>
                            <img src="Doggo_light.png" alt="Doggo logo" />
                        </div>
                        <MDBCardTitle className="h1-responsive m-5 font-bold">
                            {data.mainPageText.motto_ru}
                        </MDBCardTitle>
                        <DoggoBtn variant="contained" disableElevation>
                            Найти догвокера
                        </DoggoBtn>
                    </div>
                </div>
            </div>
            <div className={styles["Index-body"]}>
                <MDBCard className={styles["Index-body--card-1"]}>
                    <MDBCardBody className={styles["Index-body--card-content"]}>
                        <MDBCardTitle>
                            <img src="Doggo_dark.png" alt="Doggo logo" />
                        </MDBCardTitle>
                        <MDBCardText className="mt-5">
                            <img className={styles["blob-2"]} src="Blub_v3.0.png" alt="A picture of a dog" />
                            <span style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.top_content_ru }}></span>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className={styles["Index-body--card-2"]}>
                    <MDBCardBody className={styles["Index-body--card-content"]}>
                        <MDBCardTitle className="h1-responsive" >
                            <span style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.steps_title_ru }} />
                        </MDBCardTitle>
                        <MDBCardText className="mt-5">
                            <span style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_1_ru }} />
                            <img className={styles["blob-3"]} src="Blub_v1.1.png" alt="A picture of a dog" />
                            <img className={styles["step-1"]} src="step_1.png" alt="Number 1 in a circle" />
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className={styles["Index-body--card-3"]}>
                    <MDBCardBody className={styles["Index-body--card-content"]}>
                        <MDBCardText>
                            <span className={styles["text-1"]}>
                                <span style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_2_ru }} />
                            </span>
                            <span className={styles["text-2"]}>
                                <span style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_3_ru }} />
                            </span>
                            <img className={styles["blob-1"]} src="Blub_v2.0.png" alt="A picture of a dog" />
                            <img className={styles["step-2"]} src="step_2.png" alt="Number 2 and 3 in a circle" />
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className={styles["Index-body--card-4"]}>
                    <MDBCardBody className={styles["Index-body--card-content"]}>
                        <MDBCardText>
                            <img className={styles["blob-4"]} src="Blub_v4.0.png" alt="A picture of a dog" />
                            <span style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: data.mainPageText.step_3_ru }} />
                            <span className="d-block">
                                <DoggoBtn size="lg" className="mt-5">
                                    Найти догвокера
                                </DoggoBtn>
                            </span>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <div className={styles["Index-bottom"]}>
                <p className={styles["Index-bottom--text"]}>
                    {/* {data.mainPageText.bottom_content_ru} */}
                </p>
                <img style={{ width: "100%" }} src="Landing_bottom.png" alt="A picture of a dog" />
            </div>
        </PageBase>
    )
};

export default Index;

