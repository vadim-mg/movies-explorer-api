// 500 — внутренняя ошибка сервера;
class Error500 extends Error {
  constructor(message = 'ошибка на сервере') {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = Error500;
