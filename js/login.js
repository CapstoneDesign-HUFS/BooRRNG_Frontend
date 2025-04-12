function togglePassword() {
    const input = document.getElementById("passwordInput");
    input.type = input.type === "password" ? "text" : "password";
  }
  
  function checkCapsLock(event) {
    const warning = document.getElementById("capsLockWarning");
    const isCapsLock = event.getModifierState && event.getModifierState("CapsLock");
    const isLetter = event.key.length === 1 && /[a-zA-Z]/.test(event.key);
    warning.classList.toggle("hidden", !(isCapsLock && isLetter));
  }
  
  function handleLogin(event) {
    event.preventDefault();
    const id = document.getElementById("loginId").value;
    const pw = document.getElementById("passwordInput").value;
  
    const validId = "testuser";
    const validPw = "1234";
  
    if (id === validId && pw === validPw) {
      alert("로그인 성공!");
      location.href = "map-home.html";
    } else {
      document.getElementById("loginErrorModal").classList.remove("hidden");
    }
  }
  
  // ✅ DOM 로드 후 모달 닫기 버튼 이벤트 연결
  document.addEventListener("DOMContentLoaded", function () {
    const closeBtn = document.getElementById("closeModalBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        document.getElementById("loginErrorModal").classList.add("hidden");
      });
    }
  });
  
  function checkCapsLock(event) {
    const warning = document.getElementById("capsLockWarning");
    const target = event.target;
  
    if (!warning || target.id !== "passwordInput") return;
  
    const isCapsLock = event.getModifierState && event.getModifierState("CapsLock");
    const isLetter = event.key.length === 1 && /[a-zA-Z]/.test(event.key);
  
    if (isCapsLock && isLetter) {
      warning.classList.remove("hidden");
    } else {
      warning.classList.add("hidden");
    }
  }
  
  