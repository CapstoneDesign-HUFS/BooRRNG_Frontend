let map;

document.addEventListener('DOMContentLoaded', () => {
  initTmap();
  setupSearch();
  setupArrivalTrigger();
});

// Tmap 초기화
function initTmap() {
  map = new Tmapv2.Map("map", {
    center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841), // 서울 중심
    width: "100%",
    height: "100vh",
    zoom: 15
  });
}

// 검색 기능
function setupSearch() {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const keyword = input.value.trim();
    if (!keyword) return;

    const url = `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${encodeURIComponent(keyword)}&resCoordType=WGS84GEO&reqCoordType=WGS84GEO&searchType=all&appKey=L3RMA32ZfO5WRNvNlGBCBKuXpGjYV3dlmWlETWb0`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.searchPoiInfo.pois.poi.length > 0) {
        const poi = data.searchPoiInfo.pois.poi[0];
        const lat = parseFloat(poi.frontLat);
        const lon = parseFloat(poi.frontLon);

        map.setCenter(new Tmapv2.LatLng(lat, lon));
        new Tmapv2.Marker({
          position: new Tmapv2.LatLng(lat, lon),
          map: map
        });
      } else {
        alert("검색 결과가 없습니다.");
      }
    } catch (err) {
      console.error("검색 오류:", err);
      alert("검색 중 오류가 발생했습니다.");
    }
  });
}

// 도착 버튼 클릭 시 도착 정보 표시
function setupArrivalTrigger() {
  const btn = document.getElementById("arrivedBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      const arrivedBox = document.getElementById("arrivedBox");

      if (arrivedBox) {
        arrivedBox.classList.remove("hidden");

        const timeSpan = arrivedBox.querySelector("div:nth-child(2) span:nth-child(2)");
        const distSpan = arrivedBox.querySelector("div:nth-child(3) span:nth-child(2)");
        const speedSpan = arrivedBox.querySelector("div:nth-child(4) span:nth-child(2)");

        if (timeSpan) timeSpan.textContent = "23";
        if (distSpan) distSpan.textContent = "1.8";
        if (speedSpan) speedSpan.textContent = "4.2";

        // 다른 UI 요소 숨기기
        document.getElementById("speedAlertBox")?.classList.add("hidden");
        document.getElementById("routeInfoBox")?.classList.add("hidden");
        document.getElementById("routeHeader")?.classList.add("hidden");
        document.getElementById("trafficSignal")?.classList.add("hidden");
      }
    });
  }
}
