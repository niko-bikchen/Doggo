import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";
import { NextSeo } from "next-seo";
import PageCard from "../components/PageCard";
import Box from '@material-ui/core/Box';

const QUERY = gql`
    query{
        dogWalkingRules{
            content_ru
        }
    }
`

export async function getStaticProps(ctx) {
    const { data } = await Client.query({ query: QUERY })
    return { props: { data } }
}

const Rules = ({ data }) => {
    console.log(data.dogWalkingRules);

    return (
        <PageBase background="Landing_body.jpg" footerParams={{ theme: "light" }}>
            <NextSeo canonical="https://doggo.co.ua/rules" title="Doggo | Правила выгула" />
            <PageCard>
                <Box textAlign="center" mb={3}>
                    <h1>Правила выгула собак</h1>
                </Box>
                {data.dogWalkingRules.map((r, i) => (
                    <div key={i} style={{ display: "flex", margin: "30px", alignItems: "center" }}>
                        <div style={{ marginRight: "30px" }}>
                            <div style={{
                                height: "70px",
                                width: "70px",
                                backgroundColor: "#E0802A",
                                borderRadius: "50%",
                                display: "flex",
                                fontSize: "150%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <span style={{ color: "white" }}>{i + 1}</span>
                            </div>
                        </div>
                        <span>{r["content_ru"]}</span>
                    </div>
                ))}
            </PageCard>
        </PageBase>
    )
}

export default Rules
