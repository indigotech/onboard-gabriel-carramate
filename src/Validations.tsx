function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function hasDigit(password: string): boolean {
  const hasDigits = password.split('').some((c) => {
    const isDigit = !isNaN(Number(c));
    return isDigit;
  });
  return hasDigits;
}

function hasLetter(password: string): boolean {
  const hasLetters = password.split('').some((c) => {
    const isLetter = isNaN(Number(c));
    return isLetter;
  });
  return hasLetters;
}

export const handleEmailValidation = (email: string) => {
  if (!validateEmail(email)) {
    return 'Por favor, digite um formato válido de email';
  }
};

export const handlePasswordValidation = (password: string) => {
  if (!hasDigit(password)) {
    return 'A senha precisa ter no mínimo 1 dígito';
  }
  if (!hasLetter(password)) {
    return 'A senha precisa ter no mínimo 1 letra';
  }
};
