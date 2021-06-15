// tests/routes/status.test.js

const callApi = require('../helpers.js')
const PATH = `api/order/all`;

test(`[GET] ${PATH} - valid request - should return array of orders`, async () => {
  const response = await callApi("get", "/order/all", {}, {}, true);
  expect(response.status).toEqual(200);
});

test(`[GET] ${PATH} - valid request - should return single order if exists`, async () => {
  const response = await callApi("get", "/order/8", {}, {}, true);
  expect(response.status).toEqual(200);
});

test(`[POST] ${PATH} - valid request - should return new object`, async () => {
  const response = await callApi("post", "/order/", {}, {}, true);
  expect(response.status).toEqual(200);
});

test(`[DELETE] ${PATH} - valid request - should delete an object and return 'ok'`, async () => {
  const response = await callApi("delete", "/order/9", {}, {}, true);
  expect(response.status).toEqual(200);
});