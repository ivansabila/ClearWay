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

    static async show(id) {
        const query = "SELECT * FROM users WHERE id = $1";

        let data = await db.query(query, [id]);

        return data.rows[0];
    }

    static async update(objUser) {
        const checkQuery = "SELECT * FROM users WHERE nik = $2 AND id <> $1";
        const query = "UPDATE users SET nik = $2, full_name = $3, birthplace = $4, birthdate = $5, address = $6, district = $7, subdistrict = $8, religion = $9, job = $10, ktp = $11 WHERE id = $1";

        let arrData = [objUser.id, objUser.nik, objUser.full_name, objUser.birthplace, objUser.birthdate, objUser.address, objUser.district, objUser.subdistrict, objUser.religion, objUser.job, objUser.ktp];

        let check = await db.query(checkQuery, [objUser.id, objUser.nik]);

        if (check.rows.length > 0) {
            let error = "Isi NIK anda dengan benar";
            return error;
        } else {
            arrData[2] = capitalize(arrData[2]);
            arrData[3] = capitalize(arrData[3]);
            arrData[5] = capitalize(arrData[5]);

            await db.query(query, arrData);
        }

    }
}

module.exports = User;
