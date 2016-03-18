const paths = [{
	"fullPath": "/syfofront/app/dine-sykmeldinger",
	"tittel": "Dine sykmeldinger",
	"key": "dine-sykmeldinger",
	"path": "dine-sykmeldinger"
}, {
	"fullPath": "/syfofront/app/dine-sykmeldinger/:sykmeldingId",
	"path": "/dine-sykmeldinger",
	"tittel": "Sykmelding",
	"key": "sykmelding"
}, {
	"fullPath": "/syfofront/app/dine-sykmeldinger/:sykmeldingId/send-til-arbeidsgiver",
	"path": "",
	"tittel": "Send til arbeidsgiver",
	"key": "send-til-arbeidsgiver"
}, {
	"fullPath": "/syfofront/app/dine-sykmeldinger/:sykmeldingId/sendt",
	"path": "",
	"tittel": "Sendt til arbeidsgiver",
	"key": "sendt"
}, {
	"fullPath": "/",
	"path": "/",
	"tittel": "Ditt NAV",
	"key": ""
}];

export function getPathByKey(key) {
	return paths.filter((path) => {
		var crumbs = path.fullPath.split("/");
		var lastCrumb = crumbs[crumbs.length - 1];
		return key === lastCrumb || key === path.key
	})[0]
}

export function getPathByFullPath(fullPath) {
	return paths.filter((path) => {
		return path.fullPath === fullPath
	})[0]	
}

export function getContextRoot() {
	return "/syfofront/app";
}

export default paths; 