// // Firebase konfiguratsiyasi
// const firebaseConfig = {
//   apiKey: "AIzaSyBHUNLubt5XVcWLXW5t4xG1RFx3KqtLlBg",
//   authDomain: "bgunbaza002.firebaseapp.com",
//   projectId: "bgunbaza002",
//   storageBucket: "bgunbaza002.firebasestorage.app",
//   messagingSenderId: "749878938134",
//   appId: "1:749878938134:web:8ec6e2a8236253d8da4337",
//   measurementId: "G-1RHX35BLZE"
// };

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyBHUNLubt5XVcWLXW5t4xG1RFx3KqtLlBg",
  authDomain: "bgunbaza002.firebaseapp.com",
  databaseURL: "https://bgunbaza002-default-rtdb.firebaseio.com/",
  projectId: "bgunbaza002",
  storageBucket: "bgunbaza002.firebasestorage.app",
  messagingSenderId: "749878938134",
  appId: "1:749878938134:web:8ec6e2a8236253d8da4337"
};

// Firebase ni ishga tushirish
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// O'zgaruvchilar
let drivers = [];
let regions = [
  "Andijon", "Buxoro", "Farg'ona", "Jizzax", "Xorazm", 
  "Namangan", "Navoiy", "Qashqadaryo", "Samarqand", 
  "Sirdaryo", "Surxondaryo", "Toshkent", "Qoraqalpog'iston"
];
let districts = {
  "Andijon": ["Andijon shahar", "Andijon tumani", "Asaka", "Baliqchi", "Bo'ston", "Buloqboshi", "Izboskan", "Jalaquduq", "Marhamat", "Oltinko'l", "Paxtaobod", "Qo'rg'ontepa", "Shahrixon", "Ulug'nor", "Xo'jaobod"],
  "Buxoro": ["Buxoro shahar", "Buxoro tumani", "G'ijduvon", "Jondor", "Kogon", "Olot", "Peshku", "Qorako'l", "Qorovulbozor", "Romitan", "Shofirkon", "Vobkent"],
  "Farg'ona": ["Farg'ona shahar", "Farg'ona tumani", "Beshariq", "Bog'dod", "Buvayda", "Dang'ara", "Furqat", "Oltiariq", "Qo'shtepa", "Quva", "Rishton", "So'x", "Toshloq", "Uchko'prik", "Yozyovon"],
  "Jizzax": ["Jizzax shahar", "Jizzax tumani", "Arnasoy", "Baxmal", "Do'stlik", "Forish", "G'allaorol", "Mirzacho'l", "Paxtakor", "Yangiobod", "Zomin", "Zafarobod", "Zarbdor"],
  "Xorazm": ["Urganch shahar", "Urganch tumani", "Bog'ot", "Gurlan", "Hazorasp", "Honqa", "Qo'shko'pir", "Shovot", "Xiva", "Xonqa", "Yangiariq", "Yangibozor"],
  "Namangan": ["Namangan shahar", "Namangan tumani", "Chortoq", "Chust", "Kosonsoy", "Mingbuloq", "Norin", "Pop", "To'raqo'rg'on", "Uchqo'rg'on", "Uychi", "Yangiqo'rg'on"],
  "Navoiy": ["Navoiy shahar", "Navoiy tumani", "Karmana", "Konimex", "Nurota", "Qiziltepa", "Tomdi", "Uchquduq", "Xatirchi", "Zarafshon"],
  "Qashqadaryo": ["Qarshi shahar", "Qarshi tumani", "Chiroqchi", "Dehqonobod", "G'uzor", "Kasbi", "Kitob", "Koson", "Mirishkor", "Muborak", "Nishon", "Shahrisabz", "Yakkabog'"],
  "Samarqand": ["Samarqand shahar", "Samarqand tumani", "Bulung'ur", "Ishtixon", "Jomboy", "Kattaqo'rg'on", "Narpay", "Nurobod", "Oqdaryo", "Paxtachi", "Payariq", "Pastdarg'om", "Qo'shrabot", "Toyloq", "Urgut"],
  "Sirdaryo": ["Guliston shahar", "Guliston tumani", "Boyovut", "Mirzaobod", "Oqoltin", "Sardoba", "Sayxunobod", "Sirdaryo", "Xovos"],
  "Surxondaryo": ["Termiz shahar", "Termiz tumani", "Angor", "Bandixon", "Boysun", "Denov", "Jarqo'rg'on", "Muzrabot", "Oltinsoy", "Qiziriq", "Qumqo'rg'on", "Sariosiyo", "Sherobod", "Sho'rchi", "Uzun"],
  "Toshkent": ["Toshkent shahar", "Toshkent tumani", "Bekobod", "Bo'stonliq", "Bo'ka", "Chinoz", "Qibray", "Ohangaron", "Oqqo'rg'on", "Parkent", "Piskent", "Quyi Chirchiq", "O'rta Chirchiq", "Yangiyo'l", "Yuqori Chirchiq", "Zangiota"],
  "Qoraqalpog'iston": ["Nukus shahar", "Nukus tumani", "Amudaryo", "Beruniy", "Chimboy", "Ellikqal'a", "Kegeyli", "Mo'ynoq", "Qonliko'l", "Qo'ng'irot", "Qorao'zak", "Shumanay", "Taxtako'pir", "To'rtko'l", "Xo'jayli"]
};
let carTypes = [
  "KATTA ISUZU", "MAYDA ISUZU", "KATTA ISUZU REF", "MAYDA ISUZU REF", 
  "FURA TENT", "FURA REF", "PLASHATKA", "SHALANDA", "SHAKMAN", "LABO"
];

