import jwt from 'jsonwebtoken';

export default async (request, response, next) => {
  const token = (request.headers.authorization || '').replace(/Bearer\s/, '');
  if (token) {
    try {
      const decodedToken = jwt.verify(token, 'someDifficultKey');
      if (decodedToken.role == 2) next();
      else
        return response.status(403).json({
          message: 'Отказано в доступе',
        });
    } catch (error) {
      console.log(error);
      return response.status(403).json({
        message: 'Ошибка токена',
      });
    }
  } else {
    return response.status(403).json({
      message: 'Что-то пошло не так',
    });
  }
};
