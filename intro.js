// Interactive left/right divider for the landing page
const leftPanel = document.getElementById('left-panel');
const rightPanel = document.getElementById('right-panel');
const container = document.getElementById('split-container');

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
    // placeholder for voice acting section
    window.location.href = '/voice.html';
});

rightPanel.addEventListener('click', () => {
    // navigate to the game design page
    window.location.href = '/game.html';
});

// initialize panels to centre
adjustPanels(window.innerWidth / 2);
