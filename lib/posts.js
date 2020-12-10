import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
//Can also query database directly
/**
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
*/

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getSortedPostsDataApi() {
    //Instead using the file system, use the fetch post data from external api endpoint.
    //Next.js polyfills fetch() on both on the client and server, no need to import it.
    const res = fetch('');
    return res.json();
}

//Responsible for retrieving possible values for dynamic route
//Can also similar to function that are used in getStaticProps, it can also perform external api calls.
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  //Example external api call.
  // const res = await fetch('');
  // const posts = await res.json();
  // return posts.map(p => ({params: { id: p.id }}));
  //THe possible values needed for a need a params property that is a type of object, with a property of dynamic route.
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '') //Return a list of file names excluding the .md extension
      }
    }
  })
}

//Function responsible for getting posts data based on id.
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  //Use grey matter to parse the post metadata section.
  const matterResult = matter(fileContents);

  //Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  //Combine data with id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}