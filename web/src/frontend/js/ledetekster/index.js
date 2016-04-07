const labels = {
	'applikasjon.siden-laster': 'Siden laster',
	'404.tittel': 'Ooops!',
	'404.tekst': 'Fant ikke siden du lette etter – er du sikker på at du er på riktig sted?',
	'dine-sykmeldinger.tittel': 'Dine sykmeldinger',
	'dine-sykmeldinger.introduksjonstekst': 'NAV mottar alle sykmeldinger fra leger og andre som kan sykmelde. På denne siden kan du se sykmeldingene dine. Når det gjelder sykepenger, må du fortsatt <a href="http://www.nav.no">søke</a> om dette på vanlig måte. ',
	'dine-sykmeldinger.aktive-sykmeldinger.tittel': 'Aktive sykmeldinger',
	'dine-sykmeldinger.tidligere-sykmeldinger.tittel': 'Tidligere sykmeldinger',
	'dine-sykmeldinger.informasjon.tittel': 'Hvem gjør hva når du er sykmeldt',
	'dine-sykmeldinger.informasjon.tekst': '<p>Du kan bli sykmeldt når det er medisinske grunner som hindrer deg i å være i arbeid. Ofte er det likevel mulig å være helt eller delvis i arbeid hvis arbeidsgiveren kan gjøre tilpasninger for deg på arbeidsplassen.</p><h3>Sykmeldt</h3><p>Som sykmeldt skal du være med og finne løsninger slik at sykefraværet ditt ikke varer lenger enn nødvendig. </p><h3>Lege/sykmelder</h3><p>Den som sykmelder deg skal vurdere om det er nødvendig med hel eller delvis sykmelding og anbefale aktivitet hvis det er medisinsk forsvarlig.</p><h3>Arbeidsgiver</h3><p>Arbeidsgiveren skal følge deg opp og legge til rette for at du kan være i aktivitet på arbeidsplassen. </p><h3>NAV</h3><p>Hvis du ikke har tilknytning til en arbeidsgiver, er det NAV-kontoret som skal gi deg veiledning og oppfølging. NAV har også ansvaret for å utbetale sykepenger til deg.</p>',
	'sykmelding.teaser.fulltittel': 'Sykmelding fra %FOM% til %TOM%',
	'sykmelding.teaser.tittel': 'Sykmelding',
	'sykmelding.teaser.dato': 'fra %FOM% til %TOM%',
	'sykmelding.teaser.tekst': 'Du er %GRAD% % sykmeldt fra %ARBEIDSGIVER% i %DAGER% dager',
	'sykmelding.vis.hovedtittel': 'Din sykmelding',
	'sykmelding.vis.tittel': 'Sykmelding',
	'sykmelding.vis.periode.tittel': 'Periode',
	'sykmelding.vis.periode.tekst': 'Fra og med <strong>%FOM%</strong> til og med <strong>%TOM%</strong> – %DAGER% dager',
	'sykmelding.vis.grad.tittel': 'Grad',
	'sykmelding.vis.grad.tekst': '%GRAD% % sykmeldt',
	'sykmelding.vis.arbeidsgiver.tittel': 'Arbeidsgiver for denne sykmeldingen',
	'sykmelding.vis.avsender.tittel': 'Avsender',
	'sykmelding.vis.diagnose.tittel': 'Diagnose',
	'sykmelding.vis.friskmelding.tittel': 'Friskmelding',
	'sykmelding.vis.friskmelding.tekst': 'arbeidsfør etter perioden',
	'sykmelding.vis.flere-opplysninger.tittel': 'Flere opplysninger fra lege',
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
