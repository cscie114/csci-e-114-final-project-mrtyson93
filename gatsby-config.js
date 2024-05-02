/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Final Project - Mitchell Tyson`,
    description: `TBD`,
    course: `CSCI E-114`,
    siteUrl: `http://localhost:8000`,
  },
  plugins: [
    `gatsby-transformer-json`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
