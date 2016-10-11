export function scrollTo(element, duration) {
    const started = Date.now();
    const ends = started + duration;
    const y = Math.min(document.body.scrollTop + element.getBoundingClientRect().top, document.body.scrollHeight - window.innerHeight);

    const tick = () => {
        let distanceLeft;
        let dt;
        let tickDuration;
        let travel;
        const t = Date.now();
        if (t < ends) {
            dt = t - started;
            tickDuration = ends - started;
            distanceLeft = y - document.body.scrollTop;
            travel = distanceLeft * (dt / tickDuration);
            document.body.scrollTop += travel;
            window.requestAnimationFrame(tick);
        } else {
            document.body.scrollTop = y;
        }
    };

    window.requestAnimationFrame(tick);
}

export function erSynligIViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export function harLocalStorageStotte() {
    try {
        return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
        return false;
    }
}