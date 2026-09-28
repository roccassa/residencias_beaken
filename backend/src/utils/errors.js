export class HttpError extends Error {
  constructor(status, message, campos) {
    super(message)
    this.status = status
    this.campos = campos
  }
}
