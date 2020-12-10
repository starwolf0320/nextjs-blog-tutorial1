//The app component is the top level component, which will be common across all different pages
//The app component can keep state when navigating between pages.
//Only global css files can be used in the __app.js file(or the top level component), why it can't be used anywhere else becuase it is effecting all elements
//Can add a global css file anywhere.
import  '../styles/global.css'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}
