// 모달 열기
function showModal(title, message) {
  const modal = document.getElementById("modal");
  const modalTitle = modal.querySelector("h3");
  const modalMsg = modal.querySelector("p");

  modalTitle.textContent = title;
  modalMsg.textContent = message;

  modal.classList.remove("hidden");
}

// 모달 닫기
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

// 회원가입 처리
function handleSignup(event) {
  event.preventDefault();

  const pw = document.getElementById('signupPw').value;
  const pwConfirm = document.getElementById('signupPwConfirm').value;
  const agreeCheck = document.getElementById('agreeCheck').checked;

  if (!agreeCheck) {
    showModal("약관 미동의", "약관에 동의하셔야 회원가입이 가능합니다.");
    return;
  }

  if (pw !== pwConfirm) {
    showModal("비밀번호 오류", "비밀번호가 일치하지 않습니다.");
    return;
  }

  showModal("회원가입 완료", "회원가입이 성공적으로 완료되었습니다.");
  setTimeout(() => {
    closeModal();
    // 이동 처리
    window.location.href = "login.html";
  }, 2000);
}

// 아이디 중복 확인 (데모용)
function checkDuplicate() {
  const id = document.getElementById("signupId").value.trim();
  if (!id) {
    showModal("아이디 오류", "아이디를 입력해주세요.");
    return;
  }

  // 예시: testuser는 사용 중
  if (id === "testuser") {
    showModal("중복된 아이디", "이미 사용 중인 아이디입니다.");
  } else {
    showModal("사용 가능", "사용 가능한 아이디입니다.");
  }
}
