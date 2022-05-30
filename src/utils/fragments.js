// GraphQL Fragments
const fragments = {
  // Obtener campos de la información de contacto
  contact: `
		fragment ContactFragment on Contact {
		  fullname
      aboutMe
      testimony
      phone
      omnilifeCode
      contactPhoto {
        url
      }
      emails
      socialNetworks {
        twitter {
          _id
          nameOfThePage
          linkOfThePage
        }
        instagram {
          _id
          nameOfThePage
          linkOfThePage
        }
        facebook {
          _id
          nameOfThePage
          linkOfThePage
        }
      }
		}`,

  // Obtener campos de un testimonio Omnilife
  testimonials: `
    fragment TestimonialsFragment on Testimony {
      _id
      testimony
      author {
        age
        name
        country
        short_name
        photo {
          url
          width
          height
        }
      }
  }`,

  // Obtener campos de un producto en específico
  product: `
		fragment ProductFragment on Product {
		  name
      content
      description
      usageMode
      totalVisits
      benefits {
        _id
        benefit
      }
      images {
      	url
      	width
      	height
      }
		}`,

  // Obtener campos de productos
  products: `
    fragment ProductsFragment on Product {
      _id
      name
      description
      stock
      price
      defaultImage {
        url
        width
        height
      }
    }`,

  // Obtener campos de últimos productos
  productsBenefits: `
    fragment ProductsBenefitsFragment on Product {
      _id
      name
      benefits {
        _id
        benefit
      }
      defaultImage {
        url
        width
        height
      }
    }`,

  // Obtener campos de pedidos de un cliente
  orders: `
  fragment OrdersFragment on ClientOrders {
    count
    clientProducts {
      _id
      status
      totalUnits
      creationDate
      product {
        _id
        name
        price
        stock
        defaultImage {
          url
        }
      }
    }
  }`,
}

export default fragments
