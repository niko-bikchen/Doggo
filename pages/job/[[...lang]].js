import React, { useState } from "react";
import Client from "../../lib/apollo";
import gql from "graphql-tag";
import PageBase from "../../components/PageBase/PageBase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";

import DoggoBtn from "../../components/DoggoBtn/DoggoBtn";
import DogwalkerStepper from "../../components/DogwalkerStepper";

import styles from "../styles/job.module.css";
import { NextSeo } from "next-seo";

const QUERY = gql`
  query($ua: Boolean!) {
    jobPageText {
      content_ua @include(if: $ua)
      content_ru @skip(if: $ua)
      title_ua @include(if: $ua)
      title_ru @skip(if: $ua)
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
  Object.keys(data.jobPageText).forEach((key) => {
    if (!key.startsWith("__"))
      newData[key.slice(0, -3)] = data.jobPageText[key];
  });
  return {
    props: { data: newData }, // will be passed to the page component as props
  };
}

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
  card: {
    width: "60%",
    height: "auto",
    padding: "2% 5%",
    backgroundColor: "white",
    borderRadius: "10px",
    boxSizing: "border-box",
  },
}));

const Lang = ({ data }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <PageBase footerParams={{ theme: "dark" }}>
      <NextSeo
        canonical="https://doggo.co.ua/job"
        title="Doggo | Работа догвокером"
        description="У вас есть собака и вы обожаете гулять с ней? Это очень здорово! Возможно, вы уже слышали про работу выгульщика собак, если нет, то мы с удовольствием расскажем. Как бы банально это не звучало, но это тот самый человек который гуляет с питомцем, когда его хозяин вынужден отсутствовать."
      />
      <div className={styles["Job"]}>
        <div className={styles["Job-promo"]}>
          <div className={styles["Job-promo--content"]}>
            <h2 style={{ fontWeight: "300" }}>Хочеш стати частиною команди?</h2>
            <DoggoBtn size="large" className="mt-5" onClick={handleOpen}>
              Почати роботу
            </DoggoBtn>
          </div>
        </div>
        <div className={styles["Job-body--content"]}>
          <h1>{data.title}</h1>
          <div className={styles["Job-text"]}>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </div>
      </div>
      <Modal
        disableEnforceFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Card classes={{ root: classes.card }} elevation={0}>
            <DogwalkerStepper closeStepper={handleClose} />
          </Card>
        </Fade>
      </Modal>
    </PageBase>
  );
};

export default Lang;
