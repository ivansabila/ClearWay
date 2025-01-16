const dataDistrict = [
    {
        kecamatan: "Batupoaro",
        kelurahan: ["Bonebone", "Kaobula", "Lanto", "Nganganaumala", "Tarafu", "Wameo"],
    },
    {
        kecamatan: "Betoambari",
        kelurahan: ["Sulaa", "Waborobo", "Lipu", "Katobengke", "Labalawa"],
    },
    {
        kecamatan: "Kokalukuna",
        kelurahan: ["Kadolomoko", "Kadolo", "Waruruma", "Lakologou", "Liwuto", "Sukanaeyo"],
    },
    {
        kecamatan: "Lea-Lea",
        kelurahan: ["Kalia-Lia", "Kantalai", "Kolese", "Lowu-Lowu", "Palabusa"],
    },
    {
        kecamatan: "Murhum",
        kelurahan: ["Badia", "Lamangga", "Tanganapada", "Melai", "Wajo"],
    },
    {
        kecamatan: "Sorawolio",
        kelurahan: ["Kaisabu Baru", "Karya Baru", "Bugi", "Gonda Baru"],
    },
    {
        kecamatan: "Wolio",
        kelurahan: ["Bataraguru", "Batulo", "Bukit Wolio Indah", "Kadolokatapi", "Tomba", "Wale", "Wangkanapi"],
    },
];

const kecamatanDropdown = document.getElementById("district");
const kelurahanDropdown = document.getElementById("subdistrict");

dataDistrict.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.kecamatan;
    option.textContent = item.kecamatan;

    if (item.kecamatan === defaultDistrict) {
        option.selected = true;
    }

    kecamatanDropdown.appendChild(option);
});

if (defaultDistrict) {
    const kelurahanList = dataDistrict.find((item) => item.kecamatan === defaultDistrict)?.kelurahan || [];
    kelurahanList.forEach((kelurahan) => {
        const option = document.createElement("option");
        option.value = kelurahan;
        option.textContent = kelurahan;

        if (kelurahan === defaultSubdistrict) {
            option.selected = true;
        }

        kelurahanDropdown.appendChild(option);
    });
}

function filterKelurahan() {
    const selectedKecamatan = kecamatanDropdown.value;

    kelurahanDropdown.innerHTML = '<option value="" disabled>-- Pilih Kelurahan --</option>';

    if (selectedKecamatan) {
        const kelurahanList = dataDistrict.find((item) => item.kecamatan === selectedKecamatan).kelurahan;

        kelurahanList.forEach((kelurahan) => {
            const option = document.createElement("option");
            option.value = kelurahan;
            option.textContent = kelurahan;
            kelurahanDropdown.appendChild(option);
        });
    }
}
