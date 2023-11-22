import express from 'express';
import * as UserController from './controllers/UserController.js';
import * as GoodsController from './controllers/GoodsController.js';
import * as CustomersController from './controllers/CustomersController.js';

import checkAuth from './utils/checkAuth.js';
import checkRole from './utils/checkRole.js';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello kitty');
});

//Auth&Register routes
app.post('/api/auth/register', UserController.registerController);
app.post('/api/auth/login', checkAuth, UserController.authController);
app.get('/api/users/me', checkAuth, UserController.getMeController);

//Admin customers routes
app.get('/api/customers', checkAuth, checkRole, CustomersController.getCustomers);
app.get('/api/customers/:id', checkAuth, checkRole, CustomersController.getCustomerById);
app.put('/api/customers/:id', checkAuth, checkRole, CustomersController.updateCustomer);
app.delete('/api/customers/:id', checkAuth, checkRole, CustomersController.deleteCustomer);

//Goods routes
app.get('/api/goods', GoodsController.getGoods);
app.get('/api/goods/:id', GoodsController.getGoodById);

//Admin goods routes
app.post('/api/goods', checkAuth, checkRole, GoodsController.addGoods);
app.put('/api/goods/:id', checkAuth, checkRole, GoodsController.updateGoods);
app.delete('/api/goods/:id', checkAuth, checkRole, GoodsController.removeGoods);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
