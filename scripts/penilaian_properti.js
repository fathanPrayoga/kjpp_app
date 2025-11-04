// // document.addEventListener('DOMContentLoaded', () => {
// //   const container = document.querySelector('.penilaian-detail-panel');
// //   const data = [
// //     { 
// //       name: "Asri", 
// //       project: "Project Asri", 
// //       status_penilaian: "Sudah Dinilai",
// //       nilai: {
// //         nilai_pasar_final: 2000000000,
// //         nilai_tanah: 500000000,
// //         nilai_indikasi_dari_pasar: 2100000000,
// //         nilai_indikasi_dari_biaya: 1950000000,
// //         nilai_likuidasi: 1800000000,
// //         nilai_bangunan: 1500000000,
// //         nilai_per_m2_tanah: 1666667,
// //         nilai_per_m2_bangunan: 3333333,
// //       }
// //     },
// //     { 
// //       name: "Budi", 
// //       project: "Project Budi", 
// //       status_penilaian: "Belum Dinilai",
// //       nilai: {
// //         nilai_pasar_final: null,
// //         nilai_tanah: null,
// //         nilai_indikasi_dari_pasar: null,
// //         nilai_indikasi_dari_biaya: null,
// //         nilai_likuidasi: null,
// //         nilai_bangunan: null,
// //         nilai_per_m2_tanah: null,
// //         nilai_per_m2_bangunan: null,
// //       }
// //     }
// //   ];

// //   container.innerHTML = '<h2 class="detail-title">Nilai</h2>';

// //   data.forEach((item, index) => {
// //     const div = document.createElement('div');
// //     div.classList.add('penilaian-item');
// //     div.innerHTML = `
// //       <div class="item-info">
// //         <span class="item-name">${item.name}</span>
// //         <span class="item-project">${item.project}</span>
// //       </div>
// //       <span class="verification-badge ${item.status_penilaian === 'Sudah Dinilai' ? 'verified' : ''}">
// //         ${item.status_penilaian}
// //       </span>
// //     `;

// //     div.addEventListener('click', () => openPopup(item, index));
// //     container.appendChild(div);
// //   });

// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.querySelector('.penilaian-detail-panel');

//   fetch('../local-data/data.json')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok ' + response.statusText);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderList(data);
//     })
//     .catch(error => console.error('Fetch error:', error));

//   function renderList(data) {
//     container.innerHTML = '<h2 class="detail-title">Nilai</h2>';
//     data.forEach((item, index) => {
//       const div = document.createElement('div');
//       div.classList.add('penilaian-item');
//       div.innerHTML = `
//         <div class="item-info">
//           <span class="item-name">${item.name}</span>
//           <span class="item-project">${item.project}</span>
//         </div>
//         <span class="verification-badge ${item.status_penilaian === 'Sudah Dinilai' ? 'verified' : ''}">
//           ${item.status_penilaian}
//         </span>
//       `;
//       container.appendChild(div);
//     });
//   }
// // });


//   function openPopup(item, index) {

//     const overlay = document.createElement('div');
//     overlay.classList.add('popup-overlay');

//     const popup = document.createElement('div');
//     popup.classList.add('popup-container');

//     const header = document.createElement('div');
//     header.classList.add('popup-header');
//     header.textContent = `Nilai Properti ${item.project}`;

//     const form = document.createElement('div');
//     form.classList.add('popup-form');

//     const section1Labels = [
//       "nilai_pasar_final",
//       "nilai_tanah",
//       "nilai_indikasi_dari_pasar",
//       "nilai_indikasi_dari_biaya",
//       "nilai_likuidasi"
//     ];

//     const section2Labels = [
//       "nilai_bangunan",
//       "nilai_per_m2_tanah",
//       "nilai_per_m2_bangunan"
//     ];

//     const section1 = document.createElement('div');
//     section1.classList.add('popup-section');
//     section1.innerHTML = `<h3>Nilai Properti</h3>`;
//     section1Labels.forEach(label => {
//       const row = document.createElement('div');
//       row.classList.add('popup-row');
//       row.innerHTML = `
//         <label>${label.replaceAll('_',' ')}</label>
//         <input type="number" id="${label}" value="${item.nilai[label] ?? ''}">
//       `;
//       section1.appendChild(row);
//     });

//     const section2 = document.createElement('div');
//     section2.classList.add('popup-section');
//     section2Labels.forEach(label => {
//       const row = document.createElement('div');
//       row.classList.add('popup-row');
//       row.innerHTML = `
//         <label>${label.replaceAll('_',' ')}</label>
//         <input type="number" id="${label}" value="${item.nilai[label] ?? ''}">
//         <button class="auto-btn">Nilai Otomatis</button>
//       `;
//       row.querySelector('.auto-btn').addEventListener('click', () => {
//         row.querySelector('input').value = 0;
//       });
//       section2.appendChild(row);
//     });

//     form.appendChild(section1);
//     form.appendChild(section2);

//     const footer = document.createElement('div');
//     footer.classList.add('popup-footer');
//     if (item.status_penilaian === 'Sudah Dinilai') {
//         footer.innerHTML = `
//                             <button class="btn-back">Kembali</button>
//                             <button class="btn-save">Ubah Nilai</button>
//                         `;
//     } else {
//         footer.innerHTML = `
//                             <button class="btn-back">Kembali</button>
//                             <button class="btn-save">Nilai</button>
//                         `;
//     }

