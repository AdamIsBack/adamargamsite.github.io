(function () {
    const body = document.body;
    const shards = Array.from(document.querySelectorAll('.shard'));
    const shardVideos = Array.from(document.querySelectorAll('.shard-video'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const EXIT_WAVES = 4;
    const EXIT_WAVE_GAP_MS = 170;
    const EXIT_FADE_MS = 240;
    const EXIT_TOTAL_MS = 750;
    let transitionLocked = false;

    window.setTimeout(() => {
        body.classList.add('ready');
    }, 30);

    function navigateWithShard(shard, event) {
        if (!shard || transitionLocked) {
            return;
        }

        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button === 1) {
            return;
        }

        const target = shard.dataset.link || shard.getAttribute('href');
        if (!target) {
            return;
        }

        if (reduceMotion) {
            event.preventDefault();
            window.location.href = target;
            return;
        }

        event.preventDefault();
        transitionLocked = true;

        const rect = shard.getBoundingClientRect();
        const clientX = typeof event.clientX === 'number' ? event.clientX : rect.left + rect.width / 2;
        const clientY = typeof event.clientY === 'number' ? event.clientY : rect.top + rect.height / 2;
        const originX = ((clientX - rect.left) / rect.width) * 100;
        const originY = ((clientY - rect.top) / rect.height) * 100;

        shard.style.setProperty('--origin-x', `${originX}%`);
        shard.style.setProperty('--origin-y', `${originY}%`);

        shards.forEach((item) => {
            item.classList.remove('shard-selected');
            item.classList.remove('shard-exiting');
            item.style.setProperty('--exit-delay', '0ms');
        });

        shard.classList.add('shard-selected');

        // Farthest shards fade first, nearest shards fade last.
        const selectedRect = shard.getBoundingClientRect();
        const selectedCenterX = selectedRect.left + selectedRect.width / 2;
        const selectedCenterY = selectedRect.top + selectedRect.height / 2;
        const others = shards
            .filter((item) => item !== shard)
            .map((item) => {
                const rectInfo = item.getBoundingClientRect();
                const centerX = rectInfo.left + rectInfo.width / 2;
                const centerY = rectInfo.top + rectInfo.height / 2;
                const dx = centerX - selectedCenterX;
                const dy = centerY - selectedCenterY;
                return {
                    item,
                    distance: Math.hypot(dx, dy)
                };
            });

        others.sort((a, b) => b.distance - a.distance);
        const perWave = Math.max(1, Math.ceil(others.length / EXIT_WAVES));

        others.forEach((entry, index) => {
            const waveIndex = Math.min(EXIT_WAVES - 1, Math.floor(index / perWave));
            const delayMs = waveIndex * EXIT_WAVE_GAP_MS;
            entry.item.style.setProperty('--exit-delay', `${delayMs}ms`);
            entry.item.classList.add('shard-exiting');
        });

        body.classList.add('is-transitioning');

        window.setTimeout(() => {
            window.location.href = target;
        }, EXIT_TOTAL_MS);
    }

    function pauseVideo(video) {
        if (!video) {
            return;
        }
        video.pause();
        video.currentTime = 0;
    }

    function playVideo(video) {
        if (!video) {
            return;
        }
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
                // Ignore autoplay policy rejections silently.
            });
        }
    }

    shardVideos.forEach((video) => {
        video.muted = true;
        pauseVideo(video);
    });

    shards.forEach((shard) => {
        const video = shard.querySelector('.shard-video');

        shard.addEventListener('click', (event) => {
            navigateWithShard(shard, event);
        });

        shard.addEventListener('mouseenter', () => {
            playVideo(video);
        });

        shard.addEventListener('mouseleave', () => {
            pauseVideo(video);
        });

        shard.addEventListener('focusin', () => {
            playVideo(video);
        });

        shard.addEventListener('focusout', () => {
            pauseVideo(video);
        });

        shard.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }
            navigateWithShard(shard, event);
        });
    });
})();
