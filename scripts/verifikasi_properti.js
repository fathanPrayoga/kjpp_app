// Data dokumen setiap proyek
const projectDocuments = {
  'asri': [
    { name: 'PBB_Asri.pdf', size: '120 KB' },
    { name: 'DOK_Asri.pdf', size: '250 KB' },
    { name: 'PBB_Asri_3.pdf', size: '180 KB' }
  ],
  'badrul': [
    { name: 'Surat_Badrul.pdf', size: '300 KB' },
    { name: 'Laporan_Badrul.pdf', size: '700 KB' }
  ],
  'bedu2': [
    { name: 'SK_Bedu2.pdf', size: '50 KB' },
    { name: 'Foto_Lahan.zip', size: '1.2 MB' }
  ],
  'fahmi': [
    { name: 'Dok_Fahmi_A.pdf', size: '80 KB' }
  ]
};


// Elemen-elemen modal
const pdfListModal = document.getElementById('pdfListModal');
const pdfModalTitle = document.getElementById('pdfModalTitle');
const pdfListContent = document.getElementById('pdfListContent');
const closePdfModalBtn = document.getElementById('closePdfModalBtn');


// Fungsi untuk menutup modal
function closePdfModal() {
  pdfListModal.style.display = 'none';
}

// Event untuk tombol close dan klik di luar popup
if (closePdfModalBtn) closePdfModalBtn.addEventListener('click', closePdfModal);
if (pdfListModal) {
  pdfListModal.addEventListener('click', (e) => {
    if (e.target === pdfListModal) closePdfModal();
  });
}


// Fungsi untuk menampilkan daftar PDF
function showPdfList(projectId, projectName) {
  pdfModalTitle.textContent = `Project ${projectName}`;
  pdfListContent.innerHTML = '';

  const documents = projectDocuments[projectId] || [];

  if (documents.length > 0) {
    documents.forEach(doc => {
      const docElement = document.createElement('div');
      docElement.classList.add('document-item');

      const iconClass = doc.name.toLowerCase().endsWith('.pdf')
        ? 'far fa-file-pdf pdf-icon'
        : 'fas fa-file file-icon';

      docElement.innerHTML = `
        <div class="file-info">
          <i class="${iconClass}"></i>
          <span class="file-name">${doc.name}</span>
        </div>
        <div class="file-actions">
          <span class="file-size">${doc.size}</span>
          <button class="btn-download"><i class="fas fa-download"></i></button>
        </div>
      `;

      pdfListContent.appendChild(docElement);
    });
  } else {
    pdfListContent.innerHTML =
      '<p style="text-align:center;color:#777;padding:20px;">Tidak ada dokumen ditemukan untuk proyek ini.</p>';
  }

  pdfListModal.style.display = 'flex';
}


// Event: klik pada item dokumen
document.querySelectorAll('.document-item').forEach(item => {
  item.addEventListener('click', () => {
    const projectName = item.querySelector('.doc-name').textContent;
    const projectId = projectName.toLowerCase();
    showPdfList(projectId, projectName);
  });
});
