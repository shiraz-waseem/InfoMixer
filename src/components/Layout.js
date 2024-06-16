import React from 'react'
import { Helmet } from "react-helmet"
import Navbar from "./NavBar"
import Footer from "./Footer"

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <>
            <Helmet>
                <meta charset="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            {/* <Navbar /> */}
            <main style={{ minHeight: "73vh" }}>{children}
            </main>
            {/* <Footer /> */}
        </>
    )
}

Layout.defaultProps = {
    title: "API Project",
    description: "A project having multiple apis used to play with",
    keywords: "ReactJS",
    author: "shiraz",
};

export default Layout