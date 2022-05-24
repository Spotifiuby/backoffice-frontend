function fromCamelToSnake(text) {
  return text.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function fromSnakeToCamel(text) {
  return text.toLowerCase().replace(/([_][a-z])/g, letter =>
      letter.toUpperCase().replace('_', '')
  );
}

const usersFilters = ['email', 'firstName', 'lastName', 'userType', 'isActive'];

export const Utils = {
  fromCamelToSnake,
  fromSnakeToCamel,
  usersFilters
}