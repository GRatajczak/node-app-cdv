const callApi = require('../helpers.js')
const PATH = `api/set-order/`;

test(`[POST] ${PATH} - setOrder - POST - should add a new Order`, async () => {

    const setNewOrder = {
        table : 4,
        currency : "USD",
        dishes : [
            {id : 1},
            {id : 1},
            {id : 1},
            {id : 1},
            {id : 1},
            {id : 1}
    ]
    }

    const response = await callApi("post", "/set-order/", setNewOrder, {}, true);
    expect(response.status).toEqual(200);
});