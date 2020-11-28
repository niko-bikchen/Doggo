import React from "react";
import Client from "../../lib/apollo";
import gql from "graphql-tag";
import PageBase from "../../components/PageBase/PageBase";
import { NextSeo } from "next-seo";

import styles from "../styles/petAdoption.module.css";
import PageCard from "../../components/PageCard";

const QUERY = gql`
  query($ua: Boolean!) {
    dogExchangePageText {
      content_ua @include(if: $ua)
      content_ru @skip(if: $ua)
    }
  }
`;

export async function getStaticPaths() {
  return {
    paths: [{ params: { lang: ["ru"] } }, { params: { lang: [] } }],
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  let ua = true;

  if (params != null && params.lang != null && params.lang[0] != null) {
    ua = params.lang[0] !== "ru";
  }
  const newData = {};

  const { data } = await Client.query({
    query: QUERY,
    variables: { ua },
  });
  Object.keys(data.dogExchangePageText).forEach((key) => {
    if (!key.startsWith("__"))
      newData[key.slice(0, -3)] = data.dogExchangePageText[key];
  });
  return {
    props: { data: newData }, // will be passed to the page component as props
  };
}

const Lang = ({ data }) => {
  return (
    <PageBase background="Landing_body.jpg">
      <NextSeo
        canonical="https://doggo.co.ua/petAdoption"
        title="Doggo | Прихисти тварину"
        description="Вірного та надійного друга можна придбати не тільки за гроші від провідних розплідників собак, але і безкоштовно. Домашнього улюбленця можна знайти у притулку."
      />
      <PageCard>
        <p style={{ textAlign: "center" }}>
          🛠 Функціонал знаходиться у розробці 🛠
        </p>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </PageCard>
    </PageBase>
  );
};

export default Lang;
