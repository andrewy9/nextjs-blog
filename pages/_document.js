import Document, { Html, Head, Main, NextScript } from 'next/document'
import { apiEndpoint } from '../prismic-configuration'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const [, repoName] = apiEndpoint.match(/https?:\/\/([^.]+)?\.(cdn\.)?.+/);
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script async defer src={`"https://static.cdn.prismic.io/prismic.js?new=true&repo=my-test-prismic-blog"`}></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument