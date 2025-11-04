//  INTI FUNGSI MODAL PROJECT 
const PROJECT_STORAGE_KEY = 'project_reports';

// Pengelola Data LocalStorage
function getProjectData() {
  const data = localStorage.getItem(PROJECT_STORAGE_KEY);
  // Mengembalikan array data proyek, atau array kosong jika belum ada
  return data ? JSON.parse(data) : [];
}

function saveProjectData(data) {
  // Menyimpan data proyek ke LocalStorage
  localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(data));
}

//  Fungsi Buka/Tutup Modal Project 
function openModal(projectName) {
  const modal = document.getElementById("projectModal");
  modal.style.display = "flex";

  // Ambil data proyek saat ini untuk mengisi form jika proyek sudah ada
  const allProjects = getProjectData();
  const existingProject = allProjects.find(p => p.namaProject === projectName);

  document.getElementById("modalTitle").innerText = "Laporan: " + projectName;
  document.getElementById("namaProject").value = projectName;
  
  if (existingProject) {
    // Isi form dengan data yang sudah ada (untuk operasi Update)
    document.getElementById("asalInstansi").value = existingProject.asalInstansi || "";
    document.getElementById("tanggalMulai").value = existingProject.tanggalMulai || "";
  } else {
    // Kosongkan input lain jika proyek baru
    document.getElementById("asalInstansi").value = "";
    document.getElementById("tanggalMulai").value = "";
  }
}

// Tombol tutup modal Project
const closeProjectBtn = document.getElementById("closeModalBtn");
if (closeProjectBtn) {
  closeProjectBtn.onclick = () => {
    document.getElementById("projectModal").style.display = "none";
  };
}

// Tutup modal Project ketika klik area luar
window.onclick = (e) => {
  const projectModal = document.getElementById("projectModal");
  if (e.target === projectModal) {
    projectModal.style.display = "none";
  }
};

//  Penanganan Unggah/Update Data Project 
const submitBtn = document.querySelector(".submit-btn");
if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const namaProject = document.getElementById("namaProject").value.trim();
    const asalInstansi = document.getElementById("asalInstansi").value.trim();
    const tanggalMulai = document.getElementById("tanggalMulai").value;
    const inputFile = document.querySelector("input[type='file']");
    
    if (!namaProject || !asalInstansi || !tanggalMulai) {
      alert("⚠️ Semua kolom (Nama Project, Asal Instansi, Tanggal Mulai) harus diisi!");
      return;
    }

    const allProjects = getProjectData();
    let projectFound = false;

    // Cek apakah proyek sudah ada (berdasarkan nama project)
    const updatedProjects = allProjects.map(project => {
      if (project.namaProject === namaProject) {
        projectFound = true;
        // Update data proyek yang sudah ada
        return {
          namaProject,
          asalInstansi,
          tanggalMulai,
          // Menjaga dokumen sebelumnya atau mencatat dokumen baru (simulasi nama file)
          dokumen: inputFile.files.length > 0 ? inputFile.files[0].name : project.dokumen || "Belum ada dokumen",
          tanggalUpdate: new Date().toISOString().slice(0, 10)
        };
      }
      return project;
    });

    if (!projectFound) {
      // Jika proyek belum ada, tambahkan sebagai proyek baru
      updatedProjects.push({
        namaProject,
        asalInstansi,
        tanggalMulai,
        dokumen: inputFile.files.length > 0 ? inputFile.files[0].name : "Belum ada dokumen",
        tanggalDibuat: new Date().toISOString().slice(0, 10)
      });
    }

    saveProjectData(updatedProjects);
    
    alert(`✅ Data Project: ${namaProject} berhasil di ${projectFound ? 'UPDATE' : 'UNGGAH'}! Data tersimpan di LocalStorage.`);
    
    document.getElementById("projectModal").style.display = "none";
  });
}
