const moment = require('moment');

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

export function formatDate(date) {
    return moment(date).format('DD.MM.YYYY');
}

export function getDuration(from, to) {
    const fromMoment = moment(from);
    const toMoment = moment(to);
    return toMoment.diff(fromMoment, 'days') + 1;
}

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


export function sorterPerioder(sykmelding) {
    return Object.assign(sykmelding, {
        mulighetForArbeid: {
            perioder: sykmelding.mulighetForArbeid.perioder.sort((a, b) => {
                const kriterium = a.fom !== b.fom ? 'fom' : 'tom';
                return a[kriterium] < b[kriterium] ? -1 : 1;
            }),
        },
    });
}

export function sorterSykmeldinger(sykmeldinger = [], kriterium = 'fom') {
    sykmeldinger.map(sorterPerioder);
    return sykmeldinger.sort((a, b) => {
        if (kriterium === 'fom' || a.arbeidsgiver.trim().toUpperCase() === b.arbeidsgiver.trim().toUpperCase()) {
            return a.mulighetForArbeid.perioder[0].fom > b.mulighetForArbeid.perioder[0].fom ? -1 : 1;
        }
        return Object.byString(a, kriterium) < Object.byString(b, kriterium) ? -1 : 1;
    });
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
