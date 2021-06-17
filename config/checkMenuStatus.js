const db = require("../models/index");
const Menu = db.menu;

const menuIsCompleted = async () => {
    let menuIsCompleted  = await Menu.findAll({})
    return menuIsCompleted.length >= 12
}

module.exports = menuIsCompleted;