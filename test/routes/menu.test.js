const callApi = require('../helpers.js')
const PATH = `api/menu/`;

// test(`[DELETE] ${PATH} - menu - DELETE -1 - should delete a single position in menu`, async () => {
//     const response = await callApi("delete", "/menu/1", {}, {}, true);
//     expect(response.status).toEqual(204);
// });

// test(`[DELETE] ${PATH} - menu - DELETE - all - should delete all positions in menu`, async () => {
//     const response = await callApi("delete", "/menu/all", {}, {}, true);
//     expect(response.status).toEqual(200);
// });

test(`[POST] ${PATH} - menu - POST - should add a new position in menu`, async () => {

    const addDishToMenu = {
        dishName: "Dish_name_test",
        price_PLN: 10.99,
        category: "Category_test",
        description: "description_test"
    }

    const response = await callApi("post", "/menu/", addDishToMenu, {}, true);
    expect(response.status).toEqual(201);
});

test(`[GET] ${PATH} - menu - GET - all - should return array of menu positions`, async () => {
    const response = await callApi("get", "/menu/all", {}, {}, true);
    expect(response.status).toEqual(200);
});

test(`[GET] ${PATH} - menu - GET - 1 - should return single menu position if exist`, async () => {
  const response = await callApi("get", "/menu/1", {}, {}, true);
  expect(response.status).toEqual(200);
});

test(`[PATCH] ${PATH} - menu - PATCH - should update a menu position`, async () => {

    const updateMenu = {
        dishName: "Dish_name_update",
        price_PLN: 199.99,
        category: "Category_update",
        description: "description_update"
    }

    const response = await callApi("post", "/menu/", updateMenu, {}, true);
    expect(response.status).toEqual(201);
    });