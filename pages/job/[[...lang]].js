import React from "react";
import Client from "../../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../../components/PageBase/PageBase";

import DoggoBtn from '../../components/DoggoBtn/DoggoBtn';

import styles from '../styles/job.module.css';
import { NextSeo } from "next-seo";

const QUERY = gql`
    query($ua:Boolean!){
        jobPageText {
            content_ua @include(if: $ua),
            content_ru @skip(if: $ua),
            title_ua @include(if:$ua)
            title_ru @skip(if:$ua)
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
    const newData = {}

    const { data } = await Client.query({
        query: QUERY,variables:{ua}
    })
    Object.keys(data.jobPageText).forEach(key=>{
        if(!key.startsWith("__"))
            newData[key.slice(0,-3)]=data.jobPageText[key]
    })
    return {
        props: { data:newData }, // will be passed to the page component as props
    }
}


const Lang = ({ data }) => {
    return (
        <PageBase footerParams={{ theme: 'dark' }}>
            <NextSeo canonical="https://doggo.co.ua/job" title="Doggo | Работа догвокером" description="У вас есть собака и вы обожаете гулять с ней? Это очень здорово! Возможно, вы уже слышали про работу выгульщика собак, если нет, то мы с удовольствием расскажем. Как бы банально это не звучало, но это тот самый человек который гуляет с питомцем, когда его хозяин вынужден отсутствовать." />
            <div className={styles["Job"]}>
                <div className={styles["Job-promo"]}>
                    <div className={styles["Job-promo--content"]}>
                        <h2 style={{ fontWeight: "300" }}>Хочеш стати частиною команди?</h2>
                        <DoggoBtn size="large" className="mt-5">Почати роботу</DoggoBtn>
                    </div>
                </div>
                <div className={styles["Job-body--content"]}>
                    <h1>
                        {data.title}
                    </h1>
                    <div className={styles["Job-text"]}>
                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default Lang;
