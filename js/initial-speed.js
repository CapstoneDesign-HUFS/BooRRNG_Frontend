// 사용자 속도 정보 가져오기
const user = {
    name: localStorage.getItem('userName') || '홍길동',
    ageGroup: localStorage.getItem('userAgeGroup') || '30대',
    gender: localStorage.getItem('userGender') || '남성',
    speeds: {
      minWalk: parseFloat(localStorage.getItem('minWalk')) || 1.23,
      minFastWalk: parseFloat(localStorage.getItem('minFastWalk')) || 1.45,
      minRun: parseFloat(localStorage.getItem('minRun')) || 1.67,
      maxWalk: parseFloat(localStorage.getItem('maxWalk')) || 1.23,
      maxFastWalk: parseFloat(localStorage.getItem('maxFastWalk')) || 1.45,
      maxRun: parseFloat(localStorage.getItem('maxRun')) || 1.67,
    }
  };
  
  // 사용자 정보 표시
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userAge').textContent = user.ageGroup;
  document.getElementById('userGender').textContent = user.gender;
  
  // 속도 값 표시 (단위 포함)
  document.getElementById('minWalkVal').textContent = user.speeds.minWalk + 'm/s';
  document.getElementById('minFastWalkVal').textContent = user.speeds.minFastWalk + 'm/s';
  document.getElementById('minRunVal').textContent = user.speeds.minRun + 'm/s';
  document.getElementById('maxWalkVal').textContent = user.speeds.maxWalk + 'm/s';
  document.getElementById('maxFastWalkVal').textContent = user.speeds.maxFastWalk + 'm/s';
  document.getElementById('maxRunVal').textContent = user.speeds.maxRun + 'm/s';
  
  // 선택 시 라벨에 selected 클래스 추가
  function updateSelectedClass(groupName) {
    const radios = document.querySelectorAll(`input[name="${groupName}"]`);
    radios.forEach(radio => {
      const label = radio.closest('label');
      if (label) {
        label.classList.remove('selected');
      }
    });
  
    const checkedRadio = document.querySelector(`input[name="${groupName}"]:checked`);
    if (checkedRadio) {
      const selectedLabel = checkedRadio.closest('label');
      if (selectedLabel) {
        selectedLabel.classList.add('selected');
      }
    }
  }
  
  // 각각 이벤트 연결
  document.querySelectorAll('input[name="minspeed"]').forEach(input => {
    input.addEventListener('change', () => updateSelectedClass('minspeed'));
  });
  
  document.querySelectorAll('input[name="maxspeed"]').forEach(input => {
    input.addEventListener('change', () => updateSelectedClass('maxspeed'));
  });
  
  // 저장 및 유효성 검사
  function saveSpeed() {
    const minInput = document.querySelector('input[name="minspeed"]:checked');
    const maxInput = document.querySelector('input[name="maxspeed"]:checked');
  
    if (!minInput || !maxInput) {
      showModal("속도 선택 오류", "모든 속도를 선택해주세요.");
      return;
    }
  
    const minVal = user.speeds[minInput.id];
    const maxVal = user.speeds[maxInput.id];
  
    if (minVal >= maxVal) {
      showModal("속도 설정 오류", "최저속도는 최고속도보다 작아야 합니다.");
      return;
    }
  
    localStorage.setItem('selectedMinSpeed', minInput.id);
    localStorage.setItem('selectedMaxSpeed', maxInput.id);
    localStorage.setItem('minSpeedValue', minVal);
    localStorage.setItem('maxSpeedValue', maxVal);
  
    window.location.href = "mypage.html";
  }
  
  // 모달 제어
  function showModal(title, message) {
    const modal = document.getElementById("modal");
    modal.querySelector("h5").textContent = title;
    modal.querySelector("p").textContent = message;
    modal.classList.remove("hidden");
  }
  
  function closeModal() {
    document.getElementById("modal").classList.add("hidden");
  }
  