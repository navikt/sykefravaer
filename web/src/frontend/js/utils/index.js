// Fra Stack Overflow <3
Object.byString = function byString(o, s) {
    let s_ = s;
    let o_ = o;
    s_ = s_.replace(/\[(\w+)]/g, '.$1');
    s_ = s_.replace(/^\./, '');
    const a = s_.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i];
        if (k in o_) {
            o_ = o_[k];
        } else {
            return undefined;
        }
    }
    return o_;
};

export const getCookie = (name) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

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

export function harLocalStorageStotte() {
    try {
        return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
        return false;
    }
}

export function onResizeThrottle(callback) {
    let resizeTimeout;
    const resizeThrottler = () => {
        // ignore resize events as long as an actualResizeHandler execution is in the queue
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(() => {
                resizeTimeout = null;
                if (typeof callback === 'function') {
                    callback();
                }

                // The actualResizeHandler will execute at a rate of 15fps
            }, 66);
        }
    };
    window.addEventListener('resize', resizeThrottler, false);
}

export function getSykmelding(sykmeldinger, sykmeldingId) {
    return sykmeldinger.filter((sykmld) => {
        return `${sykmld.id}` === `${sykmeldingId}`;
    })[0];
}
