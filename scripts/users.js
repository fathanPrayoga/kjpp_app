

function handleLogin(event) {
    event.preventDefault();

    const usernameInput = document.querySelector('.log-in-form input[type="text"]').value;
    const passwordInput = document.querySelector('.log-in-form input[type="password"]').value;

    
    console.log("Mencoba login dengan:", usernameInput, passwordInput); 

    // Jalur ke file JSON
    fetch('../local-data/user.json')
        .then(response => {
            if (!response.ok) {
             
                throw new Error('Gagal memuat user.json. Cek jalur file: ' + response.status);
            }
            return response.json();
        })
        .then(users => {
     
            console.log('Data dari user.json:', users); 


            const user = users.find(u => 
                (u.username === usernameInput || u.email === usernameInput) && 
                u.password === passwordInput
            );

            if (user) {
                alert(`Login Berhasil! Selamat datang, ${user.username}.`);
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'dashboard_client.html'; 
            } else {
                alert('Username/Email atau Password salah!');
            }
        })
        .catch(error => {
            console.error('Login Error:', error);
            alert('Gagal memproses login. Cek Console (F12) browser.');
        });
}


document.addEventListener('DOMContentLoaded', () => {
    const loginFormElement = document.querySelector('.log-in-form form');
    
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', handleLogin);
    } else {
        console.error("Elemen formulir login tidak ditemukan.");
    }
});