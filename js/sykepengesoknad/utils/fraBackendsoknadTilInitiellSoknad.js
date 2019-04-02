import { toDatePrettyPrint } from '@navikt/digisyfo-npm';
import { CHECKBOX, CHECKBOX_PANEL, DATO, FRITEKST, JA_NEI, PERIODER, PROSENT, TIMER, TALL, RADIO_GRUPPE, RADIO_GRUPPE_TIMER_PROSENT, RADIO } from '../enums/svartyper';
import { genererParseForEnkeltverdi } from '../felleskomponenter/sporsmal/fieldUtils';
import { CHECKED } from '../enums/svarEnums';

const tilPeriodedato = (datoEllerStreng) => {
    return datoEllerStreng.split('.').length === 3
        ? datoEllerStreng
        : toDatePrettyPrint(datoEllerStreng);
};

const tilInitielleSvarverder = ({ svar, svartype, undersporsmal, id }) => {
    const parse = genererParseForEnkeltverdi(id);
    switch (svartype) {
        case DATO:
            return parse(toDatePrettyPrint(new Date(svar[0].verdi)));
        case PERIODER: {
            return svar.length === 0
                ? [{}]
                : svar.map((s) => {
                    const periode = JSON.parse(s.verdi);
                    const returPeriode = {};
                    if (periode.fom) {
                        returPeriode.fom = tilPeriodedato(periode.fom);
                    }
                    if (periode.tom) {
                        returPeriode.tom = tilPeriodedato(periode.tom);
                    }
                    return returPeriode;
                });
        }
        case CHECKBOX:
            return parse(svar.map((_svar) => { return (_svar.verdi ? 'CHECKED' : 'UNCHECKED'); })[0]);
        case JA_NEI:
        case CHECKBOX_PANEL:
        case TIMER:
        case PROSENT:
        case FRITEKST:
        case TALL:
        case RADIO:
            return parse(svar[0].verdi);
        case RADIO_GRUPPE:
        case RADIO_GRUPPE_TIMER_PROSENT: {
            const aktivtUndersporsmal = undersporsmal.find((uspm) => {
                return uspm.svar[0]
                    && uspm.svar[0].verdi === CHECKED;
            });
            return aktivtUndersporsmal
                ? parse(aktivtUndersporsmal.sporsmalstekst)
                : null;
        }
        default: {
            return null;
        }
    }
};

const fraBackendsoknadTilInitiellSoknad = (soknad, frontendverdier = {}) => {
    const flatten = (sporsmal, accumulator = []) => {
        accumulator.push(sporsmal);
        sporsmal.undersporsmal.forEach((undersporsmal) => { return flatten(undersporsmal, accumulator); });
        return accumulator;
    };

    const alleSporsmal = soknad.sporsmal
        .map((sporsmal) => { return flatten(sporsmal); })
        .flatten()
        .filter((spm) => {
            return spm.svar.length > 0
                || spm.svartype === RADIO_GRUPPE
                || spm.svartype === RADIO_GRUPPE_TIMER_PROSENT
                || spm.svartype === PERIODER;
        });

    return alleSporsmal
        .reduce((acc, sporsmal) => {
            const backendSvar = tilInitielleSvarverder(sporsmal);
            const frontendSvar = frontendverdier[sporsmal.tag];
            const svar = (frontendSvar
                && frontendSvar.id
                && backendSvar
                && backendSvar.id === frontendSvar.id)
                || (sporsmal.svartype === PERIODER && frontendSvar)
                ? frontendSvar
                : backendSvar;
            console.log(sporsmal.tag, frontendSvar, backendSvar, frontendverdier);
            acc[sporsmal.tag] = svar;
            return acc;
        }, {});
};

export default fraBackendsoknadTilInitiellSoknad;
