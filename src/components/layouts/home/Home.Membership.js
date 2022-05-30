// React
import { Component } from 'react'

// Librarys
import Link from 'next/link'

export default class Membership extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className="membership d-flex shortcut-F9K88">
        <div id="afiliacion" className="wrapper m-auto" data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration={3000}>
          {/* Título */}
          <h1 className="title fw-bold mb-0 lh-normal text-break">¡Únete al mejor programa de emprendedores!</h1>

          {/* Descripción */}
          <span className="text d-block lh-normal my-3">Sé un emprendedor Omnilife y comienza a ganar dinero ya.</span>

          {/* Botón */}
          <Link href="/programa-de-afiliados">
            <a id="programa-de-afiliados" className="link opacity scale d-table text-uppercase py-3 px-5 rounded-pill">
              ¡Afiliarme ahora!
            </a>
          </Link>
        </div>
      </div>
    )
  }
}
