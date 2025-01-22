const validateBookMiddleware = (req, res, next) => {
    // destructure body and create "objUser" object
    console.log(req.body);

    const { title, description, participant, event, location, startdate, enddate, starttime, endtime } = req.body;
    const objUser = { title, description, participant, event, location, startdate, enddate, starttime, endtime };

    // create "errors" object
    let error = {};

    const participantRegex = /^[0-9]+$/;
    if (!participantRegex.test(objUser.participant)) {
        error.participant = "Isi jumlah peserta dalam bentuk angka dengan benar ";
    }

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let dateStart = new Date(objUser.startdate);

    if (dateStart < today) {
        error.startdate = "Tanggal yang anda masukkan sudah lewat";
    } else {
        const diffInTime = dateStart - today;
        const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
        if (diffInDays < 7) {
            error.startdate = "Izin pengajuan harus 7 hari sebelum waktu pelaksanaan";
        }
    }

    if (objUser.enddate !== null) {
        let dateEnd = new Date(objUser.enddate);
        let yearCheck = dateEnd.getFullYear() - dateStart.getFullYear();
        if (yearCheck < 0) {
            error.enddate = "Isi tanggal akhir pengajuan dengan benar";
        } else {
            let monthCheck = dateEnd.getMonth() - dateStart.getMonth();
            if (monthCheck < 0) {
                error.enddate = "Isi tanggal akhir pengajuan dengan benar";
            } else {
                let dayCheck = dateEnd.getDate() - dateStart.getDate();
                if (dayCheck < 0 && monthCheck == 0) {
                    error.enddate = "Isi tanggal akhir pengajuan dengan benar";
                }
            }
        }
    }

    // check data in "error" object
    if (Object.keys(error).length) {
        console.log({ error: error, oldData: req.body });
        return res.render("./user/userBook", { error: error, oldData: req.body, active: "profile" });
    }

    next();
};

module.exports = validateBookMiddleware;
