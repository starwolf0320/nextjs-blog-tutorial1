//Head is a react component that is built into Next.js and allows you to modify head of page.
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date';
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
//A specific hook used in Next.js for data fetching called SWR, it handles caching, revalidation, focus tracking, refetchingon internal, and more.
// import useSWR from 'swr'
/**
 * Example Usage
 * 
  function Profile() {
    const { data, error } = useSWR('/api/user', fetch)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return <div>hello {data.name}!</div>
  }
  *
 */
//getStaticProps method tells next.js that the page has some data, and load this data before pre-rennder this page at build time.
//In development mode getStaticProps runs on each request instead.
//getStaticProps will only run server side, therefore not be included in js bundle on browser, can write direct db queries without them being sent to browsers.
//On development, it will run on every request.
//On production runs on build time, and behavior can be enhanced using fallback key returned by getStaticPaths
//On production since ran on build time not on each request, it will not use query parameters and http headers.
//getStaticProps can be exports from a page,and can't export it from non-page files
//Reason for htis restriction is that needs to have all the requiered data before the page is rendered.
//If you can't pre-render a page user request, or has frequently updated data, and page content changes on every request. It is a good idea to use server side paging.
//Static side rendering
export async function getStaticProps() {
  //Get external data from file system, API, DB, etc.
  const allPostsData = getSortedPostsData();

  // The value of the props key will be 
  // passed to the Home component
  //Will pass all the postsDataRetrieved via props
  return {
    props: {
      allPostsData
    }
  };
}
//Use this for server side rendering of props, NOTE: getStaticProps and getServerSideProps both run server side.
//It's argument context contains request parameters.
//Only use this if you need to re-render a page whose data must be fetched at request time. 
//Time to first byte(TTFB) will be slower than getStaticProps becuase the server must compute the result on every request and result cannot be cached on CDN without extra configuration.
// export async function getServerSideProps(context) {
//   return {
//     props: {

//     }
//   }
// }

//Can load data client-side which is ideal for frequently updated data such as a user dashboard
export default function Home({ allPostsData }) {
  console.log('allPostsData:', allPostsData);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
            ))}
        </ul>
      </section>
    </Layout>
  )
}
