import gql from 'graphql-tag';
import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import withHttpsRedirect from "../HoCs/withHttpsRedirect";
import { MDBCardTitle, MDBCard, MDBCardText, MDBCardBody } from "mdbreact";

import styles from './index.module.css';

import Header from '../components/Header/Header';
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';

const QUERY = gql`
    query {
        mainPageText {
            step_1_ua,
            step_2_ua,
            step_3_ua,
            motto_ua,
            bottom_content_ua,
            top_content_ua
        }
    }
`;
export async function getStaticProps(context) {
    const client = new ApolloClient({
        uri: 'https://doggo.co.ua/graphql',
        cache: new InMemoryCache()
    });
    const data = await client.query({
        query: QUERY
    })
    return {
        props: { data: data.data }, // will be passed to the page component as props
    }
}

const Index = ({ data }) => {
    return (
        <div className={styles["Index"]}>
            <Header />
            <div className={styles["Index-top"]}>
                <div className="text-white text-center">
                    <div className={styles["Index-top--content"]}>
                        <div>
                            <img src="Doggo_light.png" />
                        </div>
                        <MDBCardTitle className="h1-responsive m-5 font-bold">
                            {data.mainPageText.motto_ua}
                        </MDBCardTitle>
                        <DoggoBtn size="lg">
                            Знайти догвокера
                        </DoggoBtn>
                    </div>
                </div>
            </div>
            <div className={styles["Index-body"]}>
                <MDBCard className={styles["Index-body--card-1"]}>
                    <MDBCardBody className={styles["Index-body--card-content"]}>
                        <MDBCardTitle>
                            <img src="Doggo_dark.png" />
                        </MDBCardTitle>
                        <MDBCardText className="mt-5">
                            <img className={styles["blob-2"]} src="blob2.png" />
                            <img className={styles["doggo-1"]} src="doggo_1-01.png" />
                            {data.mainPageText.top_content_ua}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className={styles["Index-body--card-2"]}>
                    <MDBCardBody className={styles["Index-body--card-content"]}>
                        <MDBCardTitle className="h1-responsive">
                            Як це працює?
                        </MDBCardTitle>
                        <MDBCardText className="mt-5">
                            {data.mainPageText.step_1_ua}
                            <img className={styles["blob-3"]} src="blob3.png" />
                            <img className={styles["doggo-3"]} src="doggo_3-01.png" />
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className={styles["Index-body--card-3"]}>
                    <MDBCardBody className={styles["Index-body--card-content"]}>
                        <MDBCardText>
                            {data.mainPageText.step_2_ua}
                            <img className={styles["blob-1"]} src="blob1.png" />
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className={styles["Index-body--card-4"]}>
                    <MDBCardBody>
                        <MDBCardText>
                            {data.mainPageText.step_3_ua}
                            <img className={styles["doggo-2"]} src="doggo_2-01.png" />
                            <div>
                                <DoggoBtn size="lg" className="mt-5">
                                    Знайти догвокера
                                </DoggoBtn>
                            </div>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <div className={styles["Index-bottom"]}>
                <img src="Landing_bottom.png" />
            </div>
        </div>
    )
};

export default withHttpsRedirect(Index);
