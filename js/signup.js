function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function goToLogin() {
  closeModal('successModal');
  window.location.href = 'login.html';
}

function handleSignup(event) {
  event.preventDefault();

  const pw = document.getElementById('signupPw').value;
  const pwConfirm = document.getElementById('signupPwConfirm').value;
  const agreed = document.getElementById('agreeCheck').checked;

  if (pw !== pwConfirm) {
    showModal('pwErrorModal');
    return;
  }

  if (!agreed) {
    showModal('agreeErrorModal');
    return;
  }

  // ✅ 성공 모달로 대체
  showModal('successModal');
}

