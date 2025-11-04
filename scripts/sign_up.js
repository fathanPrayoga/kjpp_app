

function handleSignUp(event) {
    event.preventDefault();

    const email = document.querySelector('.sign-up-form input[type="email"]').value;
    const username = document.querySelector('.sign-up-form input[type="text"]').value;
    const password = document.querySelector('.sign-up-form input[type="password"]').value;
    const confirmPassword = document.querySelector('.sign-up-form input:nth-child(4)').value; // Memilih input ke-4

    if (password !== confirmPassword) {
        alert('Konfirmasi password tidak cocok!');
        return;
    }


    const newUser = {
        id: Date.now(),
        username: username,
        email: email,
        password: password,
        role: "client"
    };


    let localUsers = JSON.parse(localStorage.getItem('simulatedUsers')) || [];
    

    if (localUsers.find(u => u.username === username || u.email === email)) {
        alert('Username atau Email sudah terdaftar!');
        return;
    }
    
    localUsers.push(newUser);
    localStorage.setItem('simulatedUsers', JSON.stringify(localUsers));

    alert('Pendaftaran Berhasil! Silakan Log in.');
    

    window.location.href = 'login.html'; 
}


document.querySelector('.sign-up-form form').addEventListener('submit', handleSignUp);