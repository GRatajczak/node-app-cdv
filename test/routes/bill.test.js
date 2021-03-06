const callApi = require('../helpers.js')
const PATH = `api/bill/`;

test(`[DELETE] ${PATH} - bill - DELETE -1 - should delete a single bill`, async () => {
    const response = await callApi("delete", "/bill/1", {}, {}, true);
    expect(response.status).toEqual(204);//tu
});

test(`[POST] ${PATH} - bill - POST - should add a new bill`, async () => {

    const addBill = {
        paidUp: false,
        currency: "USD"
    }

    const response = await callApi("post", "/bill/", addBill, {}, true);
    expect(response.status).toEqual(201); //tu
});

test(`[GET] ${PATH} - bill - GET - all - should return array of bills`, async () => {
    const response = await callApi("get", "/bill/all", {}, {}, true);
    expect(response.status).toEqual(200);
});

test(`[GET] ${PATH} - bill - GET - 1 - should return single bill if exists`, async () => {
  const response = await callApi("get", "/bill/1", {}, {}, true);
  expect(response.status).toEqual(200);
});

test(`[PATCH] ${PATH} - bill - PATCH - should update a bill`, async () => {

    const updateBill = {
        paidUp : true,
        currency: "EUR"
    }

    const response = await callApi("post", "/bill/", updateBill, {}, true);
    expect(response.status).toEqual(201);//tu
    });