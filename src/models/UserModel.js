const db = require("../config/connection");
const bcrypt = require("bcrypt");
const capitalize = require("../utils/capitalize");

const saltRounds = 10;

class User {
    constructor(id, full_name, email, phone, password) {
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    static async add(objUser) {
        let error = {};

        const checkQuery = "SELECT * FROM users WHERE email = $1 LIMIT 1";
        const insertQuery = "INSERT INTO users (full_name, email, phone, password, image, role) VALUES ($1, $2, $3, $4, $5, $6)";

        let arrData = [objUser.full_name, objUser.email, objUser.phone, objUser.password, objUser.image, objUser.role];

        let check = await db.query(checkQuery, [arrData.email]);

        if (check.rows.length > 0) {
            error.email = "Akun yang anda masukkan sudah ada";
            return error;
        } else {
            arrData[3] = await bcrypt.hash(objUser.password, saltRounds);

            arrData[0] = capitalize(arrData[0]);

            arrData[2] = arrData[2].replace("+62", "0");

            await db.query(insertQuery, arrData);
        }
    }

    static async authN(objUser) {
        let user;
        let error;

        const query = "SELECT * FROM users WHERE (full_name = $1 OR email = $1) LIMIT 1";

        if (!objUser.user.includes("@")) {
            objUser.user = capitalize(objUser.user);
        }

        const userData = await db.query(query, [objUser.user]);

        if (userData.rows.length > 0) {
            user = userData.rows[0];

            const passwordMatch = await bcrypt.compare(objUser.password, user.password);

            if (!passwordMatch) {
                error = "Masukkan akun anda dengan benar";
                return { user, error };
            } else {
                return { user, error };
            }
        } else {
            error = "Akun anda tidak ditemukan, silahkan daftar terlebih dahulu";
            return { user, error };
        }
    }
}

module.exports = User;
