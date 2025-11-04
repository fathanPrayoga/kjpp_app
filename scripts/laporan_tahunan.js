document.addEventListener('DOMContentLoaded', () => {
    // Ambil Elemen Modal
    const modal = document.getElementById('tahunanModal');
    const closeBtn = document.getElementById('closeTahunanModal');
    const modalTahunTitle = document.getElementById('modalTahunTitle');
    const tahunanFileList = document.getElementById('tahunanFileList');
    const downloadAllBtn = document.getElementById('downloadAllBtn');

    // Data Laporan Dummy (sesuai tampilan UI Anda)
    // Di lingkungan nyata, data ini akan diambil dari API.
    const annualReportsData = {
        '2020': [
            { name: 'Laporan_GUS.pdf', url: '/files/2020/laporan_gus.pdf' },
            { name: 'Laporan_SUI.pdf', url: '/files/2020/laporan_sui.pdf' },
            { name: 'Laporan_ARI.pdf', url: '/files/2020/laporan_ari.pdf' },
            { name: 'Laporan_SRI.pdf', url: '/files/2020/laporan_sri.pdf' },
        ],
        '2019': [
            { name: 'Laporan_Keuangan_2019.pdf', url: '/files/2019/keuangan.pdf' },
            { name: 'Ringkasan_Eksekutif_2019.pdf', url: '/files/2019/ringkasan.pdf' },
        ],
        '2018': [
            { name: 'Laporan_Tahunan_2018_Final.pdf', url: '/files/2018/final.pdf' },
        ],
        '2017': [
            { name: 'Presentasi_2017.pdf', url: '/files/2017/presentasi.pdf' },
        ],
    };

    // Fungsi untuk membuat elemen file item di modal
    const createFileItem = (file) => {
        const item = document.createElement('div');
        item.classList.add('file-item');

        // Menggunakan ikon PDF placeholder dan ikon download (Unicode)
        item.innerHTML = `
            <img src="../assets/pdf_icon.png" alt="PDF Icon" onerror="this.style.display='none'"> 
            <span>${file.name}</span>
            <span class="file-download-btn" data-url="${file.url}" title="Unduh File">
                &#x21E9; </span>
        `;
        
        // Tambahkan event listener untuk unduhan per file
        const downloadSingleBtn = item.querySelector('.file-download-btn');
        downloadSingleBtn.addEventListener('click', (e) => {
            const fileUrl = e.currentTarget.dataset.url;
            console.log(`Mengunduh file: ${file.name}`);
            alert(`Simulasi Unduh: ${file.name}`);
            // Untuk unduhan sebenarnya: window.open(fileUrl, '_blank');
        });

        return item;
    };

    // Fungsi utama untuk membuka modal (Global agar bisa dipanggil dari onclick di HTML)
    window.openTahunanModal = (tahun) => {
        const files = annualReportsData[tahun];

        if (!files || files.length === 0) {
            alert(`Data laporan untuk tahun ${tahun} tidak ditemukan.`);
            return;
        }

        // Isi Konten Modal
        modalTahunTitle.textContent = `Laporan ${tahun}`;
        tahunanFileList.innerHTML = ''; // Kosongkan list sebelumnya

        files.forEach(file => {
            tahunanFileList.appendChild(createFileItem(file));
        });

        // Atur tombol "Unduh Semua"
        downloadAllBtn.onclick = () => {
            console.log(`Mengunduh SEMUA file untuk tahun ${tahun}`);
            alert(`Simulasi Unduh Semua Laporan Tahun ${tahun}`);
        };

        // Tampilkan Modal
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    };

    // Event listener untuk tombol tutup (X)
    closeBtn.addEventListener('click', closeModal);

    // Event listener untuk klik di luar modal (overlay)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Event listener untuk tombol ESC
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
});