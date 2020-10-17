import React from "react";
import Client from "../lib/apollo"
import gql from "graphql-tag"
import PageBase from "../components/PageBase/PageBase";

import DoggoBtn from '../components/DoggoBtn/DoggoBtn';

import styles from './styles/job.module.css';
import { NextSeo } from "next-seo";

const QUERY = gql`
    query{
        jobPageText {
            content_ru,
            title_ru
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
            <NextSeo canonical="https://doggo.co.ua/job" title="Doggo | Работа догвокером" description="У вас есть собака и вы обожаете гулять с ней? Это очень здорово! Возможно, вы уже слышали про работу выгульщика собак, если нет, то мы с удовольствием расскажем. Как бы банально это не звучало, но это тот самый человек который гуляет с питомцем, когда его хозяин вынужден отсутствовать." />
            <div className={styles["Job"]}>
                <div className={styles["Job-promo"]}>
                    <div className={styles["Job-promo--content"]}>
                        <h2>Хочешь стать частью команды?</h2>
                        <DoggoBtn size="lg" className="mt-5">Начать работу</DoggoBtn>
                    </div>
                </div>
                <div className={styles["Job-body--content"]}>
                    <h1>
                        {data.jobPageText.title_ru}
                    </h1>
                    <div className={styles["Job-text"]}>
                        <div dangerouslySetInnerHTML={{ __html: data.jobPageText.content_ru }} />
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default Job;
