// ====================================
// Tibyan Platform - Main JavaScript
// Islamic Golden Theme Interactive Features
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Accessibility Features =====
    
    // Neuro-friendly Mode (reduces animations and motion)
    const neuroModeBtn = document.getElementById('neuro-mode');
    if (neuroModeBtn) {
        neuroModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('neuro-mode');
            this.classList.toggle('active');
            
            if (document.body.classList.contains('neuro-mode')) {
                // Disable animations
                document.documentElement.style.setProperty('--transition-fast', '0s');
                document.documentElement.style.setProperty('--transition-smooth', '0s');
                document.documentElement.style.setProperty('--transition-slow', '0s');
            } else {
                // Re-enable animations
                document.documentElement.style.setProperty('--transition-fast', '0.2s ease');
                document.documentElement.style.setProperty('--transition-smooth', '0.3s ease');
                document.documentElement.style.setProperty('--transition-slow', '0.5s ease');
            }
        });
    }
    
    // Vision-friendly Mode (high contrast)
    const visionModeBtn = document.getElementById('vision-mode');
    if (visionModeBtn) {
        visionModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('vision-mode');
            this.classList.toggle('active');
            
            if (document.body.classList.contains('vision-mode')) {
                document.documentElement.style.setProperty('--text-primary', '#FFFFFF');
                document.documentElement.style.setProperty('--bg-primary', '#000000');
                document.documentElement.style.setProperty('--accent-green', '#00FF00');
            } else {
                document.documentElement.style.setProperty('--text-primary', '#FFFFFF');
                document.documentElement.style.setProperty('--bg-primary', '#0a3d3d');
                document.documentElement.style.setProperty('--accent-green', '#2ecc71');
            }
        });
    }
    
    // Dyslexic-friendly Font
    const dyslexicModeBtn = document.getElementById('dyslexic-mode');
    if (dyslexicModeBtn) {
        dyslexicModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('dyslexic-mode');
            this.classList.toggle('active');
            
            if (document.body.classList.contains('dyslexic-mode')) {
                document.body.style.fontFamily = 'Arial, sans-serif';
                document.body.style.letterSpacing = '0.15em';
                document.body.style.lineHeight = '2';
            } else {
                document.body.style.fontFamily = "'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
                document.body.style.letterSpacing = 'normal';
                document.body.style.lineHeight = '1.6';
            }
        });
    }
    
    // Text-to-Speech Mode
    const ttsBtn = document.getElementById('tts-mode');
    if (ttsBtn) {
        let ttsActive = false;
        
        ttsBtn.addEventListener('click', function() {
            ttsActive = !ttsActive;
            this.classList.toggle('active');
            
            if (ttsActive) {
                // Add click listeners to all text elements
                document.querySelectorAll('h1, h2, h3, h4, p, span, a').forEach(element => {
                    element.style.cursor = 'pointer';
                    element.addEventListener('click', speakText);
                });
            } else {
                // Remove click listeners
                document.querySelectorAll('h1, h2, h3, h4, p, span, a').forEach(element => {
                    element.style.cursor = '';
                    element.removeEventListener('click', speakText);
                });
                speechSynthesis.cancel();
            }
        });
    }
    
    function speakText(e) {
        e.stopPropagation();
        const text = this.textContent;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA'; // Arabic
        utterance.rate = 0.9;
        speechSynthesis.cancel(); // Stop any current speech
        speechSynthesis.speak(utterance);
    }
    
    // Car Mode (large text, simplified UI)
    const carModeBtn = document.getElementById('car-mode');
    if (carModeBtn) {
        carModeBtn.addEventListener('click', function() {
            document.body.classList.toggle('car-mode');
            this.classList.toggle('active');
            
            if (document.body.classList.contains('car-mode')) {
                document.body.style.fontSize = '1.5rem';
            } else {
                document.body.style.fontSize = '';
            }
        });
    }
    
    // ===== Sidebar Navigation =====
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    // Set active state based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    sidebarItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage || (currentPage === '' && itemHref === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Optional: Add click effect (but allow navigation to happen)
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // The link will navigate, so we don't need to prevent default
            // Just add a quick visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // ===== Bottom Tabs Navigation =====
    const tabItems = document.querySelectorAll('.bottom-tabs .tab-item:not(a)');
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all tabs
            tabItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });
    
    // ===== Carousel Functionality =====
    const carouselIndicators = document.querySelectorAll('.carousel-indicators span');
    if (carouselIndicators.length > 0) {
        let currentSlide = 0;
        
        carouselIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                carouselIndicators.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                currentSlide = index;
                // Add carousel slide change logic here if needed
            });
        });
        
        // Auto-advance carousel every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % carouselIndicators.length;
            carouselIndicators.forEach(i => i.classList.remove('active'));
            carouselIndicators[currentSlide].classList.add('active');
        }, 5000);
    }
    
    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== Intersection Observer for Fade-in Animations =====
    const animatedElements = document.querySelectorAll('.hero-section, .info-card, .stat-card, .circular-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===== Interactive Card Hover Effects =====
    const cards = document.querySelectorAll('.circular-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== Dynamic Greeting Based on Time =====
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour >= 5 && hour < 12) {
            greeting = 'صباح الخير';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'مساء الخير';
        } else {
            greeting = 'مساء الخير';
        }
        
        // Update greeting if element exists
        const greetingElement = document.querySelector('.greeting');
        if (greetingElement) {
            greetingElement.textContent = greeting;
        }
    }
    
    updateGreeting();
    
    // ===== Search Functionality =====
    const searchIcon = document.querySelector('.fa-magnifying-glass');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            // Create search overlay
            const searchOverlay = document.createElement('div');
            searchOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(15, 20, 25, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
            `;
            
            const searchBox = document.createElement('div');
            searchBox.style.cssText = `
                width: 90%;
                max-width: 600px;
                background: var(--bg-card);
                border: 3px solid var(--accent-green);
                border-radius: var(--radius-lg);
                padding: 30px;
                box-shadow: var(--shadow-lg);
            `;
            
            searchBox.innerHTML = `
                <input type="text" placeholder="ابحث عن الدروس..." style="
                    width: 100%;
                    padding: 15px;
                    font-size: 1.2rem;
                    background: var(--bg-primary);
                    border: 2px solid var(--teal-dark);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    font-family: 'Cairo', sans-serif;
                    outline: none;
                ">
                <button style="
                    margin-top: 20px;
                    padding: 12px 30px;
                    background: var(--accent-green);
                    color: white;
                    border: none;
                    border-radius: var(--radius-sm);
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 1rem;
                    font-family: 'Cairo', sans-serif;
                ">إغلاق</button>
            `;
            
            searchOverlay.appendChild(searchBox);
            document.body.appendChild(searchOverlay);
            
            // Focus the input
            searchBox.querySelector('input').focus();
            
            // Close on button click or overlay click
            searchBox.querySelector('button').addEventListener('click', () => {
                document.body.removeChild(searchOverlay);
            });
            
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    document.body.removeChild(searchOverlay);
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(searchOverlay)) {
                        document.body.removeChild(searchOverlay);
                    }
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    }
    
    // ===== Language Toggle =====
    const langIcon = document.querySelector('.fa-globe');
    if (langIcon) {
        langIcon.parentElement.addEventListener('click', function() {
            const currentLang = this.querySelector('span').textContent;
            if (currentLang === 'العربية') {
                this.querySelector('span').textContent = 'English';
                // Add logic to switch to English
            } else {
                this.querySelector('span').textContent = 'العربية';
                // Add logic to switch to Arabic
            }
        });
    }
    
    // ===== Video Player Modal =====
    let videoModal = null;
    
    function createVideoModal() {
        if (videoModal) return;
        
        videoModal = document.createElement('div');
        videoModal.className = 'video-modal';
        videoModal.innerHTML = `
            <div class="video-modal-content">
                <div class="video-modal-header">
                    <div>
                        <h2 class="video-modal-title"></h2>
                        <p class="video-modal-teacher"></p>
                    </div>
                    <button class="video-modal-close">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
                <div class="video-container">
                    <iframe id="video-player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        `;
        
        document.body.appendChild(videoModal);
        
        // Close button
        const closeBtn = videoModal.querySelector('.video-modal-close');
        closeBtn.addEventListener('click', closeVideoModal);
        
        // Click outside to close
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }
    
    function openVideoModal(videoUrl, title, teacher) {
        createVideoModal();
        
        const videoPlayer = videoModal.querySelector('#video-player');
        const titleElement = videoModal.querySelector('.video-modal-title');
        const teacherElement = videoModal.querySelector('.video-modal-teacher');
        
        // Set content
        titleElement.textContent = title;
        teacherElement.textContent = teacher;
        videoPlayer.src = videoUrl + '?autoplay=1';
        
        // Show modal
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeVideoModal() {
        if (!videoModal) return;
        
        const videoPlayer = videoModal.querySelector('#video-player');
        videoPlayer.src = ''; // Stop video
        
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Add click handlers to all play buttons
    const playButtons = document.querySelectorAll('.play-video-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.circular-card');
            const videoUrl = card.dataset.videoUrl;
            const title = card.dataset.lessonTitle;
            const teacher = card.dataset.teacher;
            
            if (videoUrl) {
                openVideoModal(videoUrl, title, teacher);
            }
        });
    });
    
    // Also allow clicking the card itself to play video
    const videoCards = document.querySelectorAll('.circular-card[data-video-url]');
    videoCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the plus button
            if (e.target.closest('.action-btn') && !e.target.closest('.play-video-btn')) {
                return;
            }
            
            const videoUrl = this.dataset.videoUrl;
            const title = this.dataset.lessonTitle;
            const teacher = this.dataset.teacher;
            
            if (videoUrl) {
                openVideoModal(videoUrl, title, teacher);
            }
        });
    });
    
    // ===== Add Loading State to Other Action Buttons =====
    const otherActionButtons = document.querySelectorAll('.action-btn:not(.play-video-btn)');
    otherActionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Add loading animation
            const icon = this.querySelector('i');
            if (icon) {
                const originalClass = icon.className;
                icon.className = 'fa-solid fa-spinner fa-spin';
                
                // Simulate loading
                setTimeout(() => {
                    icon.className = originalClass;
                }, 1000);
            }
        });
    });
    
    // ===== Console Welcome Message =====
    console.log('%c مرحباً بك في منصة تبيان ', 'background: #2ecc71; color: white; font-size: 20px; padding: 10px; border-radius: 5px; font-weight: bold;');
    console.log('%c أكاديمية رقمية ذكية لرقمنة دروس الحرمين الشريفين ', 'color: #2ecc71; font-size: 14px;');
    
});

// ===== Utility Functions =====

// Format numbers for Arabic locale
function formatNumber(num) {
    return new Intl.NumberFormat('ar-SA').format(num);
}

// Generate Islamic greeting based on time
function getIslamicGreeting() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
        return 'صباح الخير والبركة';
    } else if (hour >= 12 && hour < 15) {
        return 'وقت الظهيرة المبارك';
    } else if (hour >= 15 && hour < 18) {
        return 'عصراً طيباً';
    } else if (hour >= 18 && hour < 21) {
        return 'مساء الخير والبركة';
    } else {
        return 'ليلة مباركة';
    }
}

// Save user preferences to localStorage
function savePreference(key, value) {
    try {
        localStorage.setItem(`tibyan_${key}`, JSON.stringify(value));
    } catch (e) {
        console.error('Failed to save preference:', e);
    }
}

// Load user preferences from localStorage
function loadPreference(key) {
    try {
        const value = localStorage.getItem(`tibyan_${key}`);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('Failed to load preference:', e);
        return null;
    }
}

// ===== Export functions for use in other scripts =====
window.TibyanPlatform = {
    formatNumber,
    getIslamicGreeting,
    savePreference,
    loadPreference
};
