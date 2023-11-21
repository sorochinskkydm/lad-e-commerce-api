import express from 'express';
import * as UserController from './controllers/UserController.js';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello kitty');
});

//Auth&Register routes
app.post('/auth/register', UserController.registerController);
app.post('/auth/login', UserController.authController);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});