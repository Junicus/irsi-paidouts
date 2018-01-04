import * as ErrorMessages from './errorMessages';

export const required = (text) => {
  return text ? null : ErrorMessages.isRequired;
}

export const mustContainSomething = (array)=> {
  return array.length > 0 ? null : ErrorMessages.mustContainSomething;
}