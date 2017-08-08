import { fraInputdatoTilJSDato } from '../../utils';

const parsePerioder = (perioder) => {
    return perioder.map((periode) => {
        return {
            fom: fraInputdatoTilJSDato(periode.fom),
            tom: fraInputdatoTilJSDato(periode.tom),
        };
    });
};

const parseInntektskilder = (inntektskilder) => {
    return inntektskilder.filter((i) => {
        return i.avkrysset;
    }).map((i) => {
        return {
            annenInntektskildeType: i.annenInntektskildeType,
            sykmeldt: i.sykmeldt,
        };
    });
};

const getUtenlandsopphold = (utenlandsopphold) => {
    return {
        soektOmSykepengerIPerioden: utenlandsopphold.soektOmSykepengerIPerioden,
        perioder: parsePerioder(utenlandsopphold.perioder),
    };
};

const getUtdanning = (utdanning) => {
    if (utdanning.underUtdanningISykmeldingsperioden) {
        return {
            utdanningStartdato: fraInputdatoTilJSDato(utdanning.utdanningStartdato),
            erUtdanningFulltidsstudium: utdanning.erUtdanningFulltidsstudium,
        };
    }
    return null;
};

const getAktiviteter = (aktiviteter) => {
    return aktiviteter.map((aktivitet) => {
        const _a = {
            periode: aktivitet.periode,
            grad: aktivitet.grad,
            id: aktivitet.id,
        };
        if (aktivitet.jobbetMerEnnPlanlagt) {
            _a.avvik = {
                arbeidstimerNormalUke: parseFloat(aktivitet.avvik.arbeidstimerNormalUke.replace(',', '.')),
            };
            if (aktivitet.avvik.enhet === 'timer') {
                _a.avvik.timer = parseFloat(aktivitet.avvik.timer.replace(',', '.'));
            } else {
                _a.avvik.arbeidsgrad = parseFloat(aktivitet.avvik.arbeidsgrad.replace(',', '.'));
            }
        } else {
            _a.avvik = null;
        }
        return _a;
    });
};

const frontendProps = [
    'bruktEgenmeldingsdagerFoerLegemeldtFravaer',
    'harGjenopptattArbeidFulltUt',
    'harHattFeriePermisjonEllerUtenlandsopphold',
    'harHattFerie',
    'harHattPermisjon',
    'harHattUtenlandsopphold',
    'utenlandsoppholdSoktOmSykepenger',
    'harAndreInntektskilder',
    '_erOppdelt',
];

const mapSkjemasoknadToBackendsoknad = (soknad, alternativer = {}) => {
    const harHattPermisjon = soknad.harHattFeriePermisjonEllerUtenlandsopphold && soknad.harHattPermisjon;
    const harHattFerie = soknad.harHattFeriePermisjonEllerUtenlandsopphold && soknad.harHattFerie;
    const harHattUtenlandsopphold = soknad.harHattFeriePermisjonEllerUtenlandsopphold && soknad.harHattUtenlandsopphold;

    const permisjon = harHattPermisjon ? soknad.permisjon : [];
    const ferie = harHattFerie ? soknad.ferie : [];
    const utenlandsopphold = harHattUtenlandsopphold ? getUtenlandsopphold(soknad.utenlandsopphold) : null;

    const backendSoknad = Object.assign({}, soknad, {
        permisjon: parsePerioder(permisjon),
        ferie: parsePerioder(ferie),
        utenlandsopphold,
        andreInntektskilder: parseInntektskilder(soknad.andreInntektskilder),
        gjenopptattArbeidFulltUtDato: soknad.harGjenopptattArbeidFulltUt ? fraInputdatoTilJSDato(soknad.gjenopptattArbeidFulltUtDato) : null,
        egenmeldingsperioder: soknad.bruktEgenmeldingsdagerFoerLegemeldtFravaer ? parsePerioder(soknad.egenmeldingsperioder) : [],
        aktiviteter: getAktiviteter(soknad.aktiviteter),
        utdanning: getUtdanning(soknad.utdanning),
    });

    if (!alternativer.visForskutteringssporsmal) {
        delete backendSoknad.arbeidsgiverForskutterer;
    }

    frontendProps.forEach((prop) => {
        delete backendSoknad[prop];
    });
    return backendSoknad;
};

export default mapSkjemasoknadToBackendsoknad;
