import React from "react";
import Client from "../../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../../components/PageBase/PageBase";
import { NextSeo } from "next-seo";
import PageCard from "../../components/PageCard";
import Box from '@material-ui/core/Box';

const QUERY = gql`
    query($ua:Boolean!){
        dogWalkingRules{
            content_ua @include(if: $ua)
            content_ru @skip(if: $ua)
        }
    }
`

export async function getStaticPaths(){
    return {
        paths:[{params:{lang:["ru"]}},{params:{lang:[]}}],
        fallback:false
    }
}
export async function getStaticProps({params}) {
    let ua = true;

    if(params != null && params.lang != null && params.lang[0] != null){
        ua = params.lang[0] !== "ru"
    }
    const newData = []

    const { data } = await Client.query({
        query: QUERY,variables:{ua}
    })
    console.log(data)
    data.dogWalkingRules.forEach(rule=>{
        let obj = {};
        Object.keys(rule).forEach(key=>{
            if(!key.startsWith("__"))
                obj[key.slice(0,-3)]=rule[key]
        })
        newData.push(obj)
    })

    return {
        props: { data:newData }, // will be passed to the page component as props
    }
}

const Rules = ({ data }) => {
    console.log({data})
    return (
        <PageBase footerParams={{ theme: "dark" }}>
            <NextSeo canonical="https://doggo.co.ua/rules" title="Doggo | Правила выгула" />
            <PageCard>
                <Box textAlign="center" mb={3}>
                    <h1>Правила выгулу собак</h1>
                </Box>
                {data.map((r, i) => (
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
                        <span>{r["content"]}</span>
                    </div>
                ))}
            </PageCard>
        </PageBase>
    )
}

export default Rules
