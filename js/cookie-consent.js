(function() {
    'use strict';

    var STORAGE_KEY = 'kb_cookie_consent';
    var banner = document.getElementById('cookieBanner');
    var gear = document.getElementById('cookieGear');

    if (!banner) return;

    // Read saved preference
    var consent = getConsent();

    if (consent === null) {
        // First visit: show banner
        showBanner();
    } else {
        // Returning visit: apply saved preference
        showGear();
        if (consent === 'accepted') {
            loadAllMaps();
        }
    }

    // Accept all
    var acceptBtn = document.getElementById('cookieAcceptAll');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            saveConsent('accepted');
            hideBanner();
            showGear();
            loadAllMaps();
        });
    }

    // Reject (only necessary)
    var rejectBtn = document.getElementById('cookieRejectAll');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            saveConsent('rejected');
            hideBanner();
            showGear();
        });
    }

    // Gear icon: reopen banner
    if (gear) {
        gear.addEventListener('click', function() {
            showBanner();
            gear.classList.remove('visible');
        });
    }

    // Map placeholder buttons: accept and load single map
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('map-placeholder-btn')) {
            saveConsent('accepted');
            hideBanner();
            showGear();
            loadAllMaps();
        }
    });

    // --- Helpers ---

    function getConsent() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            return null;
        }
    }

    function saveConsent(value) {
        try {
            localStorage.setItem(STORAGE_KEY, value);
        } catch (e) {
            // localStorage not available
        }
    }

    function showBanner() {
        // Small delay for CSS transition
        requestAnimationFrame(function() {
            banner.classList.add('visible');
        });
    }

    function hideBanner() {
        banner.classList.remove('visible');
    }

    function showGear() {
        if (gear) {
            gear.classList.add('visible');
        }
    }

    function loadAllMaps() {
        var placeholders = document.querySelectorAll('.map-placeholder[data-src]');
        placeholders.forEach(function(ph) {
            var src = ph.getAttribute('data-src');
            if (!src) return;

            var iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.width = '100%';
            iframe.height = '250';
            iframe.style.border = '0';
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('loading', 'lazy');
            iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
            iframe.title = ph.getAttribute('data-title') || 'Google Maps';

            ph.parentNode.replaceChild(iframe, ph);
        });
    }
})();