//     popup.append(header, form, footer);
//     overlay.appendChild(popup);
//     document.body.appendChild(overlay);

//     overlay.querySelector('.btn-back').addEventListener('click', () => overlay.remove());
//     overlay.querySelector('.btn-save').addEventListener('click', () => {
//       const inputs = popup.querySelectorAll('input');
//       inputs.forEach(inp => {
//         item.nilai[inp.id] = Number(inp.value);
//       });
//       item.status_penilaian = 'Sudah Dinilai';
//       overlay.remove();
//       refreshList();
//     });
//   }

//   function refreshList() {
//     container.innerHTML = '<h2 class="detail-title">Dokumen</h2>';
//     data.forEach((item, index) => {
//       const div = document.createElement('div');
//       div.classList.add('penilaian-item');
//       div.innerHTML = `
//         <div class="item-info">
//           <span class="item-name">${item.name}</span>
//           <span class="item-project">${item.project}</span>
//         </div>
//         <span class="verification-badge ${item.status_penilaian === 'Sudah Dinilai' ? 'verified' : ''}">
//           ${item.status_penilaian}
//         </span>
//       `;
//       div.addEventListener('click', () => openPopup(item, index));
//       container.appendChild(div);
//     });
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.penilaian-detail-panel');

  let data = [];

  fetch('../local-data/data.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok ' + response.status);
      return response.json();
    })
    .then(jsonData => {
      data = jsonData;        
      renderList();         
    })
    .catch(error => console.error('Fetch error:', error));

  function renderList() {
    container.innerHTML = '<h2 class="detail-title">Nilai</h2>';
    data.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('penilaian-item');
      div.innerHTML = `
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="item-project">${item.project}</span>
        </div>
        <span class="verification-badge ${item.status_penilaian === 'Sudah Dinilai' ? 'verified' : ''}">
          ${item.status_penilaian}
        </span>
      `;
      div.addEventListener('click', () => openPopup(item, index));
      container.appendChild(div);
    });
  }

  function openPopup(item, index) {

    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');

    const popup = document.createElement('div');
    popup.classList.add('popup-container');

    const header = document.createElement('div');
    header.classList.add('popup-header');
    header.textContent = `Nilai Properti ${item.project}`;

    const form = document.createElement('div');
    form.classList.add('popup-form');

    const section1Labels = [
      "nilai_pasar_final",
      "nilai_tanah",
      "nilai_indikasi_dari_pasar",
      "nilai_indikasi_dari_biaya",
      "nilai_likuidasi"
    ];

    const section2Labels = [
      "nilai_bangunan",
      "nilai_per_m2_tanah",
      "nilai_per_m2_bangunan"
    ];

    const section1 = document.createElement('div');
    section1.classList.add('popup-section');
    section1.innerHTML = `<h3>Nilai Properti</h3>`;
    section1Labels.forEach(label => {
      const row = document.createElement('div');
      row.classList.add('popup-row');
      row.innerHTML = `
        <label>${label.replaceAll('_',' ')}</label>
        <input type="number" id="${label}" value="${item.nilai[label] ?? ''}">
      `;
      section1.appendChild(row);
    });

    const section2 = document.createElement('div');
    section2.classList.add('popup-section');
    section2Labels.forEach(label => {
      const row = document.createElement('div');
      row.classList.add('popup-row');
      row.innerHTML = `
        <label>${label.replaceAll('_',' ')}</label>
        <input type="number" id="${label}" value="${item.nilai[label] ?? ''}">
        <button type="button" class="auto-btn">Nilai Otomatis</button>
      `;
      row.querySelector('.auto-btn').addEventListener('click', () => {
        row.querySelector('input').value = 0; 
      });
      section2.appendChild(row);
    });

    form.appendChild(section1);
    form.appendChild(section2);

    const footer = document.createElement('div');
    footer.classList.add('popup-footer');
    if (item.status_penilaian === 'Sudah Dinilai') {
      footer.innerHTML = `
        <button type="button" class="btn-back">Kembali</button>
        <button type="button" class="btn-save">Ubah Nilai</button>
      `;
    } else {
      footer.innerHTML = `
        <button type="button" class="btn-back">Kembali</button>
        <button type="button" class="btn-save">Nilai</button>
      `;
    }

    popup.append(header, form, footer);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    overlay.querySelector('.btn-back').addEventListener('click', () => overlay.remove());

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    overlay.querySelector('.btn-save').addEventListener('click', () => {
      const inputs = popup.querySelectorAll('input');
      inputs.forEach(inp => {
        if (Object.prototype.hasOwnProperty.call(item.nilai, inp.id)) {
          item.nilai[inp.id] = inp.value === '' ? null : Number(inp.value);
        }
      });
      item.status_penilaian = 'Sudah Dinilai';
      overlay.remove();
      refreshList();
    });
  }

  function refreshList() {
    container.innerHTML = '<h2 class="detail-title">Nilai</h2>';
    data.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('penilaian-item');
      div.innerHTML = `
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="item-project">${item.project}</span>
        </div>
        <span class="verification-badge ${item.status_penilaian === 'Sudah Dinilai' ? 'verified' : ''}">
          ${item.status_penilaian}
        </span>
      `;
      div.addEventListener('click', () => openPopup(item, index)); 
      container.appendChild(div);
    });
  }

});
