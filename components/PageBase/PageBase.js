import React from "react";
import SimpleBar from "simplebar-react";
import withHttpsRedirect from "../../HoCs/withHttpsRedirect";
import withWwwRedirect from "../../HoCs/withWwwRedirect";

import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import styles from "../../pages/styles/index.module.css";

const PageBase = ({ children, background }) => {
    return (
        <SimpleBar style={{ maxHeight: "100vh" }}>
            <div className={styles["Index"]} style={{ backgroundColor:'#F5F7FA', backgroundImage: background ? `url(${background})` : 'none' }}>
                <Header />
                <div style={{ minHeight: "calc(100vh - 150px)" }}>
                    {children}
                </div>
                <Footer />
            </div>
        </SimpleBar>

    )
}

export default withWwwRedirect(withHttpsRedirect(PageBase));
