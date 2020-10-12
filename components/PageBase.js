import React from "react";

import Header from "./Header/Header";
import Footer from './Footer/Footer';

import styles from "../pages/index.module.css";

const PageBase = ({ children }) => {
    return (
        <div className={styles["Index"]}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default PageBase;
