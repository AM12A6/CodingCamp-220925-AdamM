// Utility: format current time
function formatNow() {
  const now = new Date();
  return now.toString();
}

// Navbar mobile toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Greeting: mirror name from form into the hero
const nameInput = document.getElementById('name');
const hiName = document.getElementById('hiName');
if (nameInput && hiName) {
  const updateHi = () => {
    const val = nameInput.value.trim();
    hiName.textContent = val.length ? val : 'Guest';
  };
  nameInput.addEventListener('input', updateHi);
  updateHi();
}

// Set current time initially
document.getElementById('currentTime').textContent = formatNow();

// Form validation + result rendering
const form = document.getElementById('messageForm');

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove('hidden');
}
function clearErrors() {
  ['errName', 'errDob', 'errGender', 'errMessage'].forEach(id => {
    const el = document.getElementById(id);
    el.textContent = '';
    el.classList.add('hidden');
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const name = nameInput.value.trim();
  const dob = document.getElementById('dob').value;
  const gender = [...document.querySelectorAll('input[name="gender"]:checked')].map(r => r.value)[0];
  const message = document.getElementById('message').value.trim();

  let valid = true;
  if (!name) { showError('errName', 'Nama wajib diisi.'); valid = false; }
  if (!dob) { showError('errDob', 'Tanggal lahir wajib diisi.'); valid = false; }
  if (!gender) { showError('errGender', 'Pilih jenis kelamin.'); valid = false; }
  if (message.length < 5) { showError('errMessage', 'Pesan minimal 5 karakter.'); valid = false; }

  if (!valid) return;

  // Render output box
  document.getElementById('currentTime').textContent = formatNow();
  document.getElementById('rName').textContent = name;
  document.getElementById('rDob').textContent = dob;
  document.getElementById('rGender').textContent = gender;
  document.getElementById('rMessage').textContent = message;

  // Tampilkan alert dan info submit
  alert(`Terimakasih ${name}, pesan mu sudah terkirim :D`);

  // Tampilkan informasi telah disubmit DI BAWAH hasil pesan
  let info = document.getElementById('submitInfo');
  const resultBox = document.getElementById('resultBox');
  if (!info) {
    info = document.createElement('div');
    info.id = 'submitInfo';
    info.className = 'mt-4 p-3 rounded bg-green-100 text-green-700 text-center font-semibold';
    // Sisipkan setelah resultBox
    resultBox.parentNode.appendChild(info);
  }
  info.textContent = 'Informasi telah disubmit';

  // Reset field selain nama (manual)
  document.getElementById('dob').value = '';
  document.getElementById('message').value = '';
  document.querySelectorAll('input[name="gender"]').forEach(r => r.checked = false);
});

// Modal visitor name & greeting
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('visitorModal');
  const blurOverlay = document.getElementById('blurOverlay');
  const input = document.getElementById('visitorNameInput');
  const btn = document.getElementById('visitorSubmitBtn');
  const nameInput = document.getElementById('name');
  const greetingVisitor = document.getElementById('greetingVisitor');

  // Show modal & blur overlay jika belum isi nama
  if (!sessionStorage.getItem('visitorName')) {
    modal.classList.remove('hidden');
    blurOverlay.classList.remove('hidden');
    input.focus();
  } else if (nameInput) {
    nameInput.value = sessionStorage.getItem('visitorName');
    nameInput.readOnly = true;
    nameInput.classList.add('bg-slate-100', 'cursor-not-allowed');
  }

  // Tampilkan greeting jika sudah ada nama
  function showGreeting() {
    const visitorName = sessionStorage.getItem('visitorName');
    if (visitorName && greetingVisitor) {
      greetingVisitor.textContent = `Halo ${visitorName}, kenalan lebih dengan saya, yuk :D`;
    }
  }
  showGreeting();

  btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (name.length < 2) {
      input.classList.add('border-red-500');
      input.placeholder = 'Nama minimal 2 huruf';
      input.focus();
      return;
    }
    sessionStorage.setItem('visitorName', name);
    modal.classList.add('hidden');
    blurOverlay.classList.add('hidden');
    if (nameInput) {
      nameInput.value = name;
      nameInput.readOnly = true;
      nameInput.classList.add('bg-slate-100', 'cursor-not-allowed');
    }
    setTimeout(() => {
      alert(`Terimakasih ${name} sudah mampir :)`);
      showGreeting();
    }, 200);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });

  // Prevent user from changing name or resetting form
  if (nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      e.preventDefault();
      alert('refresh website dulu ya');
    });
    nameInput.addEventListener('mousedown', (e) => {
      e.preventDefault();
      alert('refresh website dulu ya');
    });
    const form = document.getElementById('messageForm');
    if (form) {
      form.addEventListener('reset', (e) => {
        e.preventDefault();
        alert('refresh website dulu ya');
      });
    }
  }
});
