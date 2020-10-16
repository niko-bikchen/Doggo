import React from "react";

import Header from "./Header/Header";
import Footer from './Footer/Footer';
import styles from "../pages/styles/index.module.css";

const PageBase = ({ children, background }) => {
    return (
        <div className={styles["Index"]} style={{ backgroundImage: background ? `url(${background})` : 'none' }}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default PageBase;
