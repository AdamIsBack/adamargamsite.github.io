// Interactive left/right divider for the landing page
const leftPanel = document.getElementById('left-panel');
const rightPanel = document.getElementById('right-panel');
const container = document.getElementById('split-container');
const body = document.body;

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
    navigateWithTransition('/VoiceActorSide.html');
});

rightPanel.addEventListener('click', () => {
    navigateWithTransition('/GameDesignerSide.html?from=intro');
});

document.querySelectorAll('a[href="/VoiceActorSide.html"]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        navigateWithTransition('/VoiceActorSide.html');
    });
});

document.querySelectorAll('a[href="/GameDesignerSide.html"]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        navigateWithTransition('/GameDesignerSide.html?from=intro');
    });
});

// initialize panels to centre
adjustPanels(window.innerWidth / 2);
