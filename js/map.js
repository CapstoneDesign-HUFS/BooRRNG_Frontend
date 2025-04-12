let map;

function initMap() {
  map = new Tmapv2.Map("map", {
    center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
    width: "100%",
    height: "100%",
    zoom: 16
  });
}

window.onload = initMap;

document.getElementById('arrivedBtn').addEventListener('click', function () {
  document.getElementById('speedAlertBox').classList.add('hidden');
  document.getElementById('arrivedBox').classList.remove('hidden');
});



