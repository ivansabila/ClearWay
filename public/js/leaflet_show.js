var map = L.map("map").setView([coordinate.split("|")[0], coordinate.split("|")[1]], 16);

var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
osm.addTo(map);

var marker = L.marker([coordinate.split("|")[0], coordinate.split("|")[1]]);
marker.addTo(map);

var popup = marker.bindPopup(`<p class="text-sm font-medium font-base text-brown/60" >${coordinate.split("|")[2]}</p>`);
popup.openPopup();
