import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";
import { MDBCard, MDBCardBody } from "mdbreact";
import { NextSeo } from "next-seo";

import styles from './styles/petAdoption.module.css';

const QUERY = gql`
    query{
      dogExchangePageText{
        content_ru
      }
    }
`

export async function getStaticProps(ctx) {
    const { data } = await Client.query({ query: QUERY })
    return { props: { data } }
}

const PetAdoption = ({ data }) => {
    return (
        <PageBase background="Landing_body.jpg">
            <NextSeo canonical="https://doggo.co.ua/petAdoption" title="Doggo | Приюти питомца" />
            <div className={styles["PetAdoption"]}>
                <MDBCard style={{ width: "80vw" }}>
                    <MDBCardBody>
                        <div className="mt-2">
                            <div dangerouslySetInnerHTML={{ __html: data.dogExchangePageText.content_ru }} />
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </PageBase>
    )
}

export default PetAdoption;
