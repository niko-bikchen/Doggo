import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase";
import {MDBCard, MDBCardBody} from "mdbreact";
import {NextSeo} from "next-seo";

const QUERY = gql`
    query{
        dogWalkingRules{
            content_ru
        }
    }
`

export async function getStaticProps(ctx) {
    const {data} = await Client.query({query: QUERY})
    return {props: {data}}
}

const Rules = ({data}) => {
    return (
        <PageBase background="Landing_body.jpg">
            <NextSeo canonical="https://doggo.co.ua/rules"/>
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
                            {data.dogWalkingRules.map((r, i) => (
                                <div key={i} style={{display: "flex", margin: "30px", fontSize: "25px"}}>
                                    <div style={{marginRight: "30px"}}>
                                        <div style={{
                                            height: "70px",
                                            width: "70px",
                                            backgroundColor: "#E0802A",
                                            borderRadius: "50%",
                                            display: "flex",
                                            fontSize:"150%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop:"10px"
                                        }}>
                                            <span style={{color: "white"}}>{i + 1}</span>
                                        </div>
                                    </div>

                                    <span>
                                        {r["content_ru"]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </PageBase>
    )
}

export default Rules
