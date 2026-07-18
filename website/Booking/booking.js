
  const params = new URLSearchParams(window.location.search);
  const preselect = params.get('car');
  const unitSelect = document.getElementById('unit');
  
  if(preselect){
    for(const opt of unitSelect.options){ if(opt.value === preselect) opt.selected = true; }
  }

  function recalculateSummary(){
    const opt = unitSelect.options[unitSelect.selectedIndex];
    const price = Number(opt.dataset.price || 0);
    
    document.getElementById('summaryImg').src = opt.dataset.img;
    document.getElementById('summaryName').textContent = opt.dataset.name;
    document.getElementById('summaryType').textContent = opt.dataset.type;
    document.getElementById('sumTarif').textContent = 'Rp ' + price.toLocaleString('id-ID');

    const tglA = document.getElementById('tglambil').value;
    const tglK = document.getElementById('tglkembali').value;
    let durasi = 1;
    if(tglA && tglK){
      const d1 = new Date(tglA), d2 = new Date(tglK);
      const diff = Math.round((d2 - d1) / (1000*60*60*24));
      durasi = diff > 0 ? diff : 1;
    }
    document.getElementById('sumDurasi').textContent = durasi + ' hari';
    document.getElementById('sumTotal').textContent = 'Rp ' + (price * durasi).toLocaleString('id-ID');
  }

  unitSelect.addEventListener('change', recalculateSummary);
  document.getElementById('tglambil').addEventListener('change', recalculateSummary);
  document.getElementById('tglkembali').addEventListener('change', recalculateSummary);
  recalculateSummary();

  // Form Submit Action directly forward into WhatsApp endpoint API
  document.getElementById('whatsappForm').addEventListener('submit', function(e){
    e.preventDefault();
    
    const nama = document.getElementById('nama').value;
    const hp = document.getElementById('hp').value;
    const unitText = unitSelect.options[unitSelect.selectedIndex].dataset.name;
    const kota = document.getElementById('kota').value;
    const tglAmbil = document.getElementById('tglambil').value;
    const tglKembali = document.getElementById('tglkembali').value;
    const titik = document.getElementById('titik').value || '-';
    const totalEstimasi = document.getElementById('sumTotal').textContent;

    // Format template text WhatsApp
    const waText = `Halo LAJU Prestige, saya ingin mengajukan reservasi sewa mobil harian:

• Nama Lengkap: ${nama}
• No WhatsApp: ${hp}
• Pilihan Unit: ${unitText}
• Wilayah Sewa: ${kota}
• Tanggal Pengambilan: ${tglAmbil}
• Tanggal Pengembalian: ${tglKembali}
• Titik Antar-Jemput: ${titik}
• Estimasi Biaya: ${totalEstimasi}

Mohon konfirmasi ketersediaan jadwal unit ini, terima kasih!`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://api.whatsapp.com/send?phone=6281234567890&text=${encodedText}`;
    
    window.open(waUrl, '_blank');
  });