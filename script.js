const themeToggle = document.getElementById('theme-toggle');

// Hàm thực hiện việc đổi class
function toggleTheme() {
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

// Xử lý sự kiện click với hiệu ứng lan tỏa
themeToggle.addEventListener('click', (event) => {
    // Nếu trình duyệt không hỗ trợ View Transition API
    if (!document.startViewTransition) {
        toggleTheme();
        return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
        toggleTheme();
    });

    transition.ready.then(() => {
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        
        document.documentElement.animate(
            {
                clipPath: document.body.classList.contains('dark-mode') ? [...clipPath].reverse() : clipPath,
            },
            {
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: document.body.classList.contains('dark-mode') ? '::view-transition-old(root)' : '::view-transition-new(root)',
            }
        );
    });
});

// Khởi tạo theme khi load trang
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.replace('dark-mode', 'light-mode');
    themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
}