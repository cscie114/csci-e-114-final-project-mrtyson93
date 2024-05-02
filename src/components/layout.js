import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby';
import {
    content,
    footer,
    header,
    heading,
    siteTitle,
} from './layout.module.css'

const Layout = (props) => {
    // Extract properties passed into this component directly
    const children = props.children;   // React passes in any child elements
    const pageTitle = props.pageTitle; // custom property: page title

    // Get the site title (data from gatsby-config.js)
    const data = useStaticQuery(graphql`
        query {
        site {
            siteMetadata {
                title
            }
        }
        }
    `)

    // Return the Layout component
    return (
        <div className={content}>
            <header className={header}>
                {/* Shamelessly taking layout file from class example */}
                <h1 className={siteTitle}><Link to="/">{data.site.siteMetadata.title}</Link></h1>
            </header>
            <main>
                <h2 className={heading}>{pageTitle}</h2>
                {children}
            </main>
            <footer className={footer}>
                Developed by Mitchell Tyson, Final Project, for CSCI E-114, Spring 2024.
            </footer>
        </div>
    )
}

export default Layout