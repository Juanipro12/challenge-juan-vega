export function validateDocumentNumber(documentNumber: string, documentType: string): boolean {
  if (documentType === 'cedula') {
    return validateCedula(documentNumber);
  } else if (documentType === 'ruc') {
    return validateRuc(documentNumber);
  } else if (documentType === 'passport') {
    return true;
  }
  return false;
}

function validateCedula(cedula: string): boolean {
  return /^[0-9]{10}$/.test(cedula);
}

function validateRuc(ruc: string): boolean {
  return /^[0-9]{13}$/.test(ruc);
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  const normalizedPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');

  const phoneNumberPattern = /^\+?\d+$/;

  return phoneNumberPattern.test(normalizedPhoneNumber);
}
