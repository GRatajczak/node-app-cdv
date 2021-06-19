const callApi = require('../helpers.js')
const PATH = `api/order/`;

test(`[DELETE] ${PATH} - order - DELETE - 1 - should delete an object and return 'ok'`, async () => {
  const response = await callApi("delete", "/order/1", {}, {}, true);
  expect(response.status).toEqual(204);
});

test(`[GET] ${PATH} - order - -GET - all - should return array of orders`, async () => {
  const response = await callApi("get", "/order/all", {}, {}, true);
  expect(response.status).toEqual(200);
});

test(`[GET] ${PATH} - order - GET - 1 - should return single order if exists`, async () => {
  const response = await callApi("get", "/order/?id=1", {}, {}, true);
  expect(response.status).toEqual(200);
});

test(`[POST] ${PATH} - order - POST - should return new object`, async () => {

  const testOrder = {
    orderDate: new Date(),
    payDate: new Date(),
    status: 'Do zapłacenia',
    table: '4'
  }

  const response = await callApi("post", "/order/", testOrder, {}, true);
  expect(response.status).toEqual(201);//tu
});

test(`[PATCH] ${PATH} - order - PATCH - should update an object`, async () => {

  const updateDish = {
    status: 'Zapłacono',
    table: '5',
    currency: 'test'
  }

  const response = await callApi("patch", "/orderedDish/", updateDish, {}, true);
  expect(response.status).toEqual(204);
  });