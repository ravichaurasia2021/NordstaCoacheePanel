import Document, { Html, Head, Main, NextScript } from 'next/document'
class WebDocument extends Document {
    render() {
        return (
            <Html lang="en-US">
                <Head>
                    
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default WebDocument