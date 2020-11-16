// Check validation
export const checkValidity = (value, rules) => {
  let isValid = true;
  // Check that the field is not empty
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  // Check min length
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  // Check max length
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  // Check email
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  //  Check numeric
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
