document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('user-name').value = localStorage.getItem('userName') || '';
    document.getElementById('user-id').value = localStorage.getItem('userId') || '';
    document.getElementById('user-birth').value = localStorage.getItem('userBirth') || '';
    document.getElementById('user-gender').value = localStorage.getItem('userGender') === '남성' ? 'male' : 'female';
  
    const minSpeed = localStorage.getItem('minSpeedValue') || '-';
    const maxSpeed = localStorage.getItem('maxSpeedValue') || '-';
    document.getElementById('min-speed').value = `${minSpeed} km/h`;
    document.getElementById('max-speed').value = `${maxSpeed} km/h`;
  });