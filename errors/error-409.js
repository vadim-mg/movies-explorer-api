// 409 — при регистрации указан email, который уже существует на сервере;
class Error409 extends Error {
  constructor(message = 'не уникальное значение') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = Error409;
