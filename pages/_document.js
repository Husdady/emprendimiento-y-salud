// Librarys
import { Html, Head, Main, NextScript } from 'next/document'

// Headers
import { FaviconHeader } from '@headers'

// Package
const pk = require('@root/package.json')

const fontawesome = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="author" content={pk.author} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/img/emprendimientoysalud.webp" />
        <link rel="stylesheet preload" as="style" href={fontawesome} />
        <FaviconHeader />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