// DOM elementlari
const themeSwitch = document.getElementById('themeSwitch');
const addDriverBtn = document.getElementById('addDriverBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const regionFilter = document.getElementById('regionFilter');
const districtFilter = document.getElementById('districtFilter');
const carTypeFilter = document.getElementById('carTypeFilter');
const statusFilter = document.getElementById('statusFilter');
const todayDrivers = document.getElementById('todayDrivers');
const allDrivers = document.getElementById('allDrivers');
const driverModal = document.getElementById('driverModal');
const closeModal = document.querySelector('.close');
const driverForm = document.getElementById('driverForm');
const modalTitle = document.getElementById('modalTitle');
const driverName = document.getElementById('driverName');
const driverPhone = document.getElementById('driverPhone');
const carTypeSelect = document.getElementById('carType');
const customCarType = document.getElementById('customCarType');
const addCarTypeBtn = document.getElementById('addCarTypeBtn');
const regionSelect = document.getElementById('region');
const districtSelect = document.getElementById('district');
const directionSelect = document.getElementById('direction');
const notes = document.getElementById('notes');

// Tizimni ishga tushirish
document.addEventListener('DOMContentLoaded', initApp);

// Asosiy funksiyalar
function initApp() {
  // Tema o'zgartirish
  themeSwitch.addEventListener('change', toggleTheme);
  
  // Modal oynasini boshqarish
  addDriverBtn.addEventListener('click', () => openModal());
  closeModal.addEventListener('click', () => closeModalWindow());
  window.addEventListener('click', (e) => {
      if (e.target === driverModal) closeModalWindow();
  });
  
  // Formani boshqarish
  driverForm.addEventListener('submit', handleDriverFormSubmit);
  
  // Qidiruv va filtrlash
  searchBtn.addEventListener('click', filterDrivers);
  searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') filterDrivers();
  });
  
  regionFilter.addEventListener('change', filterDrivers);
  districtFilter.addEventListener('change', filterDrivers);
  carTypeFilter.addEventListener('change', filterDrivers);
  statusFilter.addEventListener('change', filterDrivers);
  
  // Viloyat va tumanlarni to'ldirish
  populateRegions();
  populateCarTypes();
  
  // Moshina turi qo'shish
  addCarTypeBtn.addEventListener('click', () => {
      customCarType.style.display = 'block';
      addCarTypeBtn.style.display = 'none';
  });
  
  customCarType.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') addNewCarType();
  });
  
  // Firebase'dan ma'lumotlarni olish
  fetchDrivers();
}

// Tema o'zgartirish
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode');
}

// Modal oynasini ochish
function openModal(driver = null) {
  if (driver) {
      // Tahrirlash rejimi
      modalTitle.textContent = "Haydovchini Tahrirlash";
      driverName.value = driver.name;
      driverPhone.value = driver.phone;
      carTypeSelect.value = driver.carType;
      regionSelect.value = driver.region;
      populateDistricts(driver.region, driver.district);
      directionSelect.value = driver.direction;
      notes.value = driver.notes || '';
      document.querySelector(`input[name="status"][value="${driver.status}"]`).checked = true;
      
      // Formaga ID ni saqlash
      driverForm.dataset.id = driver.id;
  } else {
      // Yangi qo'shish rejimi
      modalTitle.textContent = "Yangi Haydovchi Qo'shish";
      driverForm.reset();
      delete driverForm.dataset.id;
      populateDistricts(regionSelect.value);
  }
  
  driverModal.style.display = 'block';
}

// Modal oynasini yopish
function closeModalWindow() {
  driverModal.style.display = 'none';
  customCarType.style.display = 'none';
  addCarTypeBtn.style.display = 'block';
}

// Viloyatlarni to'ldirish
function populateRegions() {
  regions.forEach(region => {
      // Asosiy filter uchun
      const option1 = document.createElement('option');
      option1.value = region;
      option1.textContent = region;
      regionFilter.appendChild(option1);
      
      // Modal uchun
      const option2 = document.createElement('option');
      option2.value = region;
      option2.textContent = region;
      regionSelect.appendChild(option2.cloneNode(true));
      
      // Yo'nalish uchun
      directionSelect.appendChild(option2.cloneNode(true));
  });
  
  // Viloyat o'zgarganida tumanlarni yangilash
  regionSelect.addEventListener('change', () => populateDistricts(regionSelect.value));
}

// Tumanlarni to'ldirish
function populateDistricts(region, selectedDistrict = '') {
  districtSelect.innerHTML = '<option value="">Tanlang</option>';
  districtFilter.innerHTML = '<option value="">Barcha tumanlar</option>';
  
  if (region && districts[region]) {
      districts[region].forEach(district => {
          // Modal uchun
          const option1 = document.createElement('option');
          option1.value = district;
          option1.textContent = district;
          if (district === selectedDistrict) option1.selected = true;
          districtSelect.appendChild(option1);
          
          // Filter uchun
          const option2 = document.createElement('option');
          option2.value = district;
          option2.textContent = district;
          districtFilter.appendChild(option2);
      });
  }
}

// Moshina turlarini to'ldirish
function populateCarTypes() {
  carTypes.forEach(type => {
      // Asosiy filter uchun
      const option1 = document.createElement('option');
      option1.value = type;
      option1.textContent = type;
      carTypeFilter.appendChild(option1);
      
      // Modal uchun
      const option2 = document.createElement('option');
      option2.value = type;
      option2.textContent = type;
      carTypeSelect.appendChild(option2);
  });
}

// Yangi moshina turi qo'shish
function addNewCarType() {
  const newType = customCarType.value.trim();
  if (newType && !carTypes.includes(newType)) {
      carTypes.push(newType);
      
      // Filterga qo'shish
      const option1 = document.createElement('option');
      option1.value = newType;
      option1.textContent = newType;
      carTypeFilter.appendChild(option1);
      
      // Modaldagi selectga qo'shish
      const option2 = document.createElement('option');
      option2.value = newType;
      option2.textContent = newType;
      carTypeSelect.appendChild(option2);
      
      // Tanlash
      carTypeSelect.value = newType;
      customCarType.value = '';
      customCarType.style.display = 'none';
      addCarTypeBtn.style.display = 'block';
  }
}

// Firebase'dan haydovchilarni olish
function fetchDrivers() {
  database.ref('drivers').on('value', (snapshot) => {
      drivers = [];
      snapshot.forEach(childSnapshot => {
          const driver = childSnapshot.val();
          driver.id = childSnapshot.key;
          drivers.push(driver);
      });
      displayDrivers();
  });
}

// Haydovchilarni ekranga chiqarish
function displayDrivers(filteredDrivers = null) {
  const driversToDisplay = filteredDrivers || drivers;
  
  // Bugungi haydovchilar
  const today = new Date().toISOString().split('T')[0];
  const todayDriversList = driversToDisplay.filter(driver => {
      return driver.lastUpdated && driver.lastUpdated.includes(today);
  });
  
  todayDrivers.innerHTML = todayDriversList.length > 0 ? 
      todayDriversList.map(driver => createDriverCard(driver, true)).join('') :
      '<p>Bugun qo\'shilgan/tahrirlangan haydovchilar yo\'q</p>';
  
  // Barcha haydovchilar
  allDrivers.innerHTML = driversToDisplay.map(driver => createDriverCard(driver)).join('');
  
  // Har bir haydovchi uchun tahrirlash va o'chirish tugmalarini qo'shish
  document.querySelectorAll('.edit-driver').forEach(btn => {
      btn.addEventListener('click', (e) => {
          const driverId = e.target.closest('.driver-card').dataset.id;
          const driver = drivers.find(d => d.id === driverId);
          openModal(driver);
      });
  });
  
  document.querySelectorAll('.delete-driver').forEach(btn => {
      btn.addEventListener('click', (e) => {
          const driverId = e.target.closest('.driver-card').dataset.id;
          if (confirm('Haydovchini rostdan ham o\'chirmoqchimisiz?')) {
              deleteDriver(driverId);
          }
      });
  });
  
  // Statusni o'zgartirish
  document.querySelectorAll('.status-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
          const driverId = e.target.closest('.driver-card').dataset.id;
          const driver = drivers.find(d => d.id === driverId);
          toggleDriverStatus(driver);
      });
  });
}

// Haydovchi kartochkasi yaratish
function createDriverCard(driver, isToday = false) {
  const today = new Date().toISOString().split('T')[0];
  const isTodayDriver = driver.lastUpdated && driver.lastUpdated.includes(today);
  
  let statusClass = 'noma\'lum';
  let statusText = 'Noma\'lum';
  
  if (driver.status === 'yuk_bor') {
      statusClass = 'yuk-bor';
      statusText = 'Yuk bor';
  } else if (driver.status === 'yuk_yoq') {
      statusClass = 'yuk-yoq';
      statusText = 'Yuk yo\'q';
  }
  
  return `
      <div class="driver-card ${isTodayDriver ? 'today' : ''}" data-id="${driver.id}">
          <h3>${driver.name} <span class="status ${statusClass}" title="${statusText}"></span></h3>
          <p><i class="fas fa-phone"></i> ${driver.phone}</p>
          <p><i class="fas fa-car"></i> ${driver.carType}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${driver.region}, ${driver.district}</p>
          <p><i class="fas fa-route"></i> Yo'nalish: ${driver.direction}</p>
          ${driver.notes ? `<p><i class="fas fa-comment"></i> ${driver.notes}</p>` : ''}
          <div class="driver-actions">
              <button class="status-toggle" title="Statusni o'zgartirish"><i class="fas fa-sync-alt"></i></button>
              <button class="edit-driver" title="Tahrirlash"><i class="fas fa-edit"></i></button>
              <button class="delete-driver" title="O'chirish"><i class="fas fa-trash"></i></button>
          </div>
      </div>
  `;
}

// Haydovchi qo'shish yoki tahrirlash
function handleDriverFormSubmit(e) {
  e.preventDefault();
  
  const driverData = {
      name: driverName.value.trim(),
      phone: driverPhone.value.trim(),
      carType: carTypeSelect.value,
      region: regionSelect.value,
      district: districtSelect.value,
      direction: directionSelect.value,
      notes: notes.value.trim(),
      status: document.querySelector('input[name="status"]:checked').value,
      lastUpdated: new Date().toISOString()
  };
  
  if (driverForm.dataset.id) {
      // Tahrirlash
      updateDriver(driverForm.dataset.id, driverData);
  } else {
      // Yangi qo'shish
      addDriver(driverData);
  }
  
  closeModalWindow();
}

// Yangi haydovchi qo'shish
function addDriver(driver) {
  database.ref('drivers').push(driver)
      .then(() => console.log('Haydovchi qo\'shildi'))
      .catch(error => console.error('Xatolik:', error));
}

// Haydovchini yangilash
function updateDriver(id, driver) {
  database.ref(`drivers/${id}`).update(driver)
      .then(() => console.log('Haydovchi yangilandi'))
      .catch(error => console.error('Xatolik:', error));
}

// Haydovchini o'chirish
function deleteDriver(id) {
  database.ref(`drivers/${id}`).remove()
      .then(() => console.log('Haydovchi o\'chirildi'))
      .catch(error => console.error('Xatolik:', error));
}

// Haydovchi statusini o'zgartirish
function toggleDriverStatus(driver) {
  let newStatus;
  if (driver.status === 'yuk_bor') {
      newStatus = 'yuk_yoq';
  } else if (driver.status === 'yuk_yoq') {
      newStatus = 'noma\'lum';
  } else {
      newStatus = 'yuk_bor';
  }

  const updates = {
      status: newStatus,
      lastUpdated: new Date().toISOString()
  };

  database.ref(`drivers/${driver.id}`).update(updates)
      .then(() => console.log('Status yangilandi'))
      .catch(error => console.error('Xatolik:', error));
}

// Haydovchilarni filtrlash
function filterDrivers() {
  const searchTerm = searchInput.value.toLowerCase();
  const region = regionFilter.value;
  const district = districtFilter.value;
  const carType = carTypeFilter.value;
  const status = statusFilter.value;

  const filtered = drivers.filter(driver => {
      const matchesSearch = 
          driver.name.toLowerCase().includes(searchTerm) ||
          driver.phone.includes(searchTerm) ||
          (driver.notes && driver.notes.toLowerCase().includes(searchTerm));

      const matchesRegion = region ? driver.region === region : true;
      const matchesDistrict = district ? driver.district === district : true;
      const matchesCarType = carType ? driver.carType === carType : true;
      const matchesStatus = status ? driver.status === status : true;

      return matchesSearch && matchesRegion && matchesDistrict && matchesCarType && matchesStatus;
  });

  displayDrivers(filtered);
}
