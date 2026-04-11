// Interactive left/right divider for the landing page
const leftPanel = document.getElementById('left-panel');
const rightPanel = document.getElementById('right-panel');
const container = document.getElementById('split-container');
const body = document.body;
const footerBanner = document.getElementById('footer-banner');

function lockIntroFooterStyle() {
    if (!footerBanner) {
        return;
    }

    footerBanner.style.position = 'fixed';
    footerBanner.style.left = '0';
    footerBanner.style.right = '0';
    footerBanner.style.bottom = '0';
    footerBanner.style.height = '38px';
    footerBanner.style.background = '#ff157d';
    footerBanner.style.borderTop = '1px solid #b10a56';
    footerBanner.style.borderBottom = '1px solid #b10a56';
    footerBanner.style.color = '#fff';
    footerBanner.style.display = 'flex';
    footerBanner.style.alignItems = 'center';
    footerBanner.style.justifyContent = 'center';
    footerBanner.style.zIndex = '2147483647';
    footerBanner.style.visibility = 'visible';
    footerBanner.style.opacity = '1';
}

function navigateWithTransition(destination) {
    if (body.classList.contains('page-transition-out')) {
        return;
    }

    body.classList.add('page-transition-out');
    window.setTimeout(() => {
        window.location.href = destination;
    }, 430);
}

function adjustPanels(x) {
    const width = window.innerWidth;
    const leftDeadzone = width * 0.10;
    const rightDeadzone = width * 0.90;
    
    let ratio;
    if (x < leftDeadzone) {
        // Left 25%: expand left panel
        ratio = 0;
    } else if (x > rightDeadzone) {
        // Right 25%: expand right panel
        ratio = 1;
    } else {
        // Middle 50%: calculate ratio between the two deadzones
        ratio = (x - leftDeadzone) / (rightDeadzone - leftDeadzone);
    }
    
    // flip the ratio so left panel grows when cursor moves left
    leftPanel.style.flex = 1 - ratio;
    rightPanel.style.flex = ratio;
}

// Mouse movement handler
container.addEventListener('mousemove', e => {
    adjustPanels(e.clientX);
});

// Touch support
container.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
        adjustPanels(e.touches[0].clientX);
    }
});

// Click handlers to navigate
leftPanel.addEventListener('click', () => {
    navigateWithTransition('/voice.html');
});

rightPanel.addEventListener('click', () => {
    navigateWithTransition('/game.html?from=intro');
});

document.querySelectorAll('a[href="/voice.html"]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        navigateWithTransition('/voice.html');
    });
});

document.querySelectorAll('a[href="/game.html"]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        navigateWithTransition('/game.html?from=intro');
    });
});

// initialize panels to centre
adjustPanels(window.innerWidth / 2);
lockIntroFooterStyle();
window.addEventListener('resize', lockIntroFooterStyle);
