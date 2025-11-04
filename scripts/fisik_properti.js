const fisikData = [
  { nama: "Asri", proyek: "Project Asri", nilai: 11.00 },
  { nama: "Rosa", proyek: "Project Rosa", nilai: 18.47 },
  { nama: "Rega", proyek: "Project Rega", nilai: 19.87 },
  { nama: "Fahmi", proyek: "Project Fahmi", nilai: 1.47 }
];

const tableBody = document.querySelector("#fisik-table tbody");
fisikData.forEach(item => {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="checkbox" /></td>
    <td>${item.nama}</td>
    <td>${item.proyek}</td>
    <td>${item.nilai.toFixed(2)}</td>
  `;
  row.addEventListener("click", (e) => {
    if (e.target.tagName !== "INPUT") {
      openPopup(item);
    }
  });
  tableBody.appendChild(row);
});

document.querySelector(".btn-primary").addEventListener("click", () => {
  alert("Data diverifikasi!");
});

document.querySelector(".btn-outline").addEventListener("click", () => {
  alert("Data ditolak.");
});
//Logik popup
function openPopup(data) {
  currentProject = data.proyek;
  const popup = document.getElementById("popup");
  popup.style.display = "flex";
  popup.querySelector(".popup-header h3").textContent = currentProject;
  renderPopupElements();
}


function closePopup() {
  document.getElementById("popup").style.display = "none";
}

const projectElements = {
  "Project Asri": [
    {
      elemen: "Ukuran Tanah",
      deskripsi: "2000 Meter",
      latitude: "-7.2723151",
      longitude: "112.774482",
      lampiran: "None"
    }
  ],
  "Project Rosa": [],
  "Project Rega": [],
  "Project Fahmi": []
};
let currentProject = null;


function renderPopupElements() {
  const container = document.getElementById("popup-element-list");
  container.innerHTML = "";

  const elements = projectElements[currentProject] || [];

  elements.forEach((el, index) => {
    const card = document.createElement("div");
    card.className = "element-card";
    card.innerHTML = `
      <div class="element-fields">
        <p><strong>Elemen:</strong> ${el.elemen}</p>
        <p><strong>Deskripsi:</strong> ${el.deskripsi}</p>
        <p><strong>Latitude:</strong> ${el.latitude}</p>
        <p><strong>Longitude:</strong> ${el.longitude}</p>
        <p><strong>Lampiran:</strong> ${el.lampiran}</p>
      </div>
      <button class="delete-btn" onclick="deletePopupElement(${index})">🗑️</button>
    `;
    container.appendChild(card);
  });
}

function addPopupElement() {
  if (!projectElements[currentProject]) {
    projectElements[currentProject] = [];
  }

  projectElements[currentProject].push({
    elemen: "Elemen Baru",
    deskripsi: "Deskripsi Baru",
    latitude: "-7.0000000",
    longitude: "112.0000000",
    lampiran: "None"
  });

  renderPopupElements();
}

function deletePopupElement(index) {
  if (projectElements[currentProject]) {
    projectElements[currentProject].splice(index, 1);
    renderPopupElements();
  }
}


function openAddElementPopup() {
  document.getElementById("add-element-popup").style.display = "flex";
}

function closeAddElementPopup() {
  document.getElementById("add-element-popup").style.display = "none";
}

function submitNewElement() {
  const elemen = document.getElementById("new-elemen").value;
  const deskripsi = document.getElementById("new-deskripsi").value;
  const latitude = document.getElementById("new-latitude").value;
  const longitude = document.getElementById("new-longitude").value;
  const lampiranInput = document.getElementById("new-lampiran");
  const lampiran = lampiranInput.files[0]?.name || "None";

  if (!currentProject) {
    alert("No project selected.");
    return;
  }

  if (!projectElements[currentProject]) {
    projectElements[currentProject] = [];
  }

  projectElements[currentProject].push({
    elemen,
    deskripsi,
    latitude,
    longitude,
    lampiran
  });

  closeAddElementPopup();
  renderPopupElements();
}

