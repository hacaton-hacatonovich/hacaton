// Основные функции навигации
function goHome() {
    showNotification('🚀 Возвращаемся на главную...');
    setTimeout(() => {
        // В реальном приложении:
        window.location.href = '/';
        // Для демо:
        console.log('Redirect to home page');
    }, 1000);
}

function goBack() {
    if (document.referrer) {
        window.history.back();
    } else {
        goHome();
    }
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    const themeIcon = document.querySelector('.btn-outline .fa-palette');

    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        showNotification('🌞 Светлая тема включена');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        showNotification('🌙 Темная тема включена');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query) {
        showNotification(`🔍 Ищем: "${query}"...`);
        // В реальном приложении:
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        searchInput.value = '';
    } else {
        showNotification('📝 Введите поисковый запрос', 'warning');
        searchInput.focus();
    }
}

// Показать уведомление
function showNotification(message, type = 'info') {
    // Удаляем существующие уведомления
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Стили уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'warning' ? 'var(--accent-warning)' : 'var(--accent-primary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Удаляем уведомление через 4 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Добавляем стили для анимации уведомлений
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Добавляем обработчик Enter в поле поиска
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Добавляем анимацию при наведении на карточки
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Запускаем дополнительные анимации
    startAdditionalAnimations();
});

// Дополнительные анимации
function startAdditionalAnimations() {
    // Анимация мерцания звезд
    const stars = document.querySelector('.stars-small');
    if (stars) {
        setInterval(() => {
            stars.style.opacity = Math.random() * 0.5 + 0.5;
        }, 2000);
    }

    // Случайное движение астероидов
    const asteroids = document.querySelectorAll('.asteroid');
    asteroids.forEach((asteroid, index) => {
        setInterval(() => {
            const randomX = Math.random() * 50 - 25;
            const randomY = Math.random() * 50 - 25;
            asteroid.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
}

// Обработка клавиатуры
document.addEventListener('keydown', function(e) {
    // Escape для возврата назад
    if (e.key === 'Escape') {
        goBack();
    }

    // Ctrl + / для фокуса на поиск
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Enter на главной кнопке
    if (e.key === 'Enter' && e.target.classList.contains('btn-primary')) {
        e.target.click();
    }
});

// Анимация загрузки
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});