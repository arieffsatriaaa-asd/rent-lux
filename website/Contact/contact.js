
  // ---------- Form Request Booking -> validasi per-field (kayak sendHeroBookingToWA di index.html) -> alihkan ke WhatsApp ----------
  const contactBookingForm = document.getElementById('contactBookingForm');
  const cbWarn = document.getElementById('cbWarn');

  contactBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const namaEl = document.getElementById('cbNama');
    const hpEl = document.getElementById('cbHp');
    const emailEl = document.getElementById('cbEmail');
    const mobilEl = document.getElementById('cbMobil');
    const mulaiEl = document.getElementById('cbMulai');
    const selesaiEl = document.getElementById('cbSelesai');
    const pesanEl = document.getElementById('cbPesan');

    const nama = namaEl.value.trim();
    const hp = hpEl.value.trim();
    const email = emailEl.value.trim();
    const mobil = mobilEl.value.trim();
    const mulai = mulaiEl.value;
    const selesai = selesaiEl.value;
    const pesan = pesanEl.value.trim();

    // Validasi: semua field wajib terisi dulu sebelum diteruskan ke WhatsApp
    const fields = [
      { wrap: document.getElementById('fldNama'), valid: nama !== '' },
      { wrap: document.getElementById('fldHp'), valid: hp !== '' },
      { wrap: document.getElementById('fldEmail'), valid: email !== '' },
      { wrap: document.getElementById('fldMobil'), valid: mobil !== '' },
      { wrap: document.getElementById('fldMulai'), valid: mulai !== '' },
      { wrap: document.getElementById('fldSelesai'), valid: selesai !== '' },
      { wrap: document.getElementById('fldPesan'), valid: pesan !== '' }
    ];

    let allValid = true;
    fields.forEach(f => {
      f.wrap.classList.remove('field-invalid');
      void f.wrap.offsetWidth; // reset animasi shake biar bisa trigger ulang
      if (!f.valid) {
        allValid = false;
        f.wrap.classList.add('field-invalid');
      }
    });

    if (!allValid) {
      cbWarn.classList.add('show');
      return;
    }
    cbWarn.classList.remove('show');

    const waText = `Halo LAJU Prestige, saya ingin mengajukan permintaan booking:

• Nama Lengkap: ${nama}
• No HP/WhatsApp: ${hp}
• Email: ${email}
• Mobil yang Diminati: ${mobil || '-'}
• Tanggal Ambil: ${mulai}
• Tanggal Kembali: ${selesai}
• Pesan: ${pesan || '-'}

Mohon informasi ketersediaan armada untuk jadwal tersebut, terima kasih!`;

    window.open(`https://api.whatsapp.com/send?phone=6281234567890&text=${encodeURIComponent(waText)}`, '_blank');
  });