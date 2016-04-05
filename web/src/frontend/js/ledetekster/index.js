const labels = {
	'applikasjon.siden-laster': 'Siden laster',
	'404.tittel': 'Ooops!',
	'404.tekst': 'Fant ikke siden du lette etter – er du sikker på at du er på riktig sted?',
	'dine-sykmeldinger.tittel': 'Dine sykmeldinger',
	'dine-sykmeldinger.introduksjonstekst': 'NAV mottar alle dine sykmeldinger, og har ansvar for sykepengeordningen. En sykmelding er formelt sett en anbefaling fra lege/sykmelder, som i de fleste tilfeller gir grunnlag for sykepenger.',
	'dine-sykmeldinger.aktive-sykmeldinger.tittel': 'Aktive sykmeldinger',
	'dine-sykmeldinger.tidligere-sykmeldinger.tittel': 'Tidligere sykmeldinger',
	'dine-sykmeldinger.informasjon.tittel': 'Informasjon om sykmeldingen',
	'dine-sykmeldinger.informasjon.tekst': '<p>Her kommer tekst <strong>som kan formateres</strong></p><p>slik brukeren ønsker</p>',
	'sykmelding.teaser.fulltittel': 'Sykmelding fra %FOM% til %TOM%',
	'sykmelding.teaser.tittel': 'Sykmelding',
	'sykmelding.teaser.dato': 'fra %FOM% til %TOM%',
	'sykmelding.teaser.tekst': 'Du er %GRAD% sykmeldt fra %ARBEIDSGIVER% i %DAGER% dager',
	'sykmelding.vis.tittel': 'Sykmelding',
	'sykmelding.vis.periode.tittel': 'Periode',
	'sykmelding.vis.periode.tekst': 'Fra og med <strong>%FOM%</strong> til og med <strong>%TOM%</strong> – %DAGER% dager',
	'sykmelding.vis.grad.tittel': 'Grad',
	'sykmelding.vis.arbeidsgiver.tittel': 'Arbeidsgiver',
	'sykmelding.vis.diagnose.tittel': 'Diagnose',
	'sykmelding.vis.friskmelding.tittel': 'Friskmelding',
	'sykmelding.vis.friskmelding.tekst': 'arbeidsfør etter perioden',
	'sykmelding.vis.bekreft.tekst': 'Gå videre',
	'sykmelding.vis.avvis.tekst': 'Avvis sykmelding',
	'sykmelding.send-til-arbeidsgiver.tittel': 'Send sykmelding til arbeidsgiver',
	'sykmelding.send-til-arbeidsgiver.infotekst': 'En forklarende tekst',
	'sykmelding.send-til-arbeidsgiver.velg-arbeidsgiver.sporsmal': 'Arbeidsgiver for denne sykmeldingen',
	'sykmelding.send-til-arbeidsgiver.sok-etter-arbeidsgiver.label': 'Er det ikke en av disse? Søk etter arbeidsgiver.',
	'sykmelding.send-til-arbeidsgiver.sok-etter-arbeidsgiver.placeholder': 'Søk',
	'sykmelding.send-til-arbeidsgiver.send': 'Send til arbeidsgiver',
	'sykmelding.send-til-arbeidsgiver.avbryt': 'Avbryt',
	'sykmelding.send-til-arbeidsgiver.kvittering.tittel': 'Sykmeldingen er sendt til arbeidsgiver',
};

function replace(str, replacements) {
	return str.replace(/%\w+%/g, (all) => {
		return replacements[all] || all;
	});
}

export function getHtmlLedetekst(key, replacements) {
	let label = labels[key];
	if (!label) {
		label = key + ' [MANGLER LEDETEKST]';
	}
	if (replacements) {
		label = replace(label, replacements);
	}
	return { __html: label };
}

export function getLedetekst(key, replacements) {
	const label = labels[key];
	if (!label) {
		return key + ' [MANGLER LEDETEKST]';
	}
	if (!replacements) {
		return label;
	}
	return replace(label, replacements);
}
