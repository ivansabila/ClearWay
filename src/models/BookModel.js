const db = require("../config/connection");
const capitalize = require("../utils/capitalize");

class Book {
    constructor(id, full_name, email, phone, password) {
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    static async add(objUser) {
        const query = "INSERT INTO books (id_user, title, description, status, participant, event, location, startdate, enddate, starttime, endtime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10, $11)";

        let arrData = [objUser.id_user, objUser.title, objUser.description, objUser.status, objUser.participant, objUser.event, objUser.location, objUser.startdate, objUser.enddate, objUser.starttime, objUser.endtime];

        arrData[1] = capitalize(arrData[1]);
        arrData[3] = capitalize(arrData[3]);

        await db.query(query, arrData);
    }

    static async show(id) {
        const query = "SELECT * FROM books WHERE id_user = $1";

        let data = await db.query(query, [id]);

        return data.rows;
    }

    static async detail(objUser) {
        const query = "SELECT * FROM books WHERE id_user = $1 AND id = $2 LIMIT 1";

        let arrData = [objUser.id, objUser.idbook];

        let data = await db.query(query, arrData);

        return data.rows[0];
    }
}

module.exports = Book;
