export const isValidPhone = (value: string) => {
  const regex = new RegExp('^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$');

  if (!regex.test(value)) {
    return 'Formato de telefone inválido';
  }
};
