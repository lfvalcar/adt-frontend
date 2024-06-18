import * as yup from 'yup';

const createGroupSchema = yup.object().shape({
  cn: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Nombre debe contener solo letras')
    .min(4, 'Nombre debe tener al menos 4 caracteres')
    .max(24, 'Nombre debe tener como máximo 24 caracteres')
    .required('Nombre es obligatorio'),

  ou: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Unidad Organizativa debe contener solo letras')
    .min(4, 'Unidad Organizativa debe tener al menos 4 caracteres')
    .max(16, 'Unidad Organizativa debe tener como máximo 16 caracteres')
    .required('Unidad Organizativa es obligatorio'),

  description: yup
    .string()
    .optional(),
  
  memberUid: yup
    .string()
    .optional()
});

export default createGroupSchema;
