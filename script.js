const form = document.getElementById('password-form');
const passwordList = document.getElementById('password-list');
const generateButton = document.getElementById('generate-password');
const siteInput = document.getElementById('site');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const includeSpecial = document.getElementById('include-special');
const includeNumbers = document.getElementById('include-numbers');
const passwordLength = document.getElementById('password-length');

const saveToStorage = (data) => {
    localStorage.setItem('passwords', JSON.stringify(data));
};

const loadFromStorage = () => {
    const data = localStorage.getItem('passwords');
    return data ? JSON.parse(data) : [];
};

const renderPasswords = () => {
    const passwords = loadFromStorage();
    passwordList.innerHTML = '';
    passwords.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'password-item';
        div.innerHTML = `
                    <div>
                        <strong>${item.site}</strong><br>
                        ${item.username} - ${item.password}
                    </div>
                    <button onclick="deletePassword(${index})">Delete</button>
                `;
        passwordList.appendChild(div);
    });
};

const deletePassword = (index) => {
    const passwords = loadFromStorage();
    passwords.splice(index, 1);
    saveToStorage(passwords);
    renderPasswords();
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwords = loadFromStorage();
    passwords.push({
        site: siteInput.value,
        username: usernameInput.value,
        password: passwordInput.value
    });
    saveToStorage(passwords);
    renderPasswords();
    form.reset();
});

generateButton.addEventListener('click', () => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (includeNumbers.checked) {
        chars += '0123456789';
    }
    if (includeSpecial.checked) {
        chars += '!@#$%^&*()_+';
    }
    let password = '';
    for (let i = 0; i < parseInt(passwordLength.value); i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordInput.value = password;
});

renderPasswords();