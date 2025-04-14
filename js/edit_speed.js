// 사용자 정보 로드
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

document.getElementById('minWalkVal').textContent = user.speeds.minWalk + 'm/s';
document.getElementById('minFastWalkVal').textContent = user.speeds.minFastWalk + 'm/s';
document.getElementById('minRunVal').textContent = user.speeds.minRun + 'm/s';
document.getElementById('maxWalkVal').textContent = user.speeds.maxWalk + 'm/s';
document.getElementById('maxFastWalkVal').textContent = user.speeds.maxFastWalk + 'm/s';
document.getElementById('maxRunVal').textContent = user.speeds.maxRun + 'm/s';

// 선택 라벨 스타일 업데이트
function updateSelectedClass(groupName) {
  document.querySelectorAll(`input[name="${groupName}"]`).forEach(radio => {
    const label = radio.closest('label');
    if (label) label.classList.remove('selected');
  });

  const selected = document.querySelector(`input[name="${groupName}"]:checked`);
  if (selected) {
    const label = selected.closest('label');
    if (label) label.classList.add('selected');
  }
}

document.querySelectorAll('input[name="minspeed"]').forEach(input => {
  input.addEventListener('change', () => updateSelectedClass('minspeed'));
});

document.querySelectorAll('input[name="maxspeed"]').forEach(input => {
  input.addEventListener('change', () => updateSelectedClass('maxspeed'));
});

// 저장 처리
function saveSpeed() {
  const minInput = document.querySelector('input[name="minspeed"]:checked');
  const maxInput = document.querySelector('input[name="maxspeed"]:checked');

  if (!minInput || !maxInput) {
    alert("최저속도와 최고속도를 모두 선택해주세요.");
    return;
  }

  const minVal = user.speeds[minInput.id];
  const maxVal = user.speeds[maxInput.id];

  if (minVal >= maxVal) {
    alert("최저속도는 최고속도보다 작아야 합니다.");
    return;
  }

  localStorage.setItem("selectedMinSpeed", minInput.id);
  localStorage.setItem("selectedMaxSpeed", maxInput.id);
  localStorage.setItem("minSpeedValue", minVal);
  localStorage.setItem("maxSpeedValue", maxVal);

  window.location.href = "mypage.html";
}

// 모달 닫기 (미사용 시에도 유지)
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
