// tests/routes/status.test.js

const callApi = require('../helpers.js')
const PATH = `api/order/all`;

test(`[DELETE] ${PATH} - orderedDish - DELETE -1 - should delete an object and return 'ok'`, async () => {
    const response = await callApi("delete", "/orderedDish/1", {}, {}, true);
    expect(response.status).toEqual(204);
});

test(`[DELETE] ${PATH} - orderedDish - DELETE - all - should delete all objects`, async () => {
    const response = await callApi("delete", "/orderedDish/all", {}, {}, true);
    expect(response.status).toEqual(204);
});

//przechodzi
test(`[GET] ${PATH} - orderedDish - GET - all - should return array of orders`, async () => {
  const response = await callApi("get", "/orderedDish/all", {}, {}, true);
  expect(response.status).toEqual(200);
});

//nie przechodzi
test(`[GET] ${PATH} - orderedDish - GET - 1 - should return single orderedDish if exists`, async () => {
  const response = await callApi("get", "/orderedDish/1", {}, {}, true);
  expect(response.status).toEqual(200);
});

//przechodzi
test(`[POST] ${PATH} - orderedDish - POST - should return new object`, async () => {

const testOrderedDishes = {
    orderId : 1,
    billId: 1,
    dishName: 'Rybie nóżki',
    price: 175.49,
    category: 'Owoce morza',
    description: 'test'
}

const response = await callApi("post", "/orderedDish/", testOrderedDishes, {}, true);
expect(response.status).toEqual(201);
});

//przechodzi
test(`[PATCH] ${PATH} - orderedDish - PATCH - should update an object`, async () => {

    const updateOrderedDish = {
        orderId : 1,
        billId: 222,
        dishName: 'Update_test',
        price: 175.49,
        category: 'Update_test',
        description: 'Update_test'
    }

    const response = await callApi("post", "/orderedDish/", updateOrderedDish, {}, true);
    expect(response.status).toEqual(201);
    });