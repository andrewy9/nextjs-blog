import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { Client } from '../utils/prismicHelpers'

export default function Home({ doc, menu }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData

  const client = Client()

  const author = await client.getSingle('author', ref ? { ref } : null) || {}
  const post = await client.getSingle('post', ref ? { ref } : null) || {}

  return {
    props: {
      author,
      post,
      preview
    }
  }
}