export const emailValidator = {
  lengthValdator: (value: string) => value?.split('@')?.[0].length <= 40,
  validationMessage: 'The maximum length of email domain exceeded'
}
