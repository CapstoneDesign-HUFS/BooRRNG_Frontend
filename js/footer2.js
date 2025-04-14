document.addEventListener('DOMContentLoaded', () => {
  const footerContainer = document.getElementById('footer');

  // 경로 자동 탐지: 현재 위치 기준
  const footerPath = new URL('../components/footer2.html', window.location.href).href;
  const cssPath = new URL('../css/footer2.css', window.location.href).href;

  // footer HTML 삽입
  fetch(footerPath)
    .then(res => res.text())
    .then(data => {
      footerContainer.innerHTML = data;

      // 🔥 CSS 동적 추가
      const styleLink = document.createElement('link');
      styleLink.rel = 'stylesheet';
      styleLink.href = cssPath;
      document.head.appendChild(styleLink);

      // 현재 페이지에 해당하는 링크에 'active' 클래스 추가
      const currentPage = location.pathname.split('/').pop();
      const links = document.querySelectorAll('.footer-link');
      links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
        }
      });
    });
});


