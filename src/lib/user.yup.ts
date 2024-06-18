import * as yup from 'yup';

export const schema = yup.object().shape({
  uid: yup
    .string()
    .max(32, 'El nombre de usuario debe tener como máximo 32 caracteres')
    .min(2, 'El nombre de usuario debe tener al menos 2 caracteres')
    .required('El nombre de usuario es obligatorio')
    .matches(/^[A-Za-z]+$/, 'El nombre de usuario debe contener solo letras'),
  ou: yup
    .string()
    .min(2, 'La unidad organizativa debe tener al menos 2 caracteres')
    .max(16, 'La unidad organizativa debe tener como máximo 16 caracteres')
    .required('La unidad organizativa es obligatoria')
    .matches(/^[A-Za-z]+$/, 'La unidad organizativa debe contener solo letras'),
  givenName: yup
    .string()
    .matches(/^[A-Za-z ]+$/, 'El nombre debe contener solo letras y espacios')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre debe tener como máximo 50 caracteres')
    .required('El nombre es obligatorio'),
  sn: yup
    .string()
    .matches(/^[A-Za-z ]+$/, 'Los apellidos deben contener solo letras y espacios')
    .min(3, 'Los apellidos deben tener al menos 3 caracteres')
    .max(50, 'Los apellidos deben tener como máximo 50 caracteres')
    .required('Los apellidos son obligatorios'),
  cn: yup
    .string()
    .matches(/^[A-Za-z ]+$/, 'El nombre completo debe contener solo letras y espacios')
    .min(6, 'El nombre completo debe tener al menos 6 caracteres')
    .max(100, 'El nombre completo debe tener como máximo 100 caracteres')
    .required('El nombre completo es obligatorio'),
  userPassword: yup
    .string()
    .min(12, 'La contraseña debe tener al menos 12 caracteres')
    .required('La contraseña es obligatoria')
    .matches(/(?=.*[a-z])/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/(?=.*[A-Z])/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/(?=.*\d)/, 'La contraseña debe contener al menos un número')
    .matches(/(?=.*[@$!%*?{}&])/, 'La contraseña debe contener al menos un carácter especial'),
  mail: yup
    .string()
    .email('Formato de correo electrónico no válido')
    .required('El correo electrónico es obligatorio'),
  mobile: yup
    .string()
    .length(11, 'El número de teléfono móvil debe tener exactamente 11 caracteres')
    .required('El número de teléfono móvil es obligatorio'),
  st: yup
    .string()
    .matches(/^[A-Za-z ]+$/, 'La provincia debe contener solo letras y espacios')
    .min(3, 'La provincia debe tener al menos 3 caracteres')
    .required('La provincia es obligatoria'),
  title: yup
    .string()
    .matches(/^[A-Za-z0-9 ]+$/, 'El rol debe contener solo letras,espacios y números')
    .min(3, 'El rol debe tener al menos 3 caracteres')
    .required('El rol es obligatorio'),
  l: yup
    .string()
    .matches(/^[A-Za-z ]+$/, 'La localidad debe contener solo letras y espacios')
    .min(3, 'La localidad debe tener al menos 3 caracteres')
    .required('La localidad es obligatoria'),
  group: yup
    .string()
    .optional()
    .nullable()
    .matches(/^[A-Za-z]+$/, 'El grupo principal debe contener solo letras'),
  telephoneNumber: yup
    .string(),
  description: yup
    .string(),
});

  