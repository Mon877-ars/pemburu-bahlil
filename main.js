function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const feedbackEl = document.getElementById('formFeedback');
  const leadForm = document.getElementById('leadForm');

  if (!themeToggle) {
    console.error('themeToggle not found. Please add button#themeToggle in HTML.');
    return;
  }

  const setThemeText = (theme) => {
    themeToggle.textContent = theme === 'light' ? 'Mode Gelap' : 'Mode Terang';
  };

  const applyTheme = (theme) => {
    document.body.classList.toggle('is-dark', theme === 'dark');
    document.body.classList.toggle('light', theme === 'light');
    setThemeText(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
      themeToggle.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      themeToggle.style.color = '#1a2236';
    } else {
      themeToggle.style.backgroundColor = 'rgba(8, 12, 33, 0.92)';
      themeToggle.style.color = '#ffffff';
    }
  };

  const toggleTheme = () => {
    const nextMode = document.body.classList.contains('is-dark') ? 'light' : 'dark';
    applyTheme(nextMode);
  };

  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleTheme();
  });
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  const currentTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(currentTheme);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (leadForm) {
    leadForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        if (feedbackEl) {
          feedbackEl.textContent = 'Mohon lengkapi semua kolom.';
          feedbackEl.style.color = '#ff6b6b';
        }
        return;
      }

      // Kirim data ke email.php via AJAX
      try {
        const response = await fetch('email.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            name: name,
            email: email,
            message: message,
          }),
        });

        const result = await response.json();

        if (result.status === 'success') {
          if (feedbackEl) {
            feedbackEl.textContent = result.message;
            feedbackEl.style.color = '#7ef0a9';
          }
          leadForm.reset();
        } else {
          if (feedbackEl) {
            feedbackEl.textContent = result.message;
            feedbackEl.style.color = '#ff6b6b';
          }
        }
      } catch (error) {
        if (feedbackEl) {
          feedbackEl.textContent = 'Terjadi kesalahan jaringan. Coba lagi.';
          feedbackEl.style.color = '#ff6b6b';
        }
      }

      // Hapus pesan feedback setelah 3 detik
      setTimeout(() => {
        if (feedbackEl) feedbackEl.textContent = '';
      }, 3300);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
}
