let map;

// DOM 로드 이후 초기화
document.addEventListener('DOMContentLoaded', () => {
  initTmap();
  setupSearch();
});

// Tmap 지도 초기화
function initTmap() {
  map = new Tmapv2.Map("map", {
    center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841), // 서울 중심
    width: "100%",
    height: "100vh",
    zoom: 15
  });
}

// 검색창 처리
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
        const poi = data.searchPoiInfo.pois.poi[0]; // 첫 번째 결과
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
