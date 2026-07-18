
  /* ============================================================
     DATA ARMADA
     Setiap mobil punya: brand, name, price (Rp/hari), wa (nomor)
     ============================================================ */
  const FLEET = [
    { brand:"Porsche",      name:"Porsche 911 Carrera",        price:"Rp 3.500.000", key:"porsche-911",        img:"https://images.unsplash.com/photo-1580679568899-be51739ba2df?auto=format&fit=crop&w=800&q=80" },
    { brand:"Ford",         name:"Ford Mustang GT V8",          price:"Rp 2.800.000", key:"ford-mustang",       img:"https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&fit=crop&w=800&q=80" },
    { brand:"Toyota",       name:"Toyota GR Supra",             price:"Rp 2.200.000", key:"toyota-gr-supra",    img:"https://images.unsplash.com/photo-1699067158959-05994d913d35?auto=format&fit=crop&w=800&q=80" },
    { brand:"Mercedes-Benz",name:"Mercedes-Benz E 300",         price:"Rp 1.850.000", key:"mercedes-e300",      img:"https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80" },
    { brand:"BMW",          name:"BMW 530i M Sport",            price:"Rp 1.750.000", key:"bmw-530i",           img:"https://images.unsplash.com/photo-1601929862217-f1bf94503333?auto=format&fit=crop&w=800&q=80" },
    { brand:"Toyota",       name:"Toyota Alphard Facelift",     price:"Rp 2.400.000", key:"alphard",            img:"https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80" },
    { brand:"Toyota",       name:"Toyota All New Avanza",       price:"Rp 400.000",   key:"toyota-avanza",      img:"https://images.unsplash.com/photo-1675311183084-755007dbb223?auto=format&fit=crop&w=800&q=80" },
    { brand:"Mitsubishi",   name:"Mitsubishi Xpander",          price:"Rp 450.000",   key:"mitsubishi-xpander", img:"https://images.unsplash.com/photo-1664783856972-ac9922d7b2d3?auto=format&fit=crop&w=800&q=80" },
    { brand:"Honda",        name:"Honda Brio RS",                price:"Rp 350.000",   key:"honda-brio",         img:"https://images.unsplash.com/photo-1571561944842-542037875b50?auto=format&fit=crop&w=800&q=80" },
    { brand:"Toyota",       name:"Toyota Fortuner GR",           price:"Rp 1.200.000", key:"toyota-fortuner",    img:"https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80" },
    { brand:"Mitsubishi",   name:"Mitsubishi Pajero Sport",      price:"Rp 1.200.000", key:"mitsubishi-pajero",  img:"https://images.unsplash.com/photo-1693532331766-bfcec4163ce4?auto=format&fit=crop&w=800&q=80" },
    { brand:"Toyota",       name:"Toyota RAV4 Premium",          price:"Rp 1.500.000", key:"toyota-rav4",        img:"https://images.unsplash.com/photo-1688893287874-ac7fbd686c24?auto=format&fit=crop&w=800&q=80" },
    { brand:"Audi",         name:"Audi A6",                      price:"Rp 1.600.000", key:"audi-a6",            img:"https://images.unsplash.com/photo-1599912027611-484b9fc447af?auto=format&fit=crop&w=800&q=80" },
    { brand:"MINI",         name:"MINI Cooper",                  price:"Rp 1.400.000", key:"mini-cooper",        img:"https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80" },
    { brand:"Land-Rover",   name:"Range Rover Sport",            price:"Rp 2.900.000", key:"range-rover-sport",  img:"https://images.unsplash.com/photo-1671614415338-68728dd833ea?auto=format&fit=crop&w=800&q=80" },
    { brand:"Lexus",        name:"Lexus ES300h",                 price:"Rp 2.000.000", key:"lexus-es300h",       img:"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80" },
    { brand:"Honda",        name:"Honda CR-V",                   price:"Rp 1.300.000", key:"honda-crv",          img:"https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=800&q=80" }
  ];

  const BRANDS = [...new Set(FLEET.map(c => c.brand))].sort();

  /* ---------- STATE ---------- */
  let selectedBrands = new Set();   // multi-select dari checklist / klik kategori
  let selectedModel  = null;        // nama mobil spesifik saat submenu diklik
  let searchTerm     = '';

  /* ---------- BANGUN SIDEBAR KATEGORI (brand + submenu model + tombol "+") ---------- */
  const catList = document.getElementById('catList');
  BRANDS.forEach(brand => {
    const models = FLEET.filter(c => c.brand === brand);
    const li = document.createElement('li');
    li.className = 'cat-row';
    li.dataset.brand = brand;

    li.innerHTML = `
      <div class="cat-head" onclick="toggleCatRow(this.closest('.cat-row'))">
        <a href="javascript:void(0)" class="cat-head-label" onclick="event.stopPropagation(); toggleCatRow(this.closest('.cat-row'))">
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          ${brand.replace('-', ' ').toUpperCase()}
        </a>
        <button class="cat-toggle" onclick="event.stopPropagation(); toggleCatRow(this.closest('.cat-row'))">+</button>
      </div>
      <ul class="cat-sub">
        ${models.map(m => `<li><a href="javascript:void(0)" onclick="selectModel('${brand}','${m.name.replace(/'/g,"\\'")}')">${m.name}</a></li>`).join('')}
        <li><a href="javascript:void(0)" class="view-all" onclick="selectBrand('${brand}')">Lihat Semua</a></li>
      </ul>
    `;
    catList.appendChild(li);
  });

  /* Klik nama kategori / tombol + HANYA buka-tutup accordion, TIDAK memfilter grid mobil.
     Grid baru berubah saat user pilih mobil spesifik atau klik "Lihat Semua". */
  function toggleCatRow(row){
    if (!row) return;
    const isOpen = row.classList.toggle('open');
    row.querySelector('.cat-toggle').textContent = isOpen ? '−' : '+';
  }

  /* ---------- BANGUN CHECKLIST FILTER MEREK ---------- */
  const brandCheckList = document.getElementById('brandCheckList');
  BRANDS.forEach(brand => {
    const label = document.createElement('label');
    label.className = 'check-row';
    label.innerHTML = `<input type="checkbox" value="${brand}" onchange="toggleBrandCheckbox('${brand}', this.checked)"><span>${brand.replace('-', ' ')}</span>`;
    brandCheckList.appendChild(label);
  });

  function toggleBrandCheckbox(brand, checked){
    if (checked) selectedBrands.add(brand);
    else selectedBrands.delete(brand);
    selectedModel = null;
    syncSidebarActiveState();
    applyFilters();
  }

  /* Klik nama merek di tree (atau "Lihat Semua") -> filter tunggal ke merek itu */
  function selectBrand(brand){
    selectedBrands = new Set([brand]);
    selectedModel = null;
    syncSidebarActiveState();
    applyFilters();
    // buka submenu merek yang dipilih
    document.querySelectorAll('.cat-row').forEach(row => {
      const isThis = row.dataset.brand === brand;
      row.classList.toggle('open', isThis || row.classList.contains('open'));
      const btn = row.querySelector('.cat-toggle');
      if (isThis) btn.textContent = '−';
    });
  }

  /* Klik nama mobil spesifik di submenu -> filter ke satu model */
  function selectModel(brand, modelName){
    selectedBrands = new Set([brand]);
    selectedModel = modelName;
    syncSidebarActiveState();
    applyFilters();
  }

  function syncSidebarActiveState(){
    // centang ulang checkbox sesuai selectedBrands
    document.querySelectorAll('.brand-check-list input[type="checkbox"]').forEach(cb => {
      cb.checked = selectedBrands.has(cb.value);
    });
    // highlight brand aktif di tree
    document.querySelectorAll('.cat-row').forEach(row => {
      row.classList.toggle('active', selectedBrands.size === 1 && selectedBrands.has(row.dataset.brand));
      row.querySelectorAll('.cat-sub a').forEach(a => a.classList.remove('active'));
    });
    if (selectedModel){
      document.querySelectorAll('.cat-sub a').forEach(a => {
        if (a.textContent.trim() === selectedModel) a.classList.add('active');
      });
    }
  }

  function resetAll(){
    selectedBrands = new Set();
    selectedModel = null;
    searchTerm = '';
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.cat-row').forEach(row => {
      row.classList.remove('open','active');
      row.querySelector('.cat-toggle').textContent = '+';
    });
    syncSidebarActiveState();
    applyFilters();
  }

  /* ---------- BREADCRUMB ---------- */
  function updateBreadcrumb(){
    const bc = document.getElementById('breadcrumb');
    let html = `
      <a href="index.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></a>
      <span class="sep">›</span>
    `;
    if (selectedBrands.size === 0){
      html += `<span class="current">Armada</span>`;
    } else {
      html += `<a href="javascript:void(0)" onclick="resetAll()">Armada</a><span class="sep">›</span>`;
      if (selectedBrands.size === 1){
        const brand = [...selectedBrands][0];
        if (selectedModel){
          html += `<a href="javascript:void(0)" onclick="selectBrand('${brand}')">${brand.replace('-', ' ')}</a><span class="sep">›</span><span class="current">${selectedModel}</span>`;
        } else {
          html += `<span class="current">${brand.replace('-', ' ')}</span>`;
        }
      } else {
        html += `<span class="current">${selectedBrands.size} Merek Dipilih</span>`;
      }
    }
    bc.innerHTML = html;
  }

  /* ---------- RENDER GRID PRODUK ---------- */
  function waLinkFor(car){
    const msg = encodeURIComponent(`Halo LAJU Prestige, saya tertarik untuk menyewa ${car.name} (${car.price} / hari). Apakah unit ini tersedia?`);
    return `https://wa.me/6281234567890?text=${msg}`;
  }

  function applyFilters(){
    searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

    let result = FLEET.filter(car => {
      const brandMatch = selectedBrands.size === 0 || selectedBrands.has(car.brand);
      const modelMatch = !selectedModel || car.name === selectedModel;
      const searchMatch = !searchTerm ||
        car.name.toLowerCase().includes(searchTerm) ||
        car.brand.toLowerCase().includes(searchTerm);
      return brandMatch && modelMatch && searchMatch;
    });

    const grid = document.getElementById('productGrid');
    const countEl = document.getElementById('resultCount');

    if (result.length === 0){
      grid.innerHTML = `<div class="empty-state"><h4>Tidak ada unit ditemukan</h4><p>Coba ubah kata kunci pencarian atau reset filter merek.</p></div>`;
      countEl.textContent = 'Tidak ada hasil';
    } else {
      grid.innerHTML = result.map(car => `
        <div class="product-card">
          <div class="product-thumb">
            <span class="badge">Tersedia</span>
            <img src="${car.img}" alt="${car.name}" loading="lazy">
          </div>
          <div class="product-body">
            <h4>${car.name}</h4>
            <div class="product-price">${car.price} <span>/ hari</span></div>
            <div class="product-actions">
              <a class="btn-pesan" href="${waLinkFor(car)}" target="_blank">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.34a9.9 9.9 0 0 0 4.62 1.14h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.76.82-2.99-.2-.31a8.13 8.13 0 0 1-1.25-4.32c0-4.49 3.65-8.14 8.15-8.14 2.18 0 4.22.85 5.76 2.39a8.08 8.08 0 0 1 2.39 5.76c0 4.49-3.66 8.16-8.16 8.16zm4.47-6.11c-.24-.12-1.44-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z"/></svg>
                Pesan
              </a>
              <a class="btn-lihat-detail" href="../Detail/detail.html?car=${car.key}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Detail
              </a>
            </div>
          </div>
        </div>
      `).join('');
      countEl.innerHTML = `Menampilkan <strong>${result.length}</strong> dari <strong>${FLEET.length}</strong> unit`;
    }

    updateBreadcrumb();

    /* Cegah halaman "melompat" ke footer setelah grid mengecil (mis. abis ceklis filter merek).
       Kalau posisi scroll saat ini sudah lewat area katalog, tarik lembut kembali ke atas hasil. */
    const catalogEl = document.querySelector('.catalog-layout');
    if (catalogEl){
      const catalogTop = catalogEl.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY > catalogTop - 80){
        window.scrollTo({ top: Math.max(catalogTop - 90, 0), behavior:'smooth' });
      }
    }
  }

  applyFilters();