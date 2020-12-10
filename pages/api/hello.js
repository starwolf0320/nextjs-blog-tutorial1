//req -> HTTP incoming message, res = HTTP server response.
/**
 * 
 * Do not fetch data via api route from getStaticProps or getStaticPaths, instead directly call it or call a helper function.
 * Because getStaticProps and getStaticPaths will never be passed client side(it won't even be included in the js bundle), you can do database operations in those functions.
 * Good use case for api endpoints are handling form input.
 * Send post request to api route, since it will never be part of client bundle, you can safely write server side code.
 * Useful for fetching data from headless CM how not useful when writing draft and want to preview it immediantly. You should want this pages rendered on request time instaed of build time
 * Next.js preview mode solves this problem, and utilizes api routes.
 */
export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' })
}