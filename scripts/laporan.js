// == NAVIGASI HALAMAN LAPORAN ==
function tampilkanLaporan(tipe) {
  if (tipe === "project") {
    window.location.href = "../pages/laporan_project.html";
  } else if (tipe === "tahunan") {
    window.location.href = "../pages/laporan_tahunan.html";
  }
}

// == MODAL POPUP ==
function openModal(projectName = "") {
  const modal = document.getElementById("projectModal");
  const title = document.getElementById("modalTitle");
  const inputProject = document.getElementById("namaProject");

  modal.style.display = "flex";

  if (projectName !== "") {
    title.innerText = "Laporan : " + projectName;
    inputProject.value = projectName;
  }
}

// Tombol buka modal pada halaman laporan_project
const openBtn = document.getElementById("openModalBtn");
if (openBtn) {
  openBtn.onclick = () => openModal();
}

// Tombol tutup modal
const closeBtn = document.getElementById("closeModalBtn");
if (closeBtn) {
  closeBtn.onclick = () => {
    document.getElementById("projectModal").style.display = "none";
  };
}

// Klik di luar modal untuk menutup
window.onclick = (e) => {
  const modal = document.getElementById("projectModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Buka modal
function openModal(projectName) {
  const modal = document.getElementById("projectModal");
  modal.style.display = "flex";

  document.getElementById("modalTitle").innerText = projectName;
  document.getElementById("namaProject").value = projectName;
}

// Tutup modal
document.getElementById("closeModalBtn").onclick = () => {
  document.getElementById("projectModal").style.display = "none";
};

// Tutup modal ketika klik area luar
window.onclick = (e) => {
  if (e.target.id === "projectModal") {
    document.getElementById("projectModal").style.display = "none";
  }
};


// Data laporan berdasarkan tahun
const laporanTahunan = {
  "2020": ["Laporan_GUS.pdf", "Laporan_SUI.pdf", "Laporan_Ari.pdf", "Laporan_Sri.pdf"],
  "2019": ["Laporan_XYZ.pdf", "Laporan_Joko.pdf"],
  "2018": ["Laporan_UnitA.pdf", "Laporan_UnitB.pdf", "Laporan_UnitC.pdf"],
  "2017": ["Laporan_Divisi1.pdf"]
};

function openTahunanModal(tahun) {
  document.getElementById("tahunanModal").style.display = "flex";
  document.getElementById("modalTahunTitle").innerText = "Laporan " + tahun;

  const fileList = document.getElementById("tahunanFileList");
  fileList.innerHTML = ""; // reset isi

  laporanTahunan[tahun].forEach(file => {
    fileList.innerHTML += `
      <div class="file-item">
        <img src="../assets/pdf-icon.png">
        <span>${file}</span>
        <span class="file-download-btn">&#8681;</span>
      </div>
    `;
  });
}

const modal = document.getElementById("tahunanModal");
const closeModal = document.getElementById("closeTahunanModal");
const downloadAll = document.getElementById("downloadAllBtn");

closeModal.onclick = () => modal.style.display = "none";
downloadAll.onclick = () => alert("Fitur unduh semua belum dibuat 😄");
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
