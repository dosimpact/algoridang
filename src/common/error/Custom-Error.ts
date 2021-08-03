export class AlreadyExistError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class PasswordWrongError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
