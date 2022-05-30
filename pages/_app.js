// React
import { useEffect, useState, useCallback, useMemo } from 'react'

// Components
import Loading from '@root/src/components/layouts/loaders/Loading.Preload'

// Librarys
import Router from 'next/router'
import NProgress from 'nprogress'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Reducers
import { wrapper } from '@redux/store'

// Utils
import { isWindowAvailable } from '@utils/Validations'

// Library Styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'antd/dist/antd.css'
import 'nprogress/nprogress.css'
import 'react-phone-input-2/lib/style.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

// Common styles
import '@assets/styles/fonts.css'
import '@assets/styles/global.css'
import '@assets/styles/bootstrap.css'
import '@assets/styles/header.css'
import '@assets/styles/footer.css'

// Loaders
import '@styles/loaders/loading.cubes.css'
import '@styles/loaders/loading.preload.css'

// 404 Styles
import '@styles/404/page-not-found.css'

// Contact Styles
import '@styles/contact/index.css'

// Omnilife History Styles
import '@styles/omnilife-history/index.css'

// Home Styles
import '@styles/home/home.business.css'
import '@styles/home/home.information.css'
import '@styles/home/home.membership.css'
import '@styles/home/home.product.css'
import '@styles/home/home.section.css'

// Affiliat Program Styles
import '@styles/membership/index.css'

// Products Styles
import '@styles/products/products.home.css'
import '@styles/products/products.home.responsive.css'
import '@styles/products/products.seytu.css'
import '@styles/products/products.omnilife.css'
import '@styles/products/product.information.css'

// Testimonials Styles
import '@styles/testimonials/index.css'
import '@styles/testimonials/testimony.css'

library.add(far, fas, fab)

function MyApp({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(true)
  const store = useStore((state) => state)
  const persitor = isWindowAvailable() ? store.__persistor : store

  // Mostrar loading cuando se cambia de ruta
  const handlesShowLoading = useCallback(() => {
    NProgress.start()
    setLoading(true)
  }, [])

  // Ocultar loading cuando se cargó la página
  const handlesHideLoading = useCallback(() => {
    NProgress.done()
    setLoading(false)
  }, [])

  // Evento que se dispara cuando se está cambiando de ruta
  Router.events.on('routeChangeStart', handlesShowLoading)

  // Evento que se dispara cuando se termina de cambiar de ruta
  Router.events.on('routeChangeComplete', handlesHideLoading)

  // Evento que se dispara cuando hay un error al cambiar de ruta
  Router.events.on('routeChangeError', () => NProgress.done())

  useEffect(() => {
    let isMounted = true
    let timeout = setTimeout(() => {
      isMounted && setLoading(false)
    }, 4000)

    return () => {
      isMounted = false
      clearTimeout(timeout)
    }
  }, [])

  // Renderizar contenido de app
  const renderContent = useMemo(() => {
    if (isLoading) {
      return <Loading />
    }

    return <Component {...pageProps} />
  }, [isLoading, pageProps])

  return (
    <PersistGate loading={null} persistor={persitor}>
      {renderContent}
    </PersistGate>
  )
}

export default wrapper.withRedux(MyApp)
