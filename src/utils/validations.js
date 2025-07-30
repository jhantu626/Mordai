function validateIndianPhoneNumber(phoneNumber) {
    const hasPlus = phoneNumber.startsWith('+');
    const cleanNumber = phoneNumber.replace(/[\s\-]/g, '');
    
    const numberForValidation = cleanNumber.replace(/^\+/, '');
    
    const mobilePattern = /^91[6789]\d{9}$/;
    
    return hasPlus && mobilePattern.test(numberForValidation);
}


export {validateIndianPhoneNumber}