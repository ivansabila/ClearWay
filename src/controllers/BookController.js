const Book = require("../models/BookModel");
const User = require("../models/UserModel");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const { time } = require("console");

class BookController {
    static async index(req, res) {
        res.render("./user/userBook", { error: {}, oldData: {}, active: "book" });
    }

    static async store(req, res) {
        const { title, description, participant, event, location, district, subdistrict, startdate, enddate, starttime, endtime } = req.body;
        const { id } = req.params;
        let timeline = "";

        let monthname = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jul", "Jun", "Agu", "Sep", "Okt", "Nov", "Des"];
        if (enddate) {
            var start = startdate.split("-");
            var end = enddate.split("-");

            start[1] = start[1].split("")[0] == 0 ? start[1].split("")[1] : start[1];
            end[1] = end[1].split("")[0] == 0 ? end[1].split("")[1] : end[1];

            if (start[0] == end[0]) {
                if (start[1] == end[1]) {
                    timeline = `${start[2]} - ${end[2]} ${monthname[start[1] - 1]} ${start[0]}`;
                } else {
                    timeline = `${start[2]} ${monthname[start[1] - 1]} - ${end[2]} ${monthname[end[1] - 1]} ${start[0]}`;
                }
            } else {
                timeline = `${start[2]} ${monthname[start[1] - 1]} ${start[0]} - ${end[2]} ${monthname[end[1] - 1]} ${end[0]}`;
            }
        } else {
            var date = startdate.split("-");
            date[1] = date[1].split("")[0] == 0 ? date[1].split("")[1] : date[1];

            timeline = `${date[2]} ${monthname[date[1] - 1]} ${date[0]}`;
        }

        const datauser = await User.show_subdistrict(id);

        const filename = `${Date.now()}.pdf`;
        const pdfPath = path.join(__dirname, "../../uploads/letters", filename);

        const doc = new PDFDocument({ size: "A4" });
        doc.pipe(fs.createWriteStream(pdfPath));

        doc.fontSize(16).font("Times-Bold").text("SURAT IZIN PENGAJUAN PEMAKAIAN JALAN", {
            align: "center",
            underline: 1,
        });

        doc.fontSize(12).font("Times-Roman").text("Kepada Yth:", 40, 120).moveDown(0).text(`Ketua Kelurahan ${subdistrict}`).moveDown(0).text("Kota Baubau").moveDown(0).text("Di -").moveDown(0).text("Tempat", 60).moveDown();

        doc.fontSize(12).font("Times-Roman").text("Dengan Hormat", 40).moveDown();

        doc.fontSize(12)
            .font("Times-Roman")
            .text("Saya yang bermohon dibawah ini:", 40)
            .moveDown(0)
            .text("NIK", {
                continued: true,
            })
            .text(`: ${datauser.nik}`, 100)
            .moveDown(0)
            .text("Nama", {
                continued: true,
            })
            .text(`: ${datauser.full_name}`, 92)
            .moveDown(0)
            .text("Alamat", {
                continued: true,
            })
            .text(`: ${datauser.address}`, 86)
            .moveDown(0)
            .text("Pekerjaan", {
                continued: true,
            })
            .text(`: ${datauser.job}`, 74)
            .moveDown();

        doc.fontSize(12).font("Times-Roman").text("Bersama ini saya mengajukan permohonan pemakaian dan pengalihan Jalan berkaitan dengan rencana kegiatan yang akan saya laksanakan. Adapun detailnya sebagai berikut:", 40).moveDown();

        doc.fontSize(12)
            .font("Times-Roman")
            .text("1.", {
                continued: true,
            })
            .text("  Lokasi", {
                continued: true,
            })
            .text(`: ${location.split("|")[2].split(",")[0]}`, 180)
            .moveDown(0)
            .text("2.", {
                continued: true,
            })
            .text("  Tujuan Permohonan Keperluan", {
                continued: true,
            })
            .text(`: ${event}`, 63)
            .moveDown(0)
            .text("3.", {
                continued: true,
            })
            .text("  Waktu Rencana Kegiatan", {
                continued: true,
            })
            .text(`: ${timeline}`, 92)
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
            .text(`${datauser.full_name}`, {
                align: "right",
                underline: 1,
            });

        doc.end();

        const id_user = req.session.user.id;
        const status = "menunggu";
        const user_letter = `/uploads/letters/${filename}`;
        const objUser = { id_user, title, description, status, participant, event, location, district, subdistrict, startdate, enddate, starttime, endtime, user_letter };

        const data = await Book.add(objUser);

        req.session.user.message = "Pembuatan izin pengajuan berhasil";

        return res.redirect("/");
    }

    static async show(req, res) {
        const { id, idbook } = req.params;
        const objUser = { id, idbook };

        if (id == req.session.user.id) {
            const data = await Book.detail(objUser);
            console.log("🚀 ~ BookController ~ show ~ data:", data);

            res.render("./user/userBookDetail", { data: data, active: "book" });
        } else {
            res.redirect(`/book/${req.session.user.id}/detail/${idbook}`);
        }
    }
}

module.exports = BookController;
