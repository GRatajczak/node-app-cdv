const callApi = require('../helpers.js')
const PATH = `api/set-order/`;

test(`[POST] ${PATH} - setOrder - POST - should add a new Order`, async () => {

    const setNewOrder = {
        table : "3A",
        currency : "PLN",
        dishes : [
            {"id" : 2},
            {"id" : 2},
            {"id" : 2},
            {"id" : 2},
            {"id" : 2},
            {"id" : 2}
    ]
    }

    const response = await callApi("post", "/set-order/", setNewOrder, {}, true);
    expect(response.status).toEqual(200);
});