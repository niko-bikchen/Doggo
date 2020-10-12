import React from "react";

import Header from "../components/Header/Header";

import styles from "./index.module.css";

const PageBase = ({children})=>{
    return (
        <div className={styles["Index"]}>
            <Header />
            {children}
        </div>
    )
}

export default PageBase;
