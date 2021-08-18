// 404 — карточка или пользователь не найден, или был запрошен несуществующий роут;
class Error404 extends Error {
  constructor(message = 'страница не найдена') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = Error404;
