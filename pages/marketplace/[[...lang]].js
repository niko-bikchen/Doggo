import React, { useCallback, useEffect, useRef, useState } from "react";
import Client from "../../lib/apollo";
import gql from "graphql-tag";
import PageBase from "../../components/PageBase/PageBase";
import { NextSeo } from "next-seo";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DogwalkerCard from "../../components/marketplace/DogwalkerCard";
import { ACTION_TYPES, ACTIONS } from "../../store/marketplace_store";
import Regions from "../../components/map/Regions";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/router";
import { mapRegion } from "../../lib/lib";
import Paper from "@material-ui/core/Paper";

const QUERY = gql`
  query($ua: Boolean!) {
    marketplacePageText {
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
  Object.keys(data.marketplacePageText).forEach((key) => {
    if (!key.startsWith("__"))
      newData[key.slice(0, -3)] = data.marketplacePageText[key];
  });
  return {
    props: { data: newData }, // will be passed to the page component as props
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      marginTop: "30px",
    },
  },
}));
const mapDogwalker = (dogwalker) =>
  dogwalker != undefined
    ? {
        ...dogwalker,
        avatar_url: dogwalker.avatar[0].url,
        region: mapRegion(dogwalker.region),
      }
    : {};

const Marketplace = ({ data, jwt, dogwalkers = [], fetchDogwalkers }) => {
  useEffect(() => {
    fetchDogwalkers();
  }, []);
  const classes = useStyles();
  const router = useRouter();
  const regions = dogwalkers.map((el) => {
    const { region } = el;
    return {
      center: { lat: region.lat, lng: region.lng },
      radius: region.radius,
    };
  });
  const [regionIndex, setRegionIndex] = useState(0);

  const onDetails = useCallback(
    ({ index }) => {
      router.push({ pathname: "/dogWalker", query: { id: index + 1 } });
    },
    [dogwalkers, regionIndex]
  );
  return (
    <PageBase footerParams={{ theme: "dark" }}>
      <NextSeo
        canonical="https://doggo.co.ua/marketplace"
        title="Doggo | Догвокери"
        description="Собака - це не іграшка для вас або вашої дитини, а тварина. Як і людині, їй потрібний простір, спілкування, активності та свіже повітря."
      />
      <Grid
        style={{ padding: "20px", color: "#434a54", fontWeight: 600 }}
        container
      >
        <Grid item xs={12}>
          <h1 style={{ textAlign: "center", marginTop: "0" }}>Вигул</h1>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container alignContent={"center"} direction={"column"}>
            <Regions
              onRegionClick={onDetails}
              regions={regions}
              mapProps={{
                containerStyle: {
                  width: "100%",
                  height: "calc(100vh - 110px)",
                  borderRadius: "4px",
                },
                center:
                  regions.length > 0
                    ? regions[0].center
                    : { lat: 50.488917, lng: 30.481178 },
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} classes={{ root: classes.root }}>
          <SimpleBar
            forceVisible={"y"}
            autoHide={true}
            style={{ maxHeight: "calc(100vh - 110px)", overflowX: "hidden" }}
          >
            <Grid
              container
              spacing={3}
              alignContent={"center"}
              justify={"center"}
            >
              {dogwalkers.map((el, i) => {
                return (
                  <Grid key={i} item xs={12}>
                    <Grid container justify={"center"}>
                      <DogwalkerCard
                        onDetails={() => onDetails({ index: i })}
                        name={el.name}
                        avatar_url={el.avatar[0].url}
                        contacts={el.contacts}
                        region={mapRegion(el.region)}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </SimpleBar>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "2rem" }}>
          <Paper style={{ padding: "10px" }}>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </Paper>
        </Grid>
      </Grid>
    </PageBase>
  );
};
const mapStateToProps = ({ jwt, marketplace }) => {
  return { ...jwt, ...marketplace };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDogwalkers: () => dispatch(ACTIONS[ACTION_TYPES.FETCH_DOGWALKERS]()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
