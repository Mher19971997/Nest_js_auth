export const mobileNumberRegex = /^(\+[0-9]{1,3}[- ]?)?[0-9]{9,10}$/;

export const isMobileNumber = (number: string) => {
  return mobileNumberRegex.test(number);
};
