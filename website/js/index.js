  // Filter Grid System
  const tabs = document.querySelectorAll('.fleet-tabs button');
  const cards = document.querySelectorAll('.car-card');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      cards.forEach(card => { card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none'; });
    });
  });

  // Klik tile kategori foto mobil -> filter fleet tab terkait & scroll ke armada
  function goToCategory(filterKey) {
    const targetBtn = document.querySelector(`.fleet-tabs button[data-filter="${filterKey}"]`);
    if (targetBtn) targetBtn.click();
    document.getElementById('armada').scrollIntoView({behavior:'smooth'});
  }

  // Cari mobil: arahkan ke halaman hasil pencarian terpisah (bukan scroll di index.html)
  function searchFleet() {
    const keyword = document.getElementById('searchCarInput').value.trim();
    window.location.href = `/search?q=${encodeURIComponent(keyword)}`;
  }

  // Kirim data booking bar bawah hero langsung ke WhatsApp Admin, tapi wajib isi semua form dulu
  function sendHeroBookingToWA() {
    const namaEl = document.getElementById('barName');
    const hpEl = document.getElementById('barPhone');
    const tglMulaiEl = document.getElementById('barStartDate');
    const tglSelesaiEl = document.getElementById('barEndDate');

    const nama = namaEl.value.trim();
    const hp = hpEl.value.trim();
    const tglMulai = tglMulaiEl.value;
    const tglSelesai = tglSelesaiEl.value;

    // Validasi: semua field wajib terisi dulu sebelum diteruskan ke WhatsApp
    const fields = [
      { el: namaEl, valid: nama !== '' },
      { el: hpEl, valid: hp !== '' },
      { el: tglMulaiEl, valid: tglMulai !== '' },
      { el: tglSelesaiEl, valid: tglSelesai !== '' }
    ];

    let allValid = true;
    fields.forEach(f => {
      if (!f.valid) {
        allValid = false;
        f.el.classList.add('field-invalid');
      } else {
        f.el.classList.remove('field-invalid');
      }
    });

    if (!allValid) {
      let warnEl = document.getElementById('barWarnMsg');
      if (!warnEl) {
        warnEl = document.createElement('div');
        warnEl.id = 'barWarnMsg';
        warnEl.style.cssText = 'grid-column:1/-1;color:#FF6B6B;font-size:12px;font-weight:600;margin-top:-8px;';
        document.querySelector('.horizontal-booking-bar').appendChild(warnEl);
      }
      warnEl.textContent = 'Mohon lengkapi semua data (Nama, No. HP, Tanggal Mulai & Selesai) sebelum melanjutkan ke WhatsApp.';
      return;
    } else {
      const warnEl = document.getElementById('barWarnMsg');
      if (warnEl) warnEl.remove();
    }

    const waText = `Halo LAJU Prestige, saya ingin mengajukan reservasi sewa mobil:

• Nama Lengkap: ${nama}
• No WhatsApp: +62 ${hp}
• Tanggal Mulai Sewa: ${tglMulai}
• Tanggal Selesai Sewa: ${tglSelesai}

Mohon informasi ketersediaan armada untuk jadwal tersebut, terima kasih!`;

    window.open(`https://api.whatsapp.com/send?phone=6281234567890&text=${encodeURIComponent(waText)}`, '_blank');
  }

  // FAQ Accordion Trigger
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Tutup FAQ lain yang sedang aktif (opsional, biar rapi)
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      // Toggle class active pada faq yang diklik
      item.classList.toggle('active');
    });
  });

  // ---------- TESTIMONIAL / GOOGLE REVIEWS CAROUSEL (infinite loop, geser tiap 3 detik) ----------
  const testiData = [
    { name:"Michael B.", sub:"Local Guide · 178 ulasan", time:"5 bulan lalu", stars:5, color:"#D6336C", text:"Pelayanannya luar biasa dari awal booking sampai unit dikembalikan. Kondisi mobilnya rapi dan nyaman dikendarai." },
    { name:"Ahmad R.", sub:"Local Guide · 73 ulasan", time:"2 minggu lalu", stars:5, color:"#E8590C", text:"Prosesnya cepat dan mobil diantar tepat waktu dalam kondisi bersih. Sangat direkomendasikan untuk sewa mobil mewah." },
    { name:"Sarah K.", sub:"128 ulasan", time:"3 minggu lalu", stars:5, color:"#1971C2", text:"Proses booking sangat mudah dan stafnya profesional. Kondisi mobilnya prima, pengalamannya menyenangkan." },
    { name:"Dewi A.", sub:"54 ulasan", time:"1 bulan lalu", stars:5, color:"#0CA678", text:"Armadanya lengkap dan harganya transparan tanpa biaya tersembunyi. Adminnya fast response banget." },
    { name:"Budi S.", sub:"Local Guide · 41 ulasan", time:"1 bulan lalu", stars:5, color:"#5F3DC4", text:"Sewa Alphard buat acara keluarga, unitnya bersih wangi dan sopirnya tepat waktu. Puas banget." },
    { name:"Rina P.", sub:"22 ulasan", time:"2 bulan lalu", stars:4, color:"#C2255C", text:"Pelayanan oke dan mobil sesuai foto. Cuma proses konfirmasi agak lama pas weekend." },
    { name:"Hendra T.", sub:"Local Guide · 96 ulasan", time:"2 bulan lalu", stars:5, color:"#2F9E44", text:"Sewa Porsche buat kebutuhan konten, hasilnya memuaskan. Unitnya terawat dan sesuai ekspektasi." },
    { name:"Lisa M.", sub:"63 ulasan", time:"3 bulan lalu", stars:5, color:"#F08C00", text:"Tim LAJU Prestige sangat membantu dari pemilihan unit sampai antar-jemput ke bandara." },
    { name:"Fajar W.", sub:"15 ulasan", time:"4 bulan lalu", stars:5, color:"#1098AD", text:"Deposit nol bikin tenang, prosesnya juga cepat. Bakal repeat order buat trip berikutnya." },
    { name:"Nadia F.", sub:"Local Guide · 87 ulasan", time:"5 bulan lalu", stars:5, color:"#E64980", text:"Range Rover-nya mulus dan interiornya wangi. Recommended untuk yang butuh SUV premium di Batam." }
  ];

  const testiCount = testiData.length;
  function buildTestiCard(t){
    const initial = t.name.trim().charAt(0).toUpperCase();
    const stars = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
    return `
      <div class="testi-card">
        <div class="testi-card-top">
          <div class="testi-avatar" style="background:${t.color};">${initial}</div>
          <div>
            <div class="testi-name">${t.name}</div>
            <div class="testi-sub">${t.sub}</div>
          </div>
        </div>
        <div class="testi-meta-row">
          <span class="testi-card-stars">${stars}</span>
          <span class="testi-card-time">${t.time}</span>
        </div>
        <p class="testi-text">${t.text}</p>
      </div>
    `;
  }

  const testiTrack = document.getElementById('testiTrack');
  // Gandakan data 3x biar carousel-nya bisa geser terus tanpa terasa "habis" (muter-muter loop)
  const testiTripled = [...testiData, ...testiData, ...testiData];
  testiTrack.innerHTML = testiTripled.map(buildTestiCard).join('');

  let testiIndex = testiCount; // mulai dari salinan tengah
  function getTestiStep(){
    const card = testiTrack.querySelector('.testi-card');
    if (!card) return 0;
    const gap = 22;
    return card.getBoundingClientRect().width + gap;
  }
  function updateTestiPosition(animate){
    testiTrack.classList.toggle('animate', animate);
    const step = getTestiStep();
    testiTrack.style.transform = `translateX(${-testiIndex * step}px)`;
  }
  function testiNext(){
    testiIndex++;
    updateTestiPosition(true);
  }
  function testiPrev(){
    testiIndex--;
    updateTestiPosition(true);
  }
  // Reset instan tanpa animasi begitu masuk ke salinan paling ujung, biar keliatan "gaada abisnya"
  testiTrack.addEventListener('transitionend', () => {
    if (testiIndex >= testiCount * 2) {
      testiIndex -= testiCount;
      updateTestiPosition(false);
    } else if (testiIndex < testiCount) {
      testiIndex += testiCount;
      updateTestiPosition(false);
    }
  });

  document.getElementById('testiNextBtn').addEventListener('click', testiNext);
  document.getElementById('testiPrevBtn').addEventListener('click', testiPrev);

  // Auto-geser tiap 5 detik meskipun tidak diklik
  let testiAutoplay = setInterval(testiNext, 5000);

  // Posisikan ulang saat resize layar (card width berubah)
  window.addEventListener('resize', () => updateTestiPosition(false));

  // Set posisi awal setelah semua elemen ter-render
  window.requestAnimationFrame(() => updateTestiPosition(false));

  // ---------- FORM TULIS ULASAN: dropzone foto pendukung (klik/drag & drop) ----------
  const fileDrop = document.getElementById('fileDrop');
  const revPhotoInput = document.getElementById('revPhoto');
  const fileChipName = document.getElementById('fileChipName');
  const fileChipRemove = document.getElementById('fileChipRemove');

  function setFileName(file){
    if (file) {
      fileChipName.textContent = file.name.length > 24 ? file.name.slice(0, 21) + '...' : file.name;
      fileDrop.classList.add('has-file');
    } else {
      fileDrop.classList.remove('has-file');
    }
  }

  revPhotoInput.addEventListener('change', () => setFileName(revPhotoInput.files[0]));

  fileChipRemove.addEventListener('click', (e) => {
    e.stopPropagation();
    revPhotoInput.value = '';
    setFileName(null);
  });

  ['dragenter', 'dragover'].forEach(evt => {
    fileDrop.addEventListener(evt, (e) => {
      e.preventDefault(); e.stopPropagation();
      fileDrop.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach(evt => {
    fileDrop.addEventListener(evt, (e) => {
      e.preventDefault(); e.stopPropagation();
      fileDrop.classList.remove('dragover');
    });
  });
  fileDrop.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length) {
      revPhotoInput.files = dt.files;
      setFileName(dt.files[0]);
    }
  });

  // ---------- FORM TULIS ULASAN: rating bintang interaktif + fake submit elegan ----------
  const starButtons = document.querySelectorAll('.star-btn');
  const revRatingInput = document.getElementById('revRating');
  const starRatingWrap = document.getElementById('starRating');
  const starError = document.getElementById('starError');
  let selectedRating = 0;

  function paintStars(value){
    starButtons.forEach(btn => {
      const v = parseInt(btn.dataset.value, 10);
      btn.classList.toggle('filled', v <= value);
    });
  }
  starButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => paintStars(parseInt(btn.dataset.value, 10)));
    btn.addEventListener('click', () => {
      selectedRating = parseInt(btn.dataset.value, 10);
      revRatingInput.value = selectedRating;
      paintStars(selectedRating);
      starError.classList.remove('show');
    });
  });
  starRatingWrap.addEventListener('mouseleave', () => paintStars(selectedRating));

  const reviewForm = document.getElementById('reviewForm');
  const reviewSuccess = document.getElementById('reviewSuccess');
  const reviewSubmitBtn = document.getElementById('reviewSubmitBtn');
  const reviewResetBtn = document.getElementById('reviewResetBtn');

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (selectedRating === 0) {
      starError.classList.add('show');
      starRatingWrap.classList.remove('error-shake');
      // trigger ulang animasi shake
      void starRatingWrap.offsetWidth;
      starRatingWrap.classList.add('error-shake');
      return;
    }

    // Fake submit: simulasikan proses pengiriman dengan sedikit delay biar terasa elegan
    reviewSubmitBtn.disabled = true;
    reviewSubmitBtn.textContent = 'Mengirim...';

    setTimeout(() => {
      reviewForm.style.display = 'none';
      reviewSuccess.classList.add('show');
    }, 900);
  });

  reviewResetBtn.addEventListener('click', () => {
    reviewForm.reset();
    selectedRating = 0;
    revRatingInput.value = 0;
    paintStars(0);
    starError.classList.remove('show');
    reviewSubmitBtn.disabled = false;
    reviewSubmitBtn.innerHTML = 'Kirim Ulasan <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
    setFileName(null);
    reviewSuccess.classList.remove('show');
    reviewForm.style.display = '';
  });