// 현재 위치를 받아 초기 지도 설정
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    map = new Tmapv2.Map("map", {
      center: new Tmapv2.LatLng(lat, lon),
      width: "100%",
      height: "100%",
      zoom: 16
    });

    // 현재 위치 마커
    new Tmapv2.Marker({
      position: new Tmapv2.LatLng(lat, lon),
      map: map
    });
  },
  () => {
    alert("현재 위치 정보를 가져올 수 없습니다.");
  }
);


function showRouteInfoBox(durationMin, distanceKm) {
  document.getElementById("expectedTime").textContent = `${durationMin}분`;
  document.getElementById("expectedDistance").textContent = `${distanceKm}km`;
  document.getElementById("routeInfoBox").classList.remove("d-none");
}


document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const keyword = document.getElementById("searchInput").value.trim();
  if (!keyword) return;

  fetch(`https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${encodeURIComponent(keyword)}&resCoordType=WGS84GEO&reqCoordType=WGS84GEO&appKey=L3RMA32ZfO5WRNvNlGBCBKuXpGjYV3dlmWlETWb0`)
    .then(response => response.json())
    .then(data => {
      const pois = data.searchPoiInfo.pois.poi;
      const resultList = document.getElementById("searchResults");
      resultList.innerHTML = ""; // 초기화

      pois.forEach(poi => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        const textBox = document.createElement("div");
        const title = document.createElement("div");
        title.textContent = poi.name;
        title.classList.add("fw-semibold");

        const address = document.createElement("div");
        address.textContent = `${poi.distance || "?"}m ${poi.upperAddrName || ""} ${poi.middleAddrName || ""} ${poi.roadName || ""}`;
        address.classList.add("text-muted", "small");

        textBox.appendChild(title);
        textBox.appendChild(address);

        // 🔥 목적지 선택 버튼
        const button = document.createElement("button");
        button.innerHTML = '<b class="bi bi-arrow-90deg-right" style="font-weight:900;"></b>';
        button.className = "btn btn-primary";

        button.onclick = () => {
          const lat = poi.frontLat;
          const lon = poi.frontLon;
          map.setCenter(new Tmapv2.LatLng(lat, lon));

          // 👉 여기에 경로탐색 관련 기능 추가
          showRouteInfoBox(25, 1.2); // (예시 값)

          // 바텀시트 닫기
          document.getElementById("bottomSheet").classList.remove("show");
          document.getElementById("bottomSheet").style.transform = "translateY(100%)";

          //헤더 및 검색창 숨기기
          // 출발지-목적지 헤딩 띄우기
          document.getElementById("header").classList.add("d-none");
          document.getElementById("searchForm").classList.add("d-none");
          document.getElementById("routeHeader").classList.remove("d-none");

          // 출발지-목적지 헤딩에 목적지 이름 띄우기

          //
          

        };

        li.appendChild(textBox);
        li.appendChild(button);
        resultList.appendChild(li);
      });

      // 바텀시트 열기
      document.getElementById("bottomSheet").classList.add("show");
      document.getElementById("bottomSheet").style.transform = "translateY(0)";
    })
    .catch(err => {
      console.error("검색 오류", err);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("speedGuideBtn").onclick = function () {
    document.getElementById("routeInfoBox").classList.add("d-none");
    document.getElementById("speedAlertBox").classList.remove("d-none");
  };
});


