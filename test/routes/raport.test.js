const callApi = require('../helpers.js')
const PATH = `api/raport/`;

test(`[GET] ${PATH} - raport - 1 - should return a report from date to date`, async () => {

    const getReport = {
        dateStart : "2020-06-19T06:00:32.212Z",
        dateEnd: "2021-06-20T06:00:32.212Z"
    }

  const response = await callApi("get", "/raport/", getReport, {}, true);
  expect(response.status).toEqual(200);
});