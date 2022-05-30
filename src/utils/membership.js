// React
import { Fragment } from 'react'

// Components
import { Lists, Categories, Requeriments, GeneralTerms, WaysToGenerateProfit } from '@root/src/components/layouts/membership/Membership.Lists'
import CountryLinks from '@root/src/components/layouts/membership/Membership.CountryLinks'
import Table from '@root/src/components/layouts/membership/Membership.Table'
import NetworkMarketingExample from '@root/src/components/layouts/membership/Membership.NetworkMarketingExample'

// Utils
import { scrollToSection } from '@utils/Helper'

// JSON
import benefits from '@assets/json/membership/benefits.json'
import clientBenefits from '@assets/json/membership/client-benefits.json'
import entreprenuerBenefits from '@assets/json/membership/entreprenuer-benefits.json'

// Images
const ignacio = require('@assets/img/membership/ignacio.webp').default
const thumbnail01 = require('@assets/img/membership/thumbnail-01.webp').default
const thumbnail02 = require('@assets/img/membership/thumbnail-02.webp').default
const thumbnail03 = require('@assets/img/membership/thumbnail-03.webp').default
const thumbnail04 = require('@assets/img/membership/thumbnail-04.webp').default
const thumbnail05 = require('@assets/img/membership/thumbnail-05.webp').default
const thumbnail06 = require('@assets/img/membership/thumbnail-06.webp').default
const thumbnail07 = require('@assets/img/membership/thumbnail-07.webp').default
const thumbnail08 = require('@assets/img/membership/thumbnail-08.webp').default
const thumbnail09 = require('@assets/img/membership/thumbnail-09.webp').default
const thumbnail10 = require('@assets/img/membership/thumbnail-10.webp').default

