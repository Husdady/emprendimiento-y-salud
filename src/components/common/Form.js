// React
import { Component } from 'react'

// Librarys
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Utils
import { isFunction, isString, isEmptyString, isObject, isEmptyObject, validateSchemaField } from '@utils/Validations'

export default class Form extends Component {
  static defaultProps = {
    initialValues: {},
    validationSchema: {},
    validateOnChange: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      isValidForm: false,
      formHasBeenEdited: false,
      values: this.props.initialValues,
    }
    this.getRulesSchema = this.props.validationSchema ? Object.values(this.props.validationSchema) : []
    this.getPropertiesNameSchema = this.props.validationSchema ? Object.getOwnPropertyNames(this.props.validationSchema) : []
    this.resetForm = this.resetForm.bind(this)
    this.setErrors = this.setErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setFieldValue = this.setFieldValue.bind(this)
    this.setMultipleFields = this.setMultipleFields.bind(this)
    this.verifyIfIsValidForm = this.verifyIfIsValidForm.bind(this)
    this.runMatchPasswords = this.runMatchPasswords.bind(this)
    this.runValidationErrors = this.runValidationErrors.bind(this)
    this.runValidationSubmit = this.runValidationSubmit.bind(this)
    this.runValidateAllFields = this.runValidateAllFields.bind(this)
    this.runValidationSchemaRules = this.runValidationSchemaRules.bind(this)
  }

  componentDidMount() {
    this.verifyIfIsValidForm()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { values, errors, isValidForm, formHasBeenEdited } = this.state

    const valuesKeys = Object.keys(values)
    const errorsKeys = Object.keys(errors)

    const valuesHasBeenUpdated = valuesKeys.some((key) => values[key] !== nextState.values)
    const errorsHasBeenUpdated = errorsKeys.some((key) => errors[key] !== nextState.errors)

    return (
      valuesHasBeenUpdated ||
      errorsHasBeenUpdated ||
      isValidForm !== nextState.isValidForm ||
      formHasBeenEdited !== nextState.formHasBeenEdited ||
      this.props.needRenderAgain !== nextProps.needRenderAgain
    )
  }

  componentDidUpdate() {
    this.verifyIfIsValidForm()
  }

  // Ejecutar validación en el evento 'onSubmit' del formulario para saber si existen errores
  runValidationSubmit({ errors, extraData = {} }) {
    // Setear errores
    this.setErrors(errors)

    // Si no existen errores en el formulario
    if (isEmptyObject(errors)) {
      // Setear formulario válido
      this.setState({ isValidForm: true, formHasBeenEdited: false })

      // Setear datos adicionales a 'extraData'
      Object.assign(extraData, {
        setFormStatus: this.setState.bind(this),
        formHasBeenEdited: this.state.formHasBeenEdited,
      })

      // Ejecutar evento onSubmit
      if (isFunction(this.props.onSubmit)) {
        this.props.onSubmit({
          values: this.state.values,
          resetForm: this.resetForm,
          extraData: extraData,
          setErrors: this.setErrors,
        })
      }
    }
  }

  // Validar todos los campos
  runValidateAllFields(extraData) {
    const { values } = this.state
    const { validationSchema } = this.props

    if (validationSchema) {
      const schemaErrors = this.getRulesSchema.reduce((acc, _, i) => {
        // Obtener cada campo del esquema
        const field = this.getPropertiesNameSchema[i]
        // Validar reglas del esquema
        const result = this.runValidationSchemaRules(field, values[field])
        return { ...acc, ...result }
      }, {})

      // Validar evento submit
      this.runValidationSubmit({
        errors: schemaErrors,
        extraData: extraData,
      })
    }
  }

  // Validar las reglas del esquema
  runValidationSchemaRules(field, value) {
    // Obtener esquema
    const { validationSchema } = this.props
    // Obtener reglas del campo (required, min, max, etc)
    const fieldRules = validationSchema[field]

    // Comprobar si existe la regla min
    const existMinRule = fieldRules?.min
    const min = existMinRule?.limit
    const minMessage = existMinRule?.message

    // Comprobar si existe la regla max
    const existMaxRule = fieldRules?.max
    const max = existMaxRule?.limit
    const maxMessage = existMaxRule?.message

    // Reglas del esquema
    const rules = {
      name: field,
      value: value,
      required: fieldRules?.required,
      min: {
        limit: min || existMinRule,
        message: existMinRule && (isFunction(minMessage) ? minMessage(min) : minMessage),
      },
      max: {
        limit: max || existMaxRule,
        message: existMaxRule && (isFunction(maxMessage) ? maxMessage(min) : maxMessage),
      },
    }

    // Si existe la regla 'isEmail' en un campo del esquema
    if (fieldRules?.isEmail) {
      // Agregar regla 'isEmail' a todos las reglas
      rules.isEmail = fieldRules?.isEmail

      // Si existe la regla 'isMatchPassword' en un campo del esquema
    } else if (fieldRules?.isMatchPassword) {
      // Obtener campo relacionado
      const relateWithField = this.props.validationSchema[fieldRules.relateWithField]

      // Obtener propiedades del campo relacionado
      rules.required = relateWithField?.required
      rules.min.limit = relateWithField?.min || relateWithField?.min?.limit
      rules.min.message = relateWithField?.min?.message
      rules.max.limit = relateWithField?.max || relateWithField?.max?.limit
      rules.max.message = relateWithField?.max?.message

      // Agregar regla 'isMatchPassword' a todos las reglas
      rules.isMatchPassword = {
        value: this.state.values[fieldRules.relateWithField],
        relateWithField: fieldRules.relateWithField,
      }
    }

    // Validar campos del esquema
    const errors = validateSchemaField(rules)

    // Retornar errores encontrados en un campo
    return errors
  }

  // Validar errores en los campos del esquema
  runValidationErrors(field, errors) {
    const currentErrors = { ...this.state.errors }
    const withOutErrors = isEmptyObject(errors) && isEmptyObject(this.state.errors)

    // Si no existen errores, finalizar validación
    if (withOutErrors) return

    // Si no existen errores, limpiar errores
    if (isEmptyObject(errors)) {
      delete currentErrors[field]
      return this.setErrors(currentErrors)
    }

    // Setear errores
    return this.setErrors({ ...currentErrors, ...errors })
  }

  // Ejecutar validación entre coincidencia de contraseñas
  runMatchPasswords({ password, matchPassword }) {
    // Setear campo
    this.setFieldValue(password.field, password.value)

    const existMatchPassword = !isEmptyString(password.value) && password.value === matchPassword.value

    // Comprobar si las contraseñas coinciden
    if (existMatchPassword) {
      const compressedError = { ...this.state.errors }
      delete compressedError[password.field]
      delete compressedError[matchPassword.field]

      // Setear errores
      this.setErrors(compressedError)
    }
  }

  // Setear un campo
  setFieldValue(field, value) {
    // Destructurar props
    const { validateOnChange, validationSchema } = this.props

    // Nuevo campo
    const newFieldValue = { ...this.state.values, [field]: value }

    // Establecer nuevo estado
    const newState = { values: newFieldValue }

    // Validar formulario cuando se ejecuta el evento 'onChange'
    if (validateOnChange) {
      let errors = {}

      if (validationSchema) {
        // Obtener errores de la validación del esquema
        errors = this.runValidationSchemaRules(field, value)
      }

      this.runValidationErrors(field, errors)
    }

    // Si el formulario no ha sido editado
    if (!this.state.formHasBeenEdited) {
      Object.assign(newState, {
        formHasBeenEdited: true,
      })
    }

    // Actualizar estado
    return this.setState(newState)
  }

  // Setear múltiples campos
  setMultipleFields(fields) {
    // Si no es un objeto el parámetro 'fields'
    if (!isObject(fields)) return

    // Setear nuevos campos
    this.setState({
      formHasBeenEdited: true,
      values: {
        ...this.state.values,
        ...fields,
      },
    })
  }

  // Setear errores
  setErrors(err) {
    if (this.state.errors === err) return

    return this.setState({ errors: err })
  }

  // Método que se ejecuta cuando el formulario es válido
  handleSubmit(e) {
    e.preventDefault()
    return this.runValidateAllFields()
  }

  // Verificar si es formulario válido
  verifyIfIsValidForm() {
    // Recorrer las propiedades del esquema, retornar true si el formulario tiene valores válidos y false cuando tiene información vacía
    const isValidForm = Object.keys(this.props.validationSchema).every((property) => this.state.values[property])

    // Si no existen errores, setear formulario válido
    if (isEmptyObject(this.state.errors) && isValidForm) {
      return !this.state.isValidForm && this.setState({ isValidForm: true })
    } else {
      return this.state.isValidForm && this.setState({ isValidForm: false })
    }
  }

  // Resetear formulario
  resetForm() {
    this.setState({
      errors: {},
      isValidForm: false,
      formHasBeenEdited: false,
      values: this.props.initialValues,
    })
  }

  render() {
    return (
      <form {...this.props.attributes} onSubmit={this.handleSubmit}>
        {this.props.children({
          values: this.state.values,
          setFieldValue: this.setFieldValue,
          setMultipleFields: this.setMultipleFields,
          setFormStatus: this.setState.bind(this),
          errors: this.state.errors,
          setErrors: this.setErrors,
          isValidForm: this.state.isValidForm,
          formHasBeenEdited: this.state.formHasBeenEdited,
          resetForm: this.resetForm,
          runMatchPasswords: this.runMatchPasswords,
          handleSubmit: this.runValidateAllFields,
        })}
      </form>
    )
  }
}

// Renderizar error en formulario
export function renderError(error, color) {
  if (!error) return

  const textColor = isString(color) ? color : 'var(--bg-red)'
  return <Error title={error} color={textColor} />
}

// <------------------------ Extra Components ------------------------>
export class Error extends Component {
  static defaultProps = {
    color: 'var(--bg-darkyellow)',
  }

  constructor(props) {
    super(props)
    this.styles = {
      container: {
        marginTop: 7,
      },
      title: {
        marginLeft: 6,
        lineHeight: 1.3,
        color: this.props.color,
      },
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.title !== nextProps.title
  }

  render() {
    return (
      <span style={this.styles.container} className="error-message d-flex align-items-center">
        <FontAwesomeIcon icon="exclamation-circle" color={this.props.color} />
        <span style={this.styles.title}>{this.props.title}</span>
      </span>
    )
  }
}
