import React from "react";

import Header from "./Header/Header";
import Footer from './Footer/Footer';

import styles from "../pages/styles/index.module.css";
import SimpleBar from "simplebar-react";
import withHttpsRedirect from "../HoCs/withHttpsRedirect";
import withWwwRedirect from "../HoCs/withWwwRedirect";
const PageBase = ({ children, background }) => {
    return (
        <SimpleBar style={{maxHeight:"100vh"}}>
            <div className={styles["Index"]} style={{ backgroundImage: background ? `url(${background})` : 'none' }}>
                <Header />
                {children}
                <Footer />
            </div>
        </SimpleBar>

    )
}

export default withWwwRedirect(withHttpsRedirect(PageBase));
