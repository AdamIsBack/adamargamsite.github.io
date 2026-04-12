(function () {
    const body = document.body;
    const factText = document.getElementById('fact-text');
    const exploreButton = document.getElementById('explore-btn');
    const starCard = document.getElementById('star-card');
    const triangleBurst = document.querySelector('.triangle-burst');

    const facts = [
        'Monkey see, Monkey do.',
        'Birthday Bash!',
        'Time Is Now!',
        'I love my friends! :D',
        'Scooby dooby doo!',
        'Hire me please, I need money!',
        'This is true!',
        'Honderd.',
        'Ooooooooh...',
        'GET OUT OF MY HEAD!!!',
        'Comme ci, comme ça',
        'I make game.',

    ];

    if (new URLSearchParams(window.location.search).get('from') === 'intro') {
        body.classList.add('from-intro');
    }

    window.setTimeout(() => {
        body.classList.add('ready');
    }, 30);

    if (factText) {
        let previousIndex = -1;
        let swapDelayId = null;
        let factIntervalId = null;

        const swapFact = () => {
            let nextIndex = Math.floor(Math.random() * facts.length);
            while (nextIndex === previousIndex && facts.length > 1) {
                nextIndex = Math.floor(Math.random() * facts.length);
            }

            previousIndex = nextIndex;
            factText.classList.add('swap');

            if (swapDelayId !== null) {
                window.clearTimeout(swapDelayId);
            }

            swapDelayId = window.setTimeout(() => {
                factText.textContent = facts[nextIndex];
                factText.classList.remove('swap');
                swapDelayId = null;
            }, 160);
        };

        const startFactLoop = () => {
            if (factIntervalId !== null) {
                return;
            }

            factIntervalId = window.setInterval(swapFact, 3900);
        };

        const stopFactLoop = () => {
            if (factIntervalId !== null) {
                window.clearInterval(factIntervalId);
                factIntervalId = null;
            }

            if (swapDelayId !== null) {
                window.clearTimeout(swapDelayId);
                swapDelayId = null;
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                stopFactLoop();
                return;
            }

            swapFact();
            startFactLoop();
        };

        const handlePageHide = () => {
            stopFactLoop();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', handlePageHide);
        };

        swapFact();
        startFactLoop();
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', handlePageHide);
    }

    const goToPortfolio = () => {
        if (body.classList.contains('to-portfolio')) {
            return;
        }

        body.classList.add('to-portfolio');
        window.setTimeout(() => {
            window.location.href = '/Explore.html';
        }, 1050);
    };

    if (exploreButton) {
        exploreButton.addEventListener('click', goToPortfolio);
    }

    if (starCard) {
        starCard.addEventListener('click', goToPortfolio);
    }

    if (triangleBurst) {
        triangleBurst.addEventListener('click', goToPortfolio);
    }
})();
