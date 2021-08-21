// 403 — попытка удалить чужую карточку;
class Error403 extends Error {
  constructor(message = 'не достаточно прав доступа') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = Error403;
