// React
import { Fragment } from 'react'

// Components
import Lists from '@root/src/components/layouts/membership/Membership.Lists'
import CountryLinks from '@root/src/components/layouts/membership/Membership.CountryLinks'
import Table from '@root/src/components/layouts/membership/Membership.Table'

// JSON
import clientBenefits from '@assets/json/membership/client-benefits.json'
import entreprenuerBenefits from '@assets/json/membership/entreprenuer-benefits.json'

// Images
const thumbnail01 = require('@assets/img/membership/thumbnail-01.webp').default
const thumbnail02 = require('@assets/img/membership/thumbnail-02.webp').default
const thumbnail03 = require('@assets/img/membership/thumbnail-03.webp').default
const thumbnail04 = require('@assets/img/membership/thumbnail-04.webp').default
const thumbnail05 = require('@assets/img/membership/thumbnail-05.webp').default
const thumbnail06 = require('@assets/img/membership/thumbnail-06.webp').default

/// PDFS
const seytuCatalog = process.env.PUBLIC_URL + '/assets/pdfs/catalogo-seytu.pdf'
const omnilifeCatalog = process.env.PUBLIC_URL + '/assets/pdfs/catalogo-omnilife.pdf'

const membership = [
  {
    type: 'image',
    url: thumbnail01,
    width: 800,
    height: 400,
    alt: 'thumbnail-01',
  },
  {
    type: 'title',
    text: '1. ¿Qué es Omnilife?',
  },
  {
    type: 'paragraph',
    text: 'Omnilife es una **empresa mexicana de multidesarrollo o multinivel** muy reconocida a nivel internacional. Fue creada en 1991 por Jorge Vergara. Esta empresa tiene como propósito producir y distribuir productos nutricionales, de belleza y multivitamínicos.',
  },
  {
    type: 'paragraph',
    text: 'La compañía cuenta con más de **100 productos de nutrición** y más de **80 productos de su línea de belleza** de alta calidad y en la actualidad tiene más de 7 millones de empresarios, en los mas de 20 países de América y Europa donde esta posicionada.',
  },
  {
    type: 'paragraph',
    text: 'De hecho, muchas personas conocen el multinivel gracias a Omnilife, en gran parte gracias al posicionamiento del producto, el cual tiene una tecnologia celular de punta.',
  },
  {
    type: 'paragraph',
    text: 'En varios hogares se han convertido en productos de consumo masivo, sobre todo en personas que quieren llevar un estilo de vida más saludable, tomando la nutrición Omnilife para mejorar su salud y calidad de vida.',
  },
  {
    type: 'title',
    shortcut: 'shortcut-P129S',
    text: '1.1. ¿Cómo es el Negocio Omnilife-Seytú?',
  },
  {
    type: 'paragraph',
    text: 'En este negocio no se tiene un jefe ni hay que rendirle cuentas a nadie ni mucho menos hacer una gran inversión. Solo se necesita tener ganas de crecer, cambiar su vida y lograr cumplir los sueños.',
  },
  {
    type: 'paragraph',
    text: 'Omnilife te da la oportunidad de **construir tu propia organización**, la cual la puedes hacer con amigos, familiares, compañeros de trabajo, vecinos, amigos de la escuela, personas de la calle, con gente que esté cansada de tener una mala salud, mala economía y quiera mejorar su vida y ayudar a otras personas.',
  },
  {
    type: 'paragraph',
    text: 'Aqui podrás ganar dinero diariamente por la distribución de productos. Obtienes una **ganancia desde un 20% hasta un 40%** y además vas construyendo un cheque quincenal, por las compras de todas las personas que ayudaste a ingresar y se registraron contigo y en continuo crecimiento, se pueden tener distribuidores donde te encuentres, en tu país y en todo los países donde esta la compañía.',
  },
  {
    type: 'image',
    url: thumbnail02,
    width: 1600,
    height: 750,
    alt: 'thumbnail-02',
  },
  {
    type: 'title',
    shortcut: 'shortcut-1Z2J0',
    text: '1.2. ¿Cómo empezar en el negocio?',
  },
  {
    type: 'paragraph',
    text: 'Puedes registrarte, dependiendo del próposito que tengas, es decir, si sólo deseas consumir productos para proteger tu salud o adquirir productos de belleza, puedes afiliarte como **Cliente Admirable**.',
  },
  {
    type: 'paragraph',
    text: 'En cambio si deseas emprender: Ganar dinero vendiendo nuestros productos y formar tu red de distribución, puedes afiliarte como **Empresario Independiente**. Para ello elige tu país en la lista desplegable de abajo, al seleccionar tu país, se te redireccionará a la página oficial de Omnilife.',
  },
  {
    type: 'custom',
    component: <CountryLinks key="cmaos12-x0ah1" />,
  },
  {
    type: 'paragraph',
    text: 'Si es la primera vez que entras a la página oficial de Omnilife, te pedirá que vuelvas a seleccionar tu país, después que lo selecciones, entrarás a una página de registro.',
  },
  {
    type: 'paragraph',
    text: 'Procede a rellenar todos los datos necesarios para la activación de tu cuenta. Los datos a ingresar son distintos dependiendo de lo que hayas elegido, /Cliente Admirable/ o /Empresario Independiente/.',
  },
  {
    type: 'paragraph',
    text: 'Al terminar, te pedirán que ingreses a tu correo electrónico y verifiques tu bandeja de entrada, donde encontrarás un mensaje del equipo de Omnilife, ingresando allí podrás activar tu cuenta de Cliente admirable o Empresario Independiente. **/¡Felicidades, ahora eres parte de nuestra familia Omnilife, gente que cuida a la gente!/**',
  },
  {
    type: 'paragraph',
    text: `Te invito a que descargues los catálogos Seytú y Omnilife, donde podrás ver todos los productos en el siguiente enlace: #<${seytuCatalog}><Descargar catálogo Seytú># | #<${omnilifeCatalog}><Descargar catálogo Omnilife>#. Debes saber que los productos tienen distintas versiones o algunos no están disponibles dependiendo del país del que eres.`,
  },
  {
    type: 'title',
    shortcut: 'shortcut-N88UY',
    text: '1.3. ¿Qué es un Cliente admirable?',
  },
  {
    type: 'paragraph',
    text: 'Es una persona, que sin ser distribuidora, puede comprar cualquier producto Omnilife/Seytú sin pagar ninguna membresía. Al ser un Cliente Admirable podrás comprar en **cualquier Centro de Distribución Omnilife del país cualquier producto Omnilife y Seytú**, las veces que quieras y cuando quieras a precio de catálogo, es decir, sin descuento.',
  },
  {
    type: 'paragraph',
    text: 'Esto es recomendable para las personas que están indecisas y quieren probar el producto antes de registrarse como distribuidor. Además, como cliente, puedes acceder a la atención telefónica gratuita con nuestros nutriologos, que te podrán brindar toda la asesoría.',
  },
  {
    type: 'paragraph',
    text: 'Además debes saber que los **precios se encuentran en la moneda, dependiendo del país**. Cada producto tiene una versión distinta dependiendo del país, es decir, puede cambiar el nombre o el diseño, pero el producto sigue siendo el mismo.',
  },
  {
    type: 'paragraph',
    text: 'También debes saber que algunos productos no están disponibles en algunos países. Por ejemplo: El Thermogen Coffee no está disponible en Perú, pero si lo está en Chile, Colombia, Argentina, etc.',
  },
  {
    type: 'image',
    url: thumbnail03,
    width: 1342,
    height: 394,
    alt: 'thumbnail-03',
    style: { marginBottom: 20 },
  },
  {
    type: 'paragraph',
    text: '**|BENEFICIOS:|**',
  },
  {
    type: 'custom',
    component: <Lists key="client-benefits" data={clientBenefits} />,
  },
  {
    type: 'title',
    shortcut: 'shortcut-2CH04',
    text: '1.4. ¿Qué es un Empresario Omnilife?',
  },
  {
    type: 'paragraph',
    text: 'Es una persona que se dedica a la **distribución de productos y emprendimiento del negocio Omnilife/Seytú**, aqui no es necesario tener títulos ni estudios terminados para ingresar.',
  },
  {
    type: 'paragraph',
    text: 'Al convertirte en distribuidor Omnilife, empezarás tu carrera como empresario independiente, donde vas a generar ingresos diario por la distribución de productos,y además al acumular puntos puedes calificar a viajes internacionales, bonos en efectivo y también al formar tu red de distribuidores puedes generar grandes ganancias, que te permitirán mejorar tu economía, estilo de vida y obtener en unos años tu libertad financiera, donde puedas tener tú y tu familia una vida tranquila.',
  },
  {
    type: 'paragraph',
    text: '**SI!, ESTE ES EL NEGOCIO SOÑADO POR MUCHO!** Haz escuchado decir **"GANA DINERO MIENTRAS DUERMES"**. Y si, es posible, cuando formas tu red de distribuidores, mientras tu estás de siesta, ellos van a comprar y la empresa te paga una comisión por cada compra que ellos realicen, así sea una botella de agua y esto no es solo de los que tu afiliaste, sino también de los que ellos afiliaron, es decir ganas por ellos y por los afiliados de ellos; por eso a medida que crece tu red las ganancias aumentan cada vez más.',
  },
  {
    type: 'paragraph',
    text: 'Si deseas conocer más de nuestro negocio **CONTÁCTAME**: #<https://wa.link/jdbcpo><+51 951 871 023>.#',
  },
  {
    type: 'paragraph',
    text: 'Además la empresa premia tu constancia y ganas de salir adelante con buenos bonos en efectivos, viajes maravillosos por todo el mundo en cruceros y con todos los gastos pagados, etc.',
  },
  {
    type: 'image',
    url: thumbnail04,
    width: 1028,
    height: 347,
    alt: 'thumbnail-04',
    style: { marginBottom: 20 },
  },
  {
    type: 'paragraph',
    text: '**|BENEFICIOS:|**',
  },
  {
    type: 'custom',
    component: <Lists key="f12asdp1-adn1o" data={entreprenuerBenefits} />,
  },
  {
    type: 'title',
    shortcut: 'shortcut-RQ6S0',
    text: '1.5. Formas de afiliación',
  },
  {
    type: 'paragraph',
    text: (
      <Fragment key="memership-ways">
        Existen varias maneras de afiliación, la primera es ingresando a la página oficial de Omnilife, en la sección de registro: <b>https://portal.omnilife.com/registro</b>, procede a rellenar todos
        los datos que te piden, también puedes agregar si fuiste invitado por algún afiliado.
      </Fragment>
    ),
  },
  {
    type: 'paragraph',
    text: 'Esto no es necesario agregar, pero al agregarlo te da los beneficios de tener asesoramiento gratuito por parte del afiliado por el que fuiste invitado o invitada. La siguiente manera es firmar un contrato por parte de un afiliado Omnilife, dónde te pedirá tus datos para que formes parte de su red.',
  },
  {
    type: 'paragraph',
    text: 'Recuerda que al inscribirte como Empresario, adquieres un kit de inicio a un determinado precio **(aprox $/.35 dólares)** y un producto de regalo por parte de la empresa, ese kit te ayudará a hacer el negocio, ya que tus primeras ganancias sólo serán del 20%, es decir, adquieres los productos con 20% de desct. Tu descuento irá aumentando cuando lleges a un determinado número de **PP**.',
  },
  {
    type: 'image',
    url: thumbnail05,
    alt: 'thumbnail-05',
    extraImageProps: { layout: 'fill', objectFit: 'cover' },
    style: { display: 'inline-block', width: '50%', height: 300, position: 'relative' },
  },
  {
    type: 'image',
    url: thumbnail06,
    alt: 'thumbnail-06',
    extraImageProps: { layout: 'fill', objectFit: 'cover' },
    style: { display: 'inline-block', width: '50%', height: 300, position: 'relative' },
  },
  {
    type: 'paragraph',
    style: { display: 'inline-block', marginTop: 20 },
    text: 'Y la última forma, es afiliación por línea telefónica, es la mejor manera sino sabes como afiliarte por la web o no conoces a ningún afiliado Omnilife que pueda afiliarte. Para ello te dejamos los distintos números de cada país de Sudamérica de la **línea CREO Omnilife**. Recuerda afiliarte con el código de nuestra Empresaria Yessica Milagros: **510967424SMY**.',
  },
  {
    type: 'custom',
    component: <Table key="flags-table" />,
  },
  {
    type: 'title',
    shortcut: 'shortcut-Q4V2O',
    text: '1.6. ¿Cómo adquirir un producto en nuestra página?',
  },
  {
    type: 'paragraph',
    text: 'Nuestra página promociona productos Omnilife y Seytú, más no los vende directamente por línea, es decir, no encontrarás ningún enlace en el sitio web que te lleve a una compra directa de algún producto o servicio.',
  },
  {
    type: 'paragraph',
    text: 'Si deseas adquirir un producto, lo primero que debes hacer es afiliarte como **Cliente Admirable** con el código de nuestra Empresaria Omnilife **(510967424SMY)**. Si eres de Piura - Perú, no es necesario que te afilies como /Cliente Admirable/, puedes contactar a nuestra **Distribuidora independiente** Yessica Milagros, y hacerle un pedido del producto que deseas, ella te lo llevará a tu domicilio.',
  },
  {
    type: 'paragraph',
    text: 'Si ya te afiliaste como **Cliente Admirable**, debes acercarte a un Centro de Distribución Omnilife, y con tu código Omnilife, generado automaticamente cuando te afilias, puedes comprar cualquier producto Omnilife - Seytú a precio de catálogo, es decir, sin descuento. Puedes ver los centros de distribución de los distintos países en el siguiente enlace: #<https://bit.ly/3fkbM4H><Ver Centros de distribución Omnilife>#.',
  },
  {
    type: 'paragraph',
    text: 'En cambio, sino deseas ir a ningún Centro de Distribución, puedes adquirir los productos por línea, recuerda que debes estar afiliado como **Cliente o Empresario** para poder comprar vía online, porque se te pedirá que inicies sesión en tu cuenta Omnilife.',
  },
  {
    type: 'paragraph',
    text: 'Ingresando a **https://portal.omnilife.com/productos**, puedes comprar por línea productos Omnilife, e ingresando a **https://seytu.omnilife.com/productos**, puedes comprar por línea productos Seytú.',
  }
]

export default membership
