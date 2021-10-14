import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post(props) {
  return (
    <Layout>
      <Head>
        <title>{props.postData.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{props.postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={props.postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.postData.contentHtml }} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(props) {
  const postData = await getPostData(props.params.id)
  return {
    props: {
      postData
    }
  }
}