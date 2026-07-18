  // Database ringkas seluruh unit armada (dipakai untuk pencarian)
  // category = key filter yang selaras dengan fleet-tabs di index.html
  const allCars = [
    { key:'mercedes-e300', name:'Mercedes-Benz E 300 AMG Line', type:'Sedan Eksekutif', category:'sedan', sub:'Tahun 2024 · Luxury Saloon', price:'Rp 1,85jt', img:'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80' },
    { key:'bmw-530i', name:'BMW 530i M Sport', type:'Sporty Executive', category:'sedan', sub:'Tahun 2023 · High Performance Sport', price:'Rp 1,75jt', img:'https://images.unsplash.com/photo-1601929862217-f1bf94503333?auto=format&fit=crop&w=800&q=80' },
    { key:'porsche-911', name:'Porsche 911 Carrera', type:'Sportscar Eksklusif', category:'sport', sub:'Tahun 2023 · Pure Super Sport', price:'Rp 3,5jt', img:'https://images.unsplash.com/photo-1580679568899-be51739ba2df?auto=format&fit=crop&w=800&q=80' },
    { key:'alphard', name:'Toyota Alphard 2.5 G', type:'VIP MPV', category:'mpv', sub:'Tahun 2024 · Premium VIP MPV', price:'Rp 2,2jt', img:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80' },
    { key:'audi-a6', name:'Audi A6 45 TFSI', type:'Premium Cruiser', category:'sedan', sub:'Tahun 2023 · Premium Business Cruiser', price:'Rp 1,6jt', img:'https://images.unsplash.com/photo-1599912027611-484b9fc447af?auto=format&fit=crop&w=800&q=80' },
    { key:'mini-cooper', name:'Mini Cooper S', type:'Compact Premium', category:'compact', sub:'Tahun 2023 · Compact Premium Hatch', price:'Rp 1,4jt', img:'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80' },
    { key:'range-rover-sport', name:'Range Rover Sport HSE', type:'SUV Premium', category:'suv', sub:'Tahun 2023 · Luxury SUV Performance', price:'Rp 2,9jt', img:'https://images.unsplash.com/photo-1671614415338-68728dd833ea?auto=format&fit=crop&w=800&q=80' },
    { key:'lexus-es300h', name:'Lexus ES 300h', type:'Sedan Eksekutif', category:'sedan', sub:'Tahun 2024 · Hybrid Executive Sedan', price:'Rp 2,0jt', img:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' },
    { key:'honda-crv', name:'Honda CR-V Turbo Prestige', type:'SUV Keluarga', category:'suv', sub:'Tahun 2023 · Family SUV Turbo', price:'Rp 1,3jt', img:'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=800&q=80' }
  ];

  // Label tombol kategori, selaras dengan fleet-tabs index.html
  const categoryMeta = {
    all: 'Semua Kelas',
    sedan: 'Sedan Eksekutif',
    mpv: 'MPV Premium',
    sport: 'Sportscar',
    compact: 'Compact Premium',
    suv: 'SUV Premium'
  };

  const params = new URLSearchParams(window.location.search);
  const query = (params.get('q') || '').trim();
  document.getElementById('queryDisplay').textContent = query ? `"${query}"` : 'Semua Unit';

  const keyword = query.toLowerCase();
  const matches = allCars.filter(c =>
    !keyword || c.name.toLowerCase().includes(keyword) || c.type.toLowerCase().includes(keyword) || categoryMeta[c.category].toLowerCase().includes(keyword)
  );

  const grid = document.getElementById('resultGrid');
  document.getElementById('resultCount').textContent = `${matches.length} unit ditemukan`;

  // Render satu grid kartu mobil
  function renderCarGrid(cars){
    return cars.map(c => `
      <a class="car-card" href="mobil-detail.html?car=${c.key}">
        <div class="car-img">
          <span class="car-tag">${c.type}</span>
          <img src="${c.img}" alt="${c.name}">
        </div>
        <div class="car-body">
          <h3>${c.name}</h3>
          <div class="car-sub">${c.sub}</div>
          <div class="car-foot">
            <div class="price-block"><span class="price">${c.price}</span><span class="per"> / hari</span></div>
            <span class="btn btn-outline-gold">Detail</span>
          </div>
        </div>
      </a>
    `).join('');
  }

  if (matches.length === 0) {
    grid.innerHTML = `<div class="empty-state">
      <h3>Unit "${query}" tidak ditemukan</h3>
      <p>Coba kata kunci lain seperti nama merek (BMW, Mercedes, Alphard) atau tipe unit (SUV, Sedan, Sportscar).</p>
      <a href="https://wa.me/6281234567890?text=Halo%20LAJU%20Prestige%2C%20saya%20mencari%20unit%20${encodeURIComponent(query)}" target="_blank" class="btn btn-primary">Tanya Admin via WA</a>
    </div>`;
  } else {
    // Tentukan daftar tombol kategori yang muncul:
    // - Tanpa keyword -> tampilkan semua tombol kategori (Semua Kelas + 5 kategori)
    // - Ada keyword -> HANYA tampilkan tombol kategori yang cocok dengan hasil pencarian
    //   (misal cari "bmw" -> BMW masuk kategori Sedan Eksekutif, maka cuma tombol itu yang muncul)
    const availableCats = keyword ? [...new Set(matches.map(c => c.category))] : ['all','sedan','mpv','sport','compact','suv'];
    let activeCat = keyword ? availableCats[0] : 'all';

    function renderByCategory(){
      const catCars = activeCat === 'all' ? allCars : allCars.filter(c => c.category === activeCat);

      const tabsHtml = availableCats.map(cat => `<button data-cat="${cat}" class="${cat === activeCat ? 'active' : ''}">${categoryMeta[cat]}</button>`).join('');

      grid.innerHTML = `
        <div class="section-head">
          <p class="eyebrow">Armada ${categoryMeta[activeCat]}</p>
          <h2>Pilihan Unit ${categoryMeta[activeCat]}</h2>
          <p>${catCars.length} unit tersedia dalam kategori ini${keyword ? `, termasuk hasil pencarian "${query}" Anda` : ''}.</p>
        </div>
        <div class="fleet-tabs" id="categoryTabs">${tabsHtml}</div>
        <div class="fleet-grid">${renderCarGrid(catCars)}</div>
      `;

      document.querySelectorAll('#categoryTabs button').forEach(btn => {
        btn.addEventListener('click', () => {
          activeCat = btn.dataset.cat;
          renderByCategory();
        });
      });
    }

    renderByCategory();
  }

  // Isi grid Rekomendasi Lain (di luar hasil pencarian saat ini)
  const matchedKeys = new Set(matches.map(c => c.key));
  let recommended = allCars.filter(c => !matchedKeys.has(c.key)).slice(0, 3);
  if (recommended.length < 3) {
    recommended = allCars.slice(0, 3);
  }
  document.getElementById('similarGrid').innerHTML = renderCarGrid(recommended);