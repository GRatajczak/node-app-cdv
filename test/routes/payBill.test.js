const callApi = require('../helpers.js')
const PATH = `api/pay-bill/`;

test(`[PUT] ${PATH} - payBill - PUT - should update a single bill`, async () => {

    const payBill = {
        paidUp: true,
        currency: "PLN"
    }

    const response = await callApi("patch", "/pay-bill/", payBill, {}, true);
    expect(response.status).toEqual(201); 
});