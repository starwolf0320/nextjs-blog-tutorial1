import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    //Return a list of possible values [the dynamic routes parameters is in between square brackets]
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

//In order to retrieve data for this particular dynamic route use the [id] from params.
export async function getStaticProps({ params }) {
    //Fetch data for specific post using params.id
    const postData = await getPostData(params.id);
    //Return the new props after retrieving data before pre-rendering page
    return {
        props: {
            postData
        }
    };

}