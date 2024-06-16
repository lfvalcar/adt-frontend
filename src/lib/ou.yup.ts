import * as yup from 'yup';

const createOusSchema = yup.object().shape({
  ou: yup
    .string()
    .min(2, 'Unidad Organizativa debe tener al menos 2 caracteres')
    .required('Unidad Organizativa es obligatorio'),

  description: yup
    .string()
    .optional()
});

export default createOusSchema;
