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
        const query =
            "INSERT INTO books (id_user, title, description, status, participant, event, location, district, subdistrict, startdate, enddate, starttime, endtime, user_letter) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10, $11, $12, $13, $14)";

        let arrData = [
            objUser.id_user,
            objUser.title,
            objUser.description,
            objUser.status,
            objUser.participant,
            objUser.event,
            objUser.location,
            objUser.district,
            objUser.subdistrict,
            objUser.startdate,
            objUser.enddate,
            objUser.starttime,
            objUser.endtime,
            objUser.user_letter,
        ];

        arrData[1] = capitalize(arrData[1]);
        arrData[3] = capitalize(arrData[3]);

        await db.query(query, arrData);
    }

    static async show(id) {
        const query = "SELECT * FROM books WHERE (status = 'Menunggu' OR status = 'Kelurahan') AND id_user = $1";

        let data = await db.query(query, [id]);

        return data.rows;
    }

    static async detail(objUser) {
        const query = "SELECT * FROM books WHERE id_user = $1 AND id = $2 LIMIT 1";

        let arrData = [objUser.id, objUser.idbook];

        let data = await db.query(query, arrData);

        return data.rows[0];
    }

    static async all_subdistrict(objUser) {
        const query = "SELECT * FROM books WHERE subdistrict = $1 AND status = 'Menunggu'";

        let data = await db.query(query, [objUser.subdistrict]);

        return data.rows;
    }

    static async show_subdistrict(id) {
        const query = "SELECT * FROM books WHERE id = $1";

        let data = await db.query(query, [id]);

        return data.rows[0];
    }

    static async update_reject(objUser) {
        const query = "UPDATE books SET status = $2 WHERE id = $1";

        const arrData = [objUser.idbook, objUser.status];

        arrData[1] = capitalize(arrData[1]);

        await db.query(query, arrData);
    }

    static async update_accept(objUser) {
        const query = "UPDATE books SET status = $2, district_letter = $3 WHERE id = $1";

        const arrData = [objUser.idbook, objUser.status, objUser.user_letter];

        arrData[1] = capitalize(arrData[1]);

        await db.query(query, arrData);
    }

    static async show_history(id) {
        const query = "SELECT * FROM books WHERE (status = 'Ditolak' OR status = 'Diterima') AND id_user = $1";

        let data = await db.query(query, [id]);

        return data.rows;
    }

    static async show_district_history(subdistrict) {
        const query = "SELECT * FROM books WHERE status <> 'Menunggu' AND subdistrict = $1";

        let data = await db.query(query, [subdistrict]);

        return data.rows;
    }

    static async all_admin(objUser) {
        const query = "SELECT * FROM books WHERE status = 'Kelurahan'";

        let data = await db.query(query);

        return data.rows;
    }

    static async update_accept_admin(objUser) {
        const query = "UPDATE books SET status = $2 WHERE id = $1";

        const arrData = [objUser.idbook, objUser.status];

        arrData[1] = capitalize(arrData[1]);

        await db.query(query, arrData);
    }

    static async show_admin_history() {
        const query = "SELECT * FROM books WHERE status <> 'Menunggu' AND district_letter <> 'null'";

        let data = await db.query(query);

        return data.rows;
    }
}

module.exports = Book;
