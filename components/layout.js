import Head from 'next/head'
//Import css and sass files as default exported modules.
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'


const name = 'Ali Alhaddad'
export const siteTitle = 'Next.js Sample Blog Website'

export default function Layout({ children, home }) {
    //Reference imported module via styles.[classname]
    //When the classnames of the styles is computed it will generate unique class names.
    //Code splitting also is with css modules, ensures minimal amount of css loaded for each page. Results in smaller bundle sizes.
    //CSS modules extracted from javascript bundles at build time and generate .css files that are loaded automatically by next.js.
    //Add home prop to conditionally adjust the title and image
    //Use of meta tag to describe the page's content.
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="favicon.ico" />
                <meta 
                    name="description"
                    content="Learn how build a personal website using Next.js"
                />
                <meta 
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                      )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img
                            src="/images/profile.jpeg"
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <img
                                src="/images/profile.jpeg"
                                className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                                alt={name}
                                />
                            </a>
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href="/">
                                <a className={utilStyles.colorInherit}>{name}</a>
                            </Link>
                        </h2>
                    </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
                </div>
            )}
        </div>
    );
}