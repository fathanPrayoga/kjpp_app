let chatData;
const userListDiv = document.getElementById('userList');
const chatMessagesDiv = document.getElementById('chatMessages');
const chatHeader = document.querySelector('.chat-header');
const filterButtons = document.querySelectorAll('.filter-btn');
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const searchInput = document.querySelector('.search-box input[type="text"]'); 

// --- 1. READ (Membaca dan Menampilkan Data) ---

// a) Fungsi untuk mengambil data JSON (simulasi)
async function loadChatData() {
    try {
        // Dalam kasus nyata, ini akan menjadi fetch('/api/data')
        const response = await fetch('../local-data/chat-data.json'); 
        chatData = await response.json();
        initializeChat();
    } catch (error) {
        console.error("Gagal memuat data chat:", error);
    }
}

// b) Fungsi untuk merender daftar pengguna di panel kiri
function renderUserList(filter = 'all', searchQuery = '') {
    userListDiv.innerHTML = '';
    
    // 1. Definisikan query dari parameter
    const query = searchQuery.toLowerCase().trim(); 
    
    let filteredUsers = chatData.users;
    
    // Logika Filter (Awalnya filter dari data mentah)
    // PENTING: Jika Anda ingin Filter (Unread/Important) diterapkan sebelum Search, 
    // pastikan filteredUsers = chatData.users yang digunakan di awal.
    if (filter === 'unread') {
        filteredUsers = filteredUsers.filter(u => !u.isRead); // Filter dari data yang ada
    } else if (filter === 'important') {
        filteredUsers = filteredUsers.filter(u => u.isImportant); // Filter dari data yang ada
    }

    // Logika Pencarian (Filter dari hasil filter di atas)
    if (query) {
        filteredUsers = filteredUsers.filter(user => {
            // Mencari berdasarkan Nama Pengguna ATAU Teks Pesan Terakhir
            return user.name.toLowerCase().includes(query) || 
                   user.lastMessageText.toLowerCase().includes(query);
        });
    }

    // ... (sisa kode untuk rendering HTML) ...
    filteredUsers.forEach(user => {
        const lastMsgIcon = user.isRead 
            ? '<i class="fas fa-check-double read-icon"></i>' 
            : '<i class="fas fa-check"></i>';
        
        const activeClass = user.id === chatData.activeChatId ? 'active-chat' : '';
        
        const userRowHTML = `
            <div class="user-row ${activeClass}" data-user-id="${user.id}">
                <div class="profile-pic">
                    <img src="${user.profilePic}" alt="Profil ${user.name}">
                </div>
                <div class="user-info">
                    <div class="user-name">${user.name}</div>
                    <div class="last-message">
                        ${lastMsgIcon} ${user.lastMessageText}
                    </div>
                </div>
                <div class="timestamp">${user.lastMessageTime}</div>
            </div>
        `;
        userListDiv.innerHTML += userRowHTML;
    });
    
    attachUserRowListeners();
}

// c) Fungsi untuk merender pesan di panel kanan
function renderChatMessages(userId) {
    const user = chatData.users.find(u => u.id === userId);
    
    if (!user) {
        chatMessagesDiv.innerHTML = '<div style="text-align: center; color: #999; margin-top: 20px;">Pilih pengguna untuk memulai obrolan.</div>';
        return;
    }

    // Update Header Chat
    chatHeader.querySelector('.user-name').textContent = user.name;
    chatHeader.querySelector('.profile-pic img').src = user.profilePic;
    chatHeader.querySelector('.profile-pic img').alt = `Profil ${user.name}`;

    // Render Messages
    chatMessagesDiv.innerHTML = '';
    user.messages.forEach(msg => {
        const messageClass = msg.sender === chatData.currentUser ? 'outgoing' : 'incoming';
        
        // Setiap pesan memiliki ID untuk keperluan UPDATE dan DELETE
        const messageHTML = `
            <div class="message ${messageClass}" data-message-id="${msg.id}" data-sender="${msg.sender}">
                ${msg.text}
                <span class="message-actions">
                    <i class="fas fa-edit edit-btn" title="Edit Pesan"></i>
                    <i class="fas fa-trash-alt delete-btn" title="Hapus Pesan"></i>
                </span>
            </div>
        `;
        chatMessagesDiv.innerHTML += messageHTML;
    });
    
    // Scroll ke bawah dan lampirkan listener untuk fitur U/D
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
    attachMessageActionListeners();
}

// --- 2. CREATE (Mengirim Pesan) ---

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    const activeUser = chatData.users.find(u => u.id === chatData.activeChatId);
    if (!activeUser) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    // Tentukan ID pesan baru (pastikan unik dalam chat ini)
    const newId = activeUser.messages.length > 0 
                  ? Math.max(...activeUser.messages.map(m => m.id)) + 1 
                  : 1;
    
    const newMessage = {
        id: newId,
        sender: chatData.currentUser,
        text: text,
        time: timeString
    };

    // Tambahkan pesan ke data
    activeUser.messages.push(newMessage);
    
    // Update data di user list
    activeUser.lastMessageText = text;
    activeUser.lastMessageTime = timeString;
    activeUser.isRead = true;

    // Render ulang dan kosongkan input
    renderChatMessages(chatData.activeChatId);
    messageInput.value = '';
    
    // Render ulang list untuk update last message/timestamp
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    renderUserList(activeFilter);
}

// --- 3. UPDATE dan DELETE (Untuk Pesan) ---

function attachMessageActionListeners() {
    document.querySelectorAll('.message').forEach(messageDiv => {
        const messageId = parseInt(messageDiv.dataset.messageId);
        const senderId = messageDiv.dataset.sender;

        // Hanya pesan 'outgoing' (dari 'self') yang bisa di-edit/hapus
        if (senderId === chatData.currentUser) {
            
            // Logika Delete
            messageDiv.querySelector('.delete-btn').addEventListener('click', () => {
                if (confirm('Yakin ingin menghapus pesan ini?')) {
                    deleteMessage(messageId);
                }
            });

            // Logika Update (untuk fitur Edit)
            messageDiv.querySelector('.edit-btn').addEventListener('click', () => {
                const currentText = messageDiv.textContent.trim();
                const newText = prompt('Edit pesan:', currentText);

                if (newText !== null && newText.trim() !== currentText) {
                    updateMessage(messageId, newText.trim());
                }
            });
        } else {
             // Sembunyikan tombol edit/delete untuk pesan 'incoming'
            messageDiv.querySelector('.message-actions').style.display = 'none';
        }
    });
}

function updateMessage(messageId, newText) {
    const activeUser = chatData.users.find(u => u.id === chatData.activeChatId);
    const messageToUpdate = activeUser.messages.find(m => m.id === messageId);
    
    if (messageToUpdate) {
        messageToUpdate.text = newText + ' (edited)';
        
        // Jika pesan yang diubah adalah pesan terakhir
        if (activeUser.messages[activeUser.messages.length - 1].id === messageId) {
            activeUser.lastMessageText = newText + ' (edited)';
        }

        renderChatMessages(chatData.activeChatId);
        // Render ulang list untuk update last message jika perlu
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        renderUserList(activeFilter);
    }
}

function deleteMessage(messageId) {
    const activeUser = chatData.users.find(u => u.id === chatData.activeChatId);
    
    // Filter array messages untuk menghapus pesan
    activeUser.messages = activeUser.messages.filter(m => m.id !== messageId);
    
    // Update lastMessage kalau pesan yang dihapus adalah pesan terakhir
    if (activeUser.messages.length > 0) {
        const lastMsg = activeUser.messages[activeUser.messages.length - 1];
        activeUser.lastMessageText = lastMsg.text;
        activeUser.lastMessageTime = lastMsg.time;
    } else {
        activeUser.lastMessageText = 'Tidak ada pesan.';
        activeUser.lastMessageTime = '';
    }

    renderChatMessages(chatData.activeChatId);
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    renderUserList(activeFilter);
}


// --- 4. Event Listeners & Inisialisasi ---

// Listener untuk Tombol Filter
function attachFilterListeners() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Panggil renderUserList dengan filter yang baru
            renderUserList(button.dataset.filter);
        });
    });
}

// Listener untuk Pemilihan Pengguna (mengganti chat aktif)
function attachUserRowListeners() {
    document.querySelectorAll('.user-row').forEach(row => {
        row.addEventListener('click', () => {
            const userId = row.dataset.userId;
            
            // Hapus 'active-chat' lama, tambahkan ke yang baru
            document.querySelectorAll('.user-row').forEach(r => r.classList.remove('active-chat'));
            row.classList.add('active-chat');

            chatData.activeChatId = userId;
            
            // Logika Update: Tandai sebagai 'Read'
            const activeUser = chatData.users.find(u => u.id === userId);
            if (activeUser && !activeUser.isRead) {
                activeUser.isRead = true;
                // Re-render user list untuk update icon di list
                const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
                renderUserList(activeFilter);
            }
            
            renderChatMessages(userId);
        });
    });
}

// Listener untuk BUtton Kirim dan Enter
function attachSendListeners() {
    sendMessageBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function attachSearchListener() {
    searchInput.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        
        // Meamanggil renderUserList dengan filter aktif dan nilai input pencarian
        renderUserList(activeFilter, searchInput.value);
    });
}

// Inisialisasi utama
function initializeChat() {
    // Render tampilan awal
    renderUserList(document.querySelector('.filter-btn.active').dataset.filter);
    renderChatMessages(chatData.activeChatId);
    
    // Event listener
    attachFilterListeners();
    attachSendListeners();
    attachSearchListener();
}


// Mulai aplikasi setelah DOM siap
document.addEventListener('DOMContentLoaded', loadChatData);
