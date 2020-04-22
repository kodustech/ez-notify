const required = value => !!value || 'Value required';

const minLength = (value, length) => (value && value.length >= length) || `Min ${length} characters`;

const emailValidation = value => /.+@.+\..+/.test(value) || 'E-mail must be valid';

const startsWith = (value, start) => (value && value.startsWith(start)) || `Input not start with ${start}`;

export {
  required,
  minLength,
  emailValidation,
  startsWith
}
