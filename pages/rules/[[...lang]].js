import React from "react";
import Client from "../../lib/apollo";
import gql from "graphql-tag";
import PageBase from "../../components/PageBase/PageBase";
import { NextSeo } from "next-seo";
import PageCard from "../../components/PageCard";
import Box from "@material-ui/core/Box";
import styles from "../styles/rules.module.css";

const QUERY = gql`
  query($ua: Boolean!) {
    dogWalkingRules {
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
  const newData = [];

  const { data } = await Client.query({
    query: QUERY,
    variables: { ua },
  });
  data.dogWalkingRules.forEach((rule) => {
    let obj = {};
    Object.keys(rule).forEach((key) => {
      if (!key.startsWith("__")) obj[key.slice(0, -3)] = rule[key];
    });
    newData.push(obj);
  });

  return {
    props: { data: newData }, // will be passed to the page component as props
  };
}

const Rules = ({ data }) => {
  return (
    <PageBase footerParams={{ theme: "dark" }}>
      <NextSeo
        canonical="https://doggo.co.ua/rules"
        title="Doggo | Правила вигула"
        description="Заборонено виводити собаку без повідка за межі проживання(квартира чи будинок). Крім того, улюбленець повинен мати ошийник з жетоном, на якому написаний його особистий номер..."
      />
      <PageCard>
        <Box textAlign="center" mb={3}>
          <h1>Правила вигулу собак</h1>
        </Box>
        {data.map((r, i) => (
          <div key={i} className={styles["Rules--rule"]}>
            <div className={styles["Rules--number-container"]}>
              <div className={styles["Rules--number"]}>
                <span>{i + 1}</span>
              </div>
            </div>
            <span>{r["content"]}</span>
          </div>
        ))}
      </PageCard>
    </PageBase>
  );
};

export default Rules;
