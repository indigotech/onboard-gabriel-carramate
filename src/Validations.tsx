function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateName(name: string): boolean {
  const re = /^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/;
  return re.test(name);
}

function validateDate(date: string): boolean {
  const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/;
  return re.test(date)
}

function validateYear(date: string): boolean {
  const birthYear = parseInt(date.slice(date.length - 4),10);

  if (birthYear <= 2005) {
    return true
  } else {
    return false
  }
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
    return 'Por favor, digite um formato válido de email.';
  }
};

export const handlePasswordValidation = (password: string) => {
  if (!hasDigit(password)) {
    return 'A senha precisa ter no mínimo 1 dígito.';
  }
  if (!hasLetter(password)) {
    return 'A senha precisa ter no mínimo 1 letra.';
  }
};

export const handleNameValidation = (name: string) => {
  if (!validateName(name)) {
    return 'O nome só pode conter letras.';
  }
};

export const handleDateValidation = (date: string) => {
  if (!validateDate(date)) {
    return 'A data de nascimento precisa ter o formato DD/MM/AAAA.'
  }

  if(!validateYear(date)) {
    return 'O ano de nascimento não pode ser posterior a 2005.'
  }
}

export const handlePhoneValidation = (phone: string) => {
  if (hasLetter(phone)) {
    return 'O telefone só pode conter números.'
  }

  if (phone.length < 8) {
    return 'O telefone precisa ter no mínimo 8 dígitos.'
  }

  if (phone.length > 13) {
    return 'O telefone não pode ter mais do que 13 dígitos'
  }
}
