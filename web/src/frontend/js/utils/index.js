const moment = require('moment');

export function formatDate(date) {
	return moment(date).format('DD.MM.YYYY');
}

export function getDuration(from, to) {
	const fromMoment = moment(from);
	const toMoment = moment(to);
	return toMoment.diff(fromMoment, 'days');
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
