import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";
import { NextSeo } from "next-seo";

import styles from './styles/petAdoption.module.css';
import PageCard from "../components/PageCard";

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
            <PageCard>
                <div dangerouslySetInnerHTML={{ __html: data.dogExchangePageText.content_ru }} />
            </PageCard>
        </PageBase>
    )
}

export default PetAdoption;
