import React, { useState } from "react";
import { NextSeo } from "next-seo";
import { Avatar, Divider, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import Regions from "../components/map/Regions";
import _ from "underscore";
import { mapContacts } from "../components/marketplace/lib";
import PageBase from "../components/PageBase/PageBase";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import Client from "../lib/apollo";
import { mapRegion } from "../lib/lib";

const QUERY = gql`
  query($id: String!) {
    dogwalkers(where: { id: $id }) {
      id
      name
      avatar {
        url
      }
      contacts {
        type
        value
      }
      region {
        lat
        lng
        radius
        name
      }
      description
      schedule {
        Monday
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        Sunday
      }
    }
  }
`;
const AVATAR_SIZE = 200;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const SCHEDULE_UA = {
  Monday: "Понеділок",
  Tuesday: "Вівторок",
  Wednesday: "Середа",
  Thursday: "Четвер",
  Friday: "П'ятниця",
  Saturday: "Субота",
  Sunday: "Неділя",
};
/*

* */

const DogwalkerDetailedCard = () => {
  const router = useRouter();
  const { id } = router.query;
  const [dogWalker, setDogwalker] = useState({});
  const { name, contacts, description, schedule = {} } = dogWalker;
  const avatar_url = dogWalker.avatar == null ? "" : dogWalker.avatar[0].url;
  const region = dogWalker.region == null ? {} : mapRegion(dogWalker.region);
  if (id != null && dogWalker.id == null) {
    Client.query({ query: QUERY, variables: { id } }).then(({ data }) =>
      setDogwalker(data.dogwalkers[0])
    );
  }
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <PageBase footerParams={{ theme: "dark" }}>
      <NextSeo
        canonical="https://doggo.co.ua/dogWalker"
        title="Doggo | Догвокер"
        description="Сторінка догвокера."
      />
      <Grid
        spacing={3}
        style={{ padding: "20px" }}
        direction={isMd ? "row-reverse" : "row"}
        container
      >
        <Grid xs={12} md={4} item>
          <Grid spacing={3} container>
            <Grid
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
              item
            >
              <div
                style={{
                  border: "10px solid white",
                  width: AVATAR_SIZE + "px",
                  borderRadius: "50%",
                  background: "white",
                }}
              >
                {avatar_url === "" ? (
                  <Skeleton
                    variant={"circle"}
                    width={AVATAR_SIZE}
                    height={AVATAR_SIZE}
                  />
                ) : (
                  <Avatar
                    style={{
                      width: AVATAR_SIZE + "px",
                      height: AVATAR_SIZE + "px",
                    }}
                    src={avatar_url}
                  />
                )}
              </div>
            </Grid>
            <Grid xs={12} item>
              <Typography align={"center"} variant={"h5"}>
                Графік
              </Typography>

              {_.rest(_.pairs(schedule)).map(([k, v], i) => {
                return (
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "white",
                      margin: "20px 0",
                    }}
                  >
                    <Grid key={i} justify={"space-around"} container>
                      <Grid md={6} item>
                        <Typography>{SCHEDULE_UA[k]}</Typography>
                      </Grid>
                      <Grid md={6} item>
                        <Typography>{v}</Typography>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={8} item>
          <Grid spacing={3} container>
            <Grid item style={{ backgroundColor: "white" }} xs={12}>
              <Typography
                style={{ padding: "15px", fontWeight: "bold" }}
                variant={"h5"}
              >
                {name}
              </Typography>
              <Divider />
              <Typography align={"justify"} style={{ padding: "15px" }}>
                {description}
              </Typography>
              <Divider />
              <Grid style={{ padding: "15px" }} spacing={3} container>
                {mapContacts(contacts).map((e, i) => {
                  return (
                    <Grid key={i} item>
                      {e}
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid
              item
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
              xs={12}
            >
              {/*{typeof google === 'undefined' || region == undefined ? '' : //TODO refactor*/}
              <Regions
                onRegionClick={() => {}}
                regions={[region]}
                mapProps={{
                  containerStyle: {
                    width: "100%",
                    height: "500px",
                    borderRadius: "4px",
                  },
                  center: region.center,
                }}
              />
              {/*}*/}
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12} md={6} item></Grid>
      </Grid>
    </PageBase>
  );
};
//
// export const DogWalkerDetailedCardModal = forwardRef(({},ref)=>{
//     const classes = useStyles();
//     let openedTime;
//     const [open,setOpen] = useState(false)
//     const [dogwalker,setDogwalker] = useState({})
//     useImperativeHandle(ref,()=>({
//         open:({dogwalker})=>{
//             console.log(dogwalker)
//             setDogwalker(dogwalker)
//             setOpen(true)
//         },
//         close:()=>{
//             setOpen(false)
//         }
//     }))
//     useEffect(()=>{openedTime = Date.now()},[open])
//     return (
//         <Backdrop
//             ref={ref}
//             open={open}
//             className={classes.backdrop}
//             style={{marginTop:"180px"}}
//         >
//             <DogwalkerDetailedCard
//                 onClose={()=>setOpen(false)}
//                 name={dogwalker.name}
//                 avatar_url={dogwalker.avatar_url}
//                 description={dogwalker.description}
//                 contacts={dogwalker.contacts}
//                 region={dogwalker.region}
//                 schedule={dogwalker.schedule}
//             />
//         </Backdrop>
//     )
// })

export default DogwalkerDetailedCard;
