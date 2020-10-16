import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase";
import {MDBCard, MDBCardBody} from "mdbreact";
import {NextSeo} from "next-seo";

const QUERY = gql`
    query{
      marketplacePageText{
        content_ru
      }
    }
`

export async function getStaticProps(ctx) {
    const {data} = await Client.query({query: QUERY})
    return {props: {data}}
}

const Marketplace = ({data}) => {
    return (
        <PageBase background="Landing_body.jpg">
            <NextSeo canonical="https://doggo.co.ua/marketplace"/>
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "40px",
                alignItems: "center"
            }}>
                <MDBCard style={{width: "80vw"}}>
                    <MDBCardBody>
                        <div className="mt-5">
                            <div dangerouslySetInnerHTML={{__html:data.marketplacePageText.content_ru}}/>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </PageBase>
    )
}

export default Marketplace
