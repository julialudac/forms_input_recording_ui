
function validateForm(toValidate) {
  if (Object.keys(toValidate).length != 2)
    return false;
  if (!('title' in toValidate) || typeof toValidate['title'] != 'string')
    return false;
  if (!('questions' in toValidate) || !Array.isArray(toValidate['questions']))
    return false;
  return true;
}

exports.validateForm = validateForm;
