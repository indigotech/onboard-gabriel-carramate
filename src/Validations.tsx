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
  const re = /^((((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[13578]|10|12)([-])(0[1-9]|[12][0-9]|3[01]))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[469]|11)([-])([0][1-9]|[12][0-9]|30))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(02)([-])(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)([-])(02)([-])(29))|(([13579][26]00)([-])(02)([-])(29))|(([0-9][0-9][0][48])([-])(02)([-])(29))|(([0-9][0-9][2468][048])([-])(02)([-])(29))|(([0-9][0-9][13579][26])([-])(02)([-])(29)))$/;
  return re.test(date)
}

function validateYear(date: string): boolean {
  const birthYear = parseInt(date.substring(0, 4),10);

  if (birthYear >= 1900 && birthYear <= 2005) {
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
    return 'A data de nascimento precisa ter o formato AAAA-MM-DD.'
  }

  if(!validateYear(date)) {
    return 'O ano de nascimento precisa estar entre 1900 e 2005.'
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
