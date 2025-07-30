function validateIndianPhoneNumber(phoneNumber) {
  const hasPlus = phoneNumber.startsWith('+');
  const cleanNumber = phoneNumber.replace(/[\s\-]/g, '');

  const numberForValidation = cleanNumber.replace(/^\+/, '');

  const mobilePattern = /^91[6789]\d{9}$/;

  return hasPlus && mobilePattern.test(numberForValidation);
}

function validatePersonName(name) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return false;
  }

  if (trimmedName.length < 2 || trimmedName.length > 50) {
    return false;
  }

  const namePattern = /^[\p{L}]+(?:[\s\-'.]+[\p{L}]+)*$/u;

  if (!namePattern.test(trimmedName)) {
    return false;
  }

  if (/\s{2,}/.test(trimmedName)) {
    return false;
  }

  if (/\d/.test(trimmedName)) {
    return false;
  }

  return true;
}

function validateIndianPincode(pincode) {
  const cleanPincode = pincode.toString().replace(/[\s\-]/g, '');

  if (!/^\d{6}$/.test(cleanPincode)) {
    return false;
  }
  const firstDigit = parseInt(cleanPincode[0]);
  if (firstDigit === 0) {
    return false;
  }
  return firstDigit >= 1 && firstDigit <= 9;
}

export { validateIndianPhoneNumber, validatePersonName,validateIndianPincode };
