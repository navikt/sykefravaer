import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { getGjenopptattArbeidFulltUtDato } from '../../utils/connectGjenopptattArbeidFulltUtDato';
import { getFeriePermisjonEllerUtenlandsoppholdSporsmal } from './FravaerOgFriskmelding/FeriePermisjonEllerUtenlandsopphold';

const ansvarBekreftet = 'ansvarBekreftet';
const bruktEgenmeldingsdagerFoerLegemeldtFravaer = 'bruktEgenmeldingsdagerFoerLegemeldtFravaer';
const egenmeldingsperioder = 'egenmeldingsperioder';
const harGjenopptattArbeidFulltUt = 'harGjenopptattArbeidFulltUt';
const gjenopptattArbeidFulltUtDato = 'gjenopptattArbeidFulltUtDato';
const harHattFeriePermisjonEllerUtenlandsopphold = 'harHattFeriePermisjonEllerUtenlandsopphold';

const hovedsporsmal = [ansvarBekreftet, bruktEgenmeldingsdagerFoerLegemeldtFravaer, harGjenopptattArbeidFulltUt, harHattFeriePermisjonEllerUtenlandsopphold];

const undersporsmal = {};
undersporsmal[bruktEgenmeldingsdagerFoerLegemeldtFravaer] = egenmeldingsperioder;
undersporsmal[harGjenopptattArbeidFulltUt] = gjenopptattArbeidFulltUtDato;

const nokler = {};
nokler[ansvarBekreftet] = 'sykepengesoknad.bekreft-ansvar.label';
nokler[bruktEgenmeldingsdagerFoerLegemeldtFravaer] = 'sykepengesoknad.egenmeldingsdager.janei.sporsmal';
nokler[egenmeldingsperioder] = 'sykepengesoknad.egenmeldingsdager.dato.sporsmal';
nokler[harGjenopptattArbeidFulltUt] = 'sykepengesoknad.gjenopptatt-arbeid-fullt-ut.janei.sporsmal';
nokler[gjenopptattArbeidFulltUtDato] = 'sykepengesoknad.gjenopptatt-arbeid-fullt-ut.dato.sporsmal';
nokler[harHattFeriePermisjonEllerUtenlandsopphold] = 'sykepengesoknad.ferie-permisjon-utenlandsopphold.janei.sporsmal';

const CHECKBOX = 'CHECKBOX';
const RADIOKNAPPER = 'RADIOKNAPPER';
const TEKSTSVAR = 'TEKSTSVAR';

const getType = (felt) => {
    switch (felt) {
        case ansvarBekreftet: {
            return CHECKBOX;
        }
        default: {
            return RADIOKNAPPER;
        }
    }
}

const getNokkelOgVerdier = (nokkel, verdier) => {
    if (verdier) {
        return {
            nokkel, verdier,
        };    
    }
    return { nokkel };
};

const getSporsmalstekst = (felt, sykepengesoknad, skjemasoknad) => {
    const nokkel = nokler[felt];
    switch (felt) {
        case bruktEgenmeldingsdagerFoerLegemeldtFravaer: {
            return getNokkelOgVerdier(nokkel, {
                '%DATO%': toDatePrettyPrint(sykepengesoknad.identdato),
            });
        }
        case harGjenopptattArbeidFulltUt: {
            return getNokkelOgVerdier(nokkel, {
                '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
            });
        }
        case harHattFeriePermisjonEllerUtenlandsopphold: {
            const gjenopptattArbeidFulltUtDato = getGjenopptattArbeidFulltUtDato(skjemasoknad);
            return getFeriePermisjonEllerUtenlandsoppholdSporsmal(sykepengesoknad, gjenopptattArbeidFulltUtDato, getNokkelOgVerdier);
        }
        default: {
            return getNokkelOgVerdier(nokkel);
        }
    }
};

const getSvar = (felt, skjemasoknad) => {
    switch (undersporsmal[felt]) {
        case egenmeldingsperioder: {
            return skjemasoknad[egenmeldingsperioder].map(({fom, tom}) => {
                return {
                    svartekst: `Fra ${fom} Til ${tom}`,
                    type: TEKSTSVAR,
                };
            })
        }
        case gjenopptattArbeidFulltUtDato: {
            return [{
                svartekst: skjemasoknad[gjenopptattArbeidFulltUtDato],
                type: TEKSTSVAR,
            }]
        }
    }
}

const getUndersporsmal = (felt, skjemasoknad) => {
    if (!undersporsmal[felt] || !skjemasoknad[felt]) {
        return {};
    }
    
    return {
        undersporsmal: [{
            sporsmalstekst: getSporsmalstekst(undersporsmal[felt]),
            svar: getSvar(felt, skjemasoknad),
        }]
    }
}

export default (skjemasoknad, sykepengesoknad) => {
    return hovedsporsmal.map((felt) => {
        const sporsmal = {
            sporsmalstekst: getSporsmalstekst(felt, sykepengesoknad, skjemasoknad),
            svar: [{
                svartekst: skjemasoknad[felt] ? 'Ja' : 'Nei',
                type: getType(felt),
            }],
        };
        let undersporsmal = getUndersporsmal(felt, skjemasoknad);
        return { ...sporsmal, ...undersporsmal };
    });
};
