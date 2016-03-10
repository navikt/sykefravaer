var moment = require("moment");

export function formatDate(date) {
	return moment(date).format("DD.MM.YYYY")
}

export function getDuration(from, to) {
	var fromMoment = moment(from);
	var toMoment = moment(to);
	return toMoment.diff(fromMoment, "days");
}

export function scrollTo (element, duration) {

	var started = Date.now(); 
	var ends = started + duration; 
	var y = Math.min(document.body.scrollTop + element.getBoundingClientRect().top, document.body.scrollHeight - window.innerHeight);	

	var tick = () => {
		var distanceLeft, dt, duration, t, travel;
		t = Date.now();
		if (t < ends) {
			dt = t - started;
			duration = ends - started;
			distanceLeft = y - document.body.scrollTop;
			travel = distanceLeft * (dt / duration);
			document.body.scrollTop += travel;
			window.requestAnimationFrame(tick);
		} else {
			document.body.scrollTop = y;
		}		
	}

	window.requestAnimationFrame(tick);
};