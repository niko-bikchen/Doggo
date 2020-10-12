import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "./pageBase";
import styles from "./index.module.css";
import {MDBCard, MDBCardBody, MDBCardText, MDBCardTitle} from "mdbreact";

const QUERY = gql`
    query{
        dogWalkingRules{
            content_ua
        }
    }
`

export async function getStaticProps(ctx) {
    const {data} = await Client.query({query: QUERY})
    return {props: {data}}
}

const Rules = ({data}) => {
    return (
        <PageBase>
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
                                            marginTop:"30px"
                                        }}>
                                            <span style={{color: "white"}}>{i + 1}</span>
                                        </div>
                                    </div>

                                    <span>
                                        {r["content_ua"]}
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