/// PDFS
const seytuCatalog = process.env.PUBLIC_URL + '/assets/pdfs/catalogo-seytu.pdf'
const omnilifeCatalog = process.env.PUBLIC_URL + '/assets/pdfs/catalogo-omnilife.pdf'
const omnilifeCompensation = process.env.PUBLIC_URL + '/assets/pdfs/plan-de-compensacion-omnilife.pdf'
const omnilifeRequirements = process.env.PUBLIC_URL + '/assets/pdfs/resumen-de-ganancias-y-requisitos-omnilife.pdf'

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
    text: '2. Plan de Compensación Omnilife',
  },
  {
    type: 'image',
    url: thumbnail05,
    width: 638,
    height: 493,
    alt: 'thumbnail-05',
    style: { display: 'flex', justifyContent: 'center' },
  },
  {
    type: 'paragraph',
    style: { display: 'block', marginTop: 20 },
    text: 'Al convertirte en Empresario Omnilife, con nuestro Plan de Compensación serás parte de la revolución financiera que distingue a nuestra gente. Con el, tu Negocio Independiente te llevará a cumplir los sueños más grandes que puedas imaginar, solamente con aplicar los cinco comportamientos de oro. **¡Bienvenido a la gran vida! ¡La vida Omnilife!**',
  },
  {
    type: 'custom',
    component: <Lists key="membership-benefits" data={benefits} />,
  },
  {
    type: 'paragraph',
    text: 'En Omnilife existen un total de 6 categorías de empresarios:',
  },
  {
    type: 'custom',
    component: <Categories key="membership-categories" />,
  },
  {
    type: 'paragraph',
    text: 'Y de esas 6 categorías, existen 4 sub-categorías: **Activo, Premier, Elite y Supreme**. Cuando te afilias como Empresario Independiente, automáticamente empiezas en la categoría bronce.',
  },
  {
    type: 'paragraph',
    text: 'Para poder subir de categorías, necesitas hacer puntos, los puntos se ganan al comprar productos y cada vez que subas de categoría ganas un bono con una determinada suma de dinero. Ejem: subes de Bronce a Plata, obtienes un bono de 500 dólares.',
  },
  {
    type: 'paragraph',
    text: 'El dinero de los bonos aumenta dependiendo de la categoría que asciendas. Pero antes de subir de categoría, debes saber como subir entre sub-categorias.',
  },
  {
    type: 'title',
    shortcut: 'shortcut-G3TR2',
    text: '2.1. ¿Cómo subir entre sub-categorias?',
  },
  {
    type: 'paragraph',
    text: 'Si has llegado hasta aquí, tu interés por el negocio es notable, Omnilife presenta 4 sub-categorias ya mencionadas anteriormente. Ahora para poder ascender entre ellas, necesitas algunos requisitos, estos aumentan cada vez que subes de sub-categoría.',
  },
  {
    type: 'paragraph',
    text: '**Los requisitos para ascender son:**',
  },
  {
    type: 'custom',
    component: <Requeriments key="requeriments-for-ascent-category" />,
  },
  {
    type: 'paragraph',
    text: 'Para entender mejor el negocio, debes saber los términos generales que se manejan en este. Omnilife maneja diferentes términos para comprender mejor su negocio, que te ayudarán a saber como funciona este increíble negocio y que sus ganancias pueden ser muy grandes si le pones mucha dedicación.',
  },
  {
    type: 'title',
    shortcut: 'shortcut-A7JW2',
    text: '2.2. Términos generales',
  },
  {
    type: 'custom',
    component: <GeneralTerms key="general-terms" />,
  },
  {
    type: 'image',
    url: thumbnail06,
    width: 814,
    height: 604,
    alt: 'thumbnail-06',
  },
  {
    type: 'title',
    shortcut: 'shortcut-N120A',
    text: '2.3. ¿Qué son las redes de mercadeo?',
  },
  {
    type: 'paragraph',
    text: 'Es un modelo de negocio y de distribución de productos mediante la cual distribuidores independientes o networkers, pueden asociar a otros distribuidores y obtener comisiones por el movimiento de esos productos o servicios dentro de su red.',
  },
  {
    type: 'paragraph',
    text: 'Ya sabiendo lo que es un red de mercadeo, Omnilife tiene su propio modelo de red. Para poder explicar mejor su modelo, te lo explicaré con un ejemplo.',
  },
  {
    type: 'paragraph',
    shortcut: 'shortcut-P21JS',
    text: '**Te presento a Ignacio:**',
  },
  {
    type: 'image',
    url: ignacio,
    width: 512,
    height: 384,
    alt: 'ignacio',
    style: { display: 'flex', justifyContent: 'center' },
  },
  {
    type: 'paragraph',
    style: { display: 'block', marginTop: 20 },
    text: 'Ignacio es un profesor de historia, sus ganancias no son realmente bajas pero desea ganar más dinero para poder comprarse el último modelo de moto que salió en el mercado.',
  },
  {
    type: 'paragraph',
    text: 'Tiene muchos gastos, como de agua, luz, comida, alquiler y una deuda de **$/. 8000** a pagar. Él gana **$/. 650** dólares en la Institución Educativa donde trabaja y no es suficiente dinero para pensar en tener gastos extras.',
  },
  {
    type: 'paragraph',
    text: 'Una amiga suya, llamada Erica, le comenta sobre un buen negocio donde puede ganar dinero extra. Ella le platica a Ignacio sobre el negocio Omnilife y sus redes de mercadeo:',
  },
  {
    type: 'paragraph',
    text: '**/"Omnilife es un negocio que te abre la puerta a muchos caminos, ganas comisiones por las compras que hacen tus afiliados y por las ventas de cada producto vendido."/**',
  },
  {
    type: 'paragraph',
    text: 'Pero Ignacio le dice que no ha entendido muy bien, le pide que le explique acerca de los afiliados. Entonces Erica le dice:',
  },
  {
    type: 'paragraph',
    text: '**/"Un afiliado es una persona que pertenece a la red de otro afiliado o empresario. Al iniciarte en el negocio, ya eres un empresario Omnilife, si deseas iniciar en el negocio, te puedo afiliar para que puedas ser parte de mi red"/**',
  },
  {
    type: 'paragraph',
    text: 'Entonces Ignacio comprendió que al inscribirte, te conviertes en un afiliado, y que también puedes tener afiliados dentro de tu red para que trabajen para ti. Estos por su parte te dejarán comisiones/dinero dependiendo de cuanto producto compren.',
  },
  {
    type: 'paragraph',
    text: 'Ignacio está realmente interesado en el negocio y le dice a Erica como puede inscribirse. Ella le comenta:',
  },
  {
    type: 'paragraph',
    text: '**/"Puedes afiliarte como Cliente o como Empresario, las personas que se afilian como Cliente, sólo compran los productos para uso personal, en cambio los Empresarios, hacen el negocio y distribución de productos Omnilife"/**.',
  },
  {
    type: 'title',
    shortcut: 'shortcut-RQ6S0',
    text: '2.4. Formas de afiliación',
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
    url: thumbnail07,
    alt: 'thumbnail-07',
    extraImageProps: { layout: 'fill', objectFit: 'cover' },
    style: { display: 'inline-block', width: '50%', height: 300, position: 'relative' },
  },
  {
    type: 'image',
    url: thumbnail08,
    alt: 'thumbnail-08',
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
    type: 'paragraph',
    text: (
      <Fragment key="as12-a210jasda">
        Siguiendo con la{' '}
        <u className="pointer" onClick={() => scrollToSection('shortcut-P21JS')}>
          Historia de Ignacio
        </u>
        , decide afiliarse por contrato como Empresario Omnilife, Erica le pide que firme y rellene todos los datos requeridos en los papeles que ella le entrega.
      </Fragment>
    ),
  },
  {
    type: 'paragraph',
    text: 'Ignacio hace una pequeña inversión de **$/.35** y adquiere su kit de inicio: Una mochila, un catálogo, su contrato, un Agua blur, y un Magnus. Erica, de regalo, le da un six-pack de chiva-cola y le explica como triunfar en Omnilife:',
  },
  {
    type: 'paragraph',
    text: '**/"En el catálogo puedes ver los precios en que se venden los productos y el precio en que se compran con descuento. Necesitas vender el producto, comprar otro con lo que ganas y volverlo a vender, así tus ganancias irán aumentando porque si primero tuviste para uno, en un futuro tendrás para dos."/**',
  },
  {
    type: 'paragraph',
    text: 'Ignacio le agradece su amabilidad, y hace caso a lo que su amiga le dijo, comienza a vender productos, día a día, promociona sus productos a compañeros de trabajo, familiares, amigos, conocidos, etc.',
  },
  {
    type: 'paragraph',
    text: 'Mientras Ignacio va vendiendo y comprando productos, va obteniendo puntos, después de un mes llega a los **1000 PP** y pasa a ser Bronce Activo, además de alcanzar el 40 % de desct. Pero él no se conforma con el dinero que gana de vender productos, quiere ganar más de lo que gana.',
  },
  {
    type: 'paragraph',
    text: 'Entonces Ignacio se acordó que podía afiliar a personas para que pueden pertenecer a su red y dejarle comisiones. Él conoce a Mónica, una joven universitaria que sea trabajar para pagar sus estudios. Ignacio le habla del negocio y se hacen amigos.',
  },
  {
    type: 'paragraph',
    text: 'Ignacio se reencuentra con Juan, un amigo de la infancia y le platica sobre el negocio Omnilife, su amigo se interesa y se afilia con su **código de Empresario** por la página web oficial de Omnilife.',
  },
  {
    type: 'paragraph',
    text: 'Mónica y Juan vendrían hacer sus afiliados de primer nivel, los afiliados de Mónica y Juan vendrían hacer afiliados de segundo nivel de Ignacio y de primer nivel de estos dos respectivamente. Por encima de Mónica y Juan, está Ignacio, que vendría hacer su presentador, y por encima de él, vendría estar Erica, que es la presentadora de Ignacio.',
  },
  {
    type: 'paragraph',
    text: 'Si los afiliados de Mónica y Juan, afiliaran a mas personas, Ignacio tendría un tercer nivel, y los afiliados directos de Ignacio(Mónica y Juan), tendrían un segundo nivel. En pocas palabras, cada vez que tus afiliados, afilian, tienes un **nuevo nivel de descendencia.**',
  },
  {
    type: 'paragraph',
    text: 'Te dejamos un ejemplo claro y conciso sobre cómo se estructuran las redes de mercadeo en Omnilife:',
  },
  {
    type: 'custom',
    component: <NetworkMarketingExample key="network-marketing-example" />,
  },
  {
    type: 'title',
    shortcut: 'shortcut-FK05L',
    text: '2.5. ¿Cuánto ganaré en Omnilife?',
  },
  {
    type: 'paragraph',
    text: 'Eso depende del interés que le pongas al negocio, te puedo asegurar que en categoría **Plata Supreme**, los ingresos pueden ser entre **2500 a 3500 dólares**. Empresarios de categoría /Diamante Premier/ ganan aproximadamente una suma de **$/.15,000 dólares mensuales.**',
  },
  {
    type: 'image',
    url: thumbnail09,
    width: 1400,
    height: 1050,
    alt: 'thumbnail-09',
    style: { marginBottom: 20 },
  },
  {
    type: 'paragraph',
    text: 'Las ganancias depende del volumen de la compra que realizan sus presentados o afiliados que forman parte de su Red de Distribución, así como de sus clientes. Las ganancias pueden ser generadas de las siguientes formas:',
  },
  {
    type: 'custom',
    component: <WaysToGenerateProfit key="ways-to-generate-profit" />,
  },
  {
    type: 'paragraph',
    text: (
      <Fragment key="as12-a210jasdb">
        Terminando con la{' '}
        <u className="pointer" onClick={() => scrollToSection('shortcut-P21JS')}>
          Historia de Ignacio
        </u>
        , los tres primeros meses, Mónica y Juan le dejan a Ignacio una comisión del 10% de sus compras, dejándole como ganancias <b>$/. 700</b> que puede retirar cada quincena de cada mes.
      </Fragment>
    ),
  },
  {
    type: 'paragraph',
    text: 'Ignacio es conciente que su red es muy pequeña y necesita extenderla para que sus comisiones aumenten. Han pasado 4 años desde que empezó en el negocio, con esfuerzo y dedicación pudo llegar a **Oro Elite**, su red aumentó hasta el quinto nivel y cada quincena de cada mes, retira un total de **$/.5000**, hasta el momento ha ganado varios bonos de distintas cantidades y viajes a diferentes destinos.',
  },
  {
    type: 'paragraph',
    text: 'Ignacio pudo pagar la deuda que tenia y comprarse la moto que soñaba. Ahora viaja feliz por el mundo buscando prospectos, dejó de ser profesor y se convirtió en un Emprendedor Omnilife.',
  },
  {
    type: 'paragraph',
    text: '**/"Tu historia puede ser igual a la Historia de Ignacio, sólo necesitas ganas de emprender, perseguir tus sueños y no darte por vencido por las dificultades que se te presenten"/**',
  },
  {
    type: 'image',
    url: thumbnail10,
    width: 658,
    height: 590,
    alt: 'thumbnail-10',
  },
  {
    type: 'title',
    shortcut: 'shortcut-Q4V2O',
    text: '2.6. ¿Cómo adquirir un producto en nuestra página?',
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
  },
  {
    type: 'paragraph',
    text: `Te invito a descargar los siguientes PDF's: #<${omnilifeCompensation}><Plan de compensación Omnilife>#, el cuál habla completamente sobre el negocio Omnilife y #<${omnilifeRequirements}><Resumen de Ganancias y Requisitos Omnilife>#, que habla sobre las comisiones y requisitos para subir entre **categorías y sub-categorías**. Si tienes alguna duda, no olvides contactar a nuestra distribuidora Yessica Milagros, que te brindará asesoramiento gratuito.`,
  },
]

export default membership
