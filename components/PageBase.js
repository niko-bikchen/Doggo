import React from "react";

import Header from "./Header/Header";

import styles from "../pages/index.module.css";

const PageBase = ({children})=>{
    return (
        <div className={styles["Index"]}>
            <Header />
            {children}
        </div>
    )
}

export default PageBase;
