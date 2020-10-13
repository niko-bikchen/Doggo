import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle } from "mdbreact";
import DoggoBtn from '../components/DoggoBtn/DoggoBtn';

import styles from './styles/job.module.css';

const QUERY = gql`
    query{
        jobPageText {
            content_ua,
            title_ua
        }
    }
`

export async function getStaticProps(ctx) {
    const { data } = await Client.query({ query: QUERY })
    return { props: { data } }
}

const Job = ({ data }) => {
    return (
        <PageBase>
            <div className={styles["Job"]}>
                <div className={styles["Job-promo"]}>
                    <div className={styles["Job-promo--content"]}>
                        <h2>Хочеш стати частиною команди?</h2>
                        <DoggoBtn size="lg" className="mt-5">Почати роботу</DoggoBtn>
                    </div>
                </div>
                <div className={styles["Job-body--content"]}>
                    <h1>
                        {data.jobPageText.title_ua}
                    </h1>
                    <p className={styles["Job-text"]}>
                        {data.jobPageText.content_ua}
                    </p>
                </div>
            </div>
        </PageBase>
    );
};

export default Job;