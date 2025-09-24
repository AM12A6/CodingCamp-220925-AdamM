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

  // Optional: reset form? keep values for convenience
  // form.reset();
});
