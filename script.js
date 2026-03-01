const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Kiểm tra bộ nhớ máy (nếu chưa từng chọn thì mặc định là dark)
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    icon.classList.replace('fa-sun', 'fa-moon');
} else {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        // Chuyển sang Light Mode
        body.classList.replace('dark-mode', 'light-mode');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        // Chuyển sang Dark Mode
        body.classList.replace('light-mode', 'dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});