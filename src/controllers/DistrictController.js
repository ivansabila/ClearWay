const Book = require("../models/BookModel");
const User = require("../models/UserModel");
const capitalize = require("../utils/capitalize");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

class DistrictController {
    static async index(req, res) {
        // const subdistrict = req.session.user.email.split("@")[0];
        const subdistrict = capitalize(req.session.user.email.split("@")[0]);
        const today = new Date();

        const objUser = { subdistrict, today };

        const data = await Book.all_subdistrict(objUser);

        let monthname = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jul", "Jun", "Agu", "Sep", "Okt", "Nov", "Des"];
        data.forEach((item) => {
            var loc = item.location.split("|").splice(-1);
            item.location = loc[0].split(", ")[0];

            if (item.enddate) {
                var start = item.startdate.split("-");
                var end = item.enddate.split("-");

                start[1] = start[1].split("")[0] == 0 ? start[1].split("")[1] : start[1];
                end[1] = end[1].split("")[0] == 0 ? end[1].split("")[1] : end[1];

                if (start[0] == end[0]) {
                    if (start[1] == end[1]) {
                        item.date = `${start[2]} - ${end[2]} ${monthname[start[1] - 1]} ${start[0]}`;
                    } else {
                        item.date = `${start[2]} ${monthname[start[1] - 1]} - ${end[2]} ${monthname[end[1] - 1]} ${start[0]}`;
                    }
                } else {
                    item.date = `${start[2]} ${monthname[start[1] - 1]} ${start[0]} - ${end[2]} ${monthname[end[1] - 1]} ${end[0]}`;
                }
            } else {
                var date = item.startdate.split("-");
                date[1] = date[1].split("")[0] == 0 ? date[1].split("")[1] : date[1];

                item.date = `${date[2]} ${monthname[date[1] - 1]} ${date[0]}`;
            }
        });

        let message = req.session.user.message;
        req.session.user.message = null;

        res.render("./district/districtDashboard", { message: message, data: data, active: "book" });
    }

    static async show(req, res) {
        const { idbook } = req.params;

        const data = await Book.show_subdistrict(idbook);
        const datauser = await User.show_subdistrict(data.id_user);

        res.render("./district/districtBook", { data: data, datauser: datauser, active: "book" });
    }

    static async checked(req, res) {
        const { idbook } = req.params;
        const { action } = req.body;

        if (action == "reject") {
            const status = "ditolak";
            const objUser = { idbook, status };

            req.session.user.message = "Izin Pengajuan Anda Ditolak";

            await Book.update_reject(objUser);
        } else if (action == "accept") {
            const filename = `${Date.now()}.pdf`;
            const pdfPath = path.join(__dirname, "../../uploads/letters", filename);

            const doc = new PDFDocument({ size: "A4" });
            doc.pipe(fs.createWriteStream(pdfPath));

            doc.fontSize(16).font("Times-Bold").text("SURAT IZIN PENGAJUAN PEMAKAIAN JALAN", {
                align: "center",
                underline: 1,
            });

            doc.fontSize(12).font("Times-Roman").text("Kepada Yth:", 40, 120).moveDown(0).text(`Kepala Dinas Perhubungan`).moveDown(0).text("Kota Baubau").moveDown(0).text("Di -").moveDown(0).text("Tempat", 60).moveDown();

            doc.fontSize(12).font("Times-Roman").text("Dengan Hormat", 40).moveDown();

            doc.fontSize(12)
                .font("Times-Roman")
                .text(
                    "Sehubungan dengan akan dilaksanakan kegiatan Syncronize Festival, maka kami dari Kelurahan Tanganapada mengajukan permohonan pemakaian dan pengalihan Jalan berkaitan dengan rencana kegiatan yang akan dilaksanakan.",
                    40
                )
                .moveDown();

            doc.fontSize(12)
                .font("Times-Roman")
                .text("1.", {
                    continued: true,
                })
                .text("  Lokasi", {
                    continued: true,
                })
                .text(`: a`, 180)
                .moveDown(0)
                .text("2.", {
                    continued: true,
                })
                .text("  Tujuan Permohonan Keperluan", {
                    continued: true,
                })
                .text(`: a`, 63)
                .moveDown(0)
                .text("3.", {
                    continued: true,
                })
                .text("  Waktu Rencana Kegiatan", {
                    continued: true,
                })
                .text(`: a`, 92)
                .moveDown();

            doc.fontSize(12).font("Times-Roman").text("Demikian permohonan ini kami sampaikan untuk mendapatkan perhatian dan persetujuan, atas perhatiannya kami ucapkan terima kasih.", 40).moveDown().moveDown().moveDown();

            doc.fontSize(12)
                .font("Times-Roman")
                .text("Hormat Kami", {
                    align: "right",
                })
                .moveDown()
                .moveDown()
                .moveDown()
                .moveDown()
                .text(`a`, {
                    align: "right",
                    underline: 1,
                });

            doc.end();

            const status = "kelurahan";
            const user_letter = `/uploads/letters/${filename}`;
            const objUser = { idbook, status, user_letter };

            req.session.user.message = "Izin Pengajuan Anda Diterima";

            await Book.update_accept(objUser);
        }

        res.redirect("/district");
    }

    static async history(req, res) {
        const subdistrict = capitalize(req.session.user.email.split("@")[0]);

        const data = await Book.show_district_history(subdistrict);

        let monthname = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jul", "Jun", "Agu", "Sep", "Okt", "Nov", "Des"];
        data.forEach((item) => {
            var loc = item.location.split("|").splice(-1);
            item.location = loc[0].split(", ")[0];

            if (item.enddate) {
                var start = item.startdate.split("-");
                var end = item.enddate.split("-");

                start[1] = start[1].split("")[0] == 0 ? start[1].split("")[1] : start[1];
                end[1] = end[1].split("")[0] == 0 ? end[1].split("")[1] : end[1];

                if (start[0] == end[0]) {
                    if (start[1] == end[1]) {
                        item.date = `${start[2]} - ${end[2]} ${monthname[start[1] - 1]} ${start[0]}`;
                    } else {
                        item.date = `${start[2]} ${monthname[start[1] - 1]} - ${end[2]} ${monthname[end[1] - 1]} ${start[0]}`;
                    }
                } else {
                    item.date = `${start[2]} ${monthname[start[1] - 1]} ${start[0]} - ${end[2]} ${monthname[end[1] - 1]} ${end[0]}`;
                }
            } else {
                var date = item.startdate.split("-");
                date[1] = date[1].split("")[0] == 0 ? date[1].split("")[1] : date[1];

                item.date = `${date[2]} ${monthname[date[1] - 1]} ${date[0]}`;
            }
        });

        res.render("./district/districtHistory", { data: data, active: "history" });
    }

    static async users(req, res) {
        const subdistrict = capitalize(req.session.user.email.split("@")[0]);

        const data = await User.show_district_users(subdistrict);

        res.render("./district/districtUsers", { data: data, subdistrict: subdistrict, active: "users" });
    }
}

module.exports = DistrictController;
