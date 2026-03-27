(function () {
    const body = document.body;
    const factText = document.getElementById('fact-text');
    const exploreButton = document.getElementById('explore-btn');

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

        const swapFact = () => {
            let nextIndex = Math.floor(Math.random() * facts.length);
            while (nextIndex === previousIndex && facts.length > 1) {
                nextIndex = Math.floor(Math.random() * facts.length);
            }

            previousIndex = nextIndex;
            factText.classList.add('swap');

            window.setTimeout(() => {
                factText.textContent = facts[nextIndex];
                factText.classList.remove('swap');
            }, 160);
        };

        swapFact();
        window.setInterval(swapFact, 3900);
    }

    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            if (body.classList.contains('to-portfolio')) {
                return;
            }

            body.classList.add('to-portfolio');
            window.setTimeout(() => {
                window.location.href = '/Project.html';
            }, 1050);
        });
    }
})();
