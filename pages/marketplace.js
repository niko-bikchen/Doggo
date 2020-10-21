import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";
import { NextSeo } from "next-seo";
import PageCard from "../components/PageCard";
import {connect} from "react-redux";


const QUERY = gql`
    query{
      marketplacePageText{
        content_ru
      }
    }
`

export async function getStaticProps(ctx) {
    const { data } = await Client.query({ query: QUERY })
    return { props: { data } }
}
const mapStateToProps = ({jwt}) => ({jwt})
const Marketplace = ({ data, jwt }) => {
    console.log(jwt)
    return (
        <PageBase background="Landing_body.jpg">
            <NextSeo canonical="https://doggo.co.ua/marketplace" title="Doggo | Выгульщики собак" />
            <PageCard>
                <div dangerouslySetInnerHTML={{ __html: data.marketplacePageText.content_ru }} />
            </PageCard>
        </PageBase>
    )
}

export default connect(mapStateToProps)(Marketplace)
