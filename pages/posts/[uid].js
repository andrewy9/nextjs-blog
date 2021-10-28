import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Loader from "../../components/loader"
import Custom404 from '../404'

// Project functions imported from wherever you declare them
import { Client } from "../../utils/prismicHelpers";
import { queryRepeatableDocuments } from '../../utils/queries'; //some helper queries for the getStaticPaths function
import useUpdatePreviewRef from '../../utils/useUpdatePreview'


export default function Post({ post, previewRef }) {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }

  if (!post.id) {
    return <Custom404 />
  }

  console.log(post.data.coverimage.url)

  useUpdatePreviewRef(previewRef, post.id)

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>{post.uid}</h1>
      <img src={post.data.coverimage.url} />
      <div className={utilStyles.lightText}>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </Layout>
  )
}
export async function getStaticProps({ params, previewData }) {
  const client = Client();
  const previewRef = previewData ? previewData.ref : null
  const refOption = previewRef ? { ref: previewRef } : null

  const post = await client.getByUID("post", params.uid, refOption) || {}

  return {
    props: {
      previewRef,
      post
    }
  }
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments((doc) => doc.type === 'post')
  const paths = documents.map(doc => `/posts/${doc.uid}`)
  return {
    paths,
    fallback: true,
  }
}

