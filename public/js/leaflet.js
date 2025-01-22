var map = L.map("map").setView([-5.45541658401094, 122.60072106000646], 16);

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
osm.addTo(map);

// googleStreets = L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
//     maxZoom: 20,
//     subdomains: ["mt0", "mt1", "mt2", "mt3"],
// });
// googleStreets.addTo(map);

// var singleMarker = L.marker([-5.45541658401094, 122.60072106000646]);
// singleMarker.addTo(map);
// var popup = singleMarker.bindPopup("This is a popup");
// popup.addTo(map);

const locationContainer = document.querySelector("#locationContainer");
const searchLocation = document.querySelector("#searchLocation");
const locationName = document.querySelector(".location #locationInput");
const loc = document.querySelector("#location");

locationName.addEventListener("focus", () => {
    locationContainer.style.outline = "rgb(232 129 110/.5) solid 3px";
});

locationName.addEventListener("blur", () => {
    locationContainer.style.outline = "transparent solid 3px";
});

let searchMarker;

searchLocation.addEventListener("click", () => {
    console.log("CLICK");

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName.value)}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length === 0) {
                alert("Lokasi tidak ditemukan.");
                return;
            }
            const { lat, lon, display_name } = data[0];
            console.log("🚀 ~ .then ~ data[0]:", data[0]);

            loc.value = `${lat}|${lon}|${display_name}`;

            // Pindahkan peta ke lokasi baru
            map.setView([lat, lon], 15);

            // Tambahkan atau perbarui marker
            if (searchMarker) {
                searchMarker.setLatLng([lat, lon]);
            } else {
                searchMarker = L.marker([lat, lon]).addTo(map);
            }

            searchMarker.bindPopup(`<p class="text-sm font-medium font-base text-brown/60" >${display_name}</p>`).openPopup();
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat mencari lokasi.");
        });
});
