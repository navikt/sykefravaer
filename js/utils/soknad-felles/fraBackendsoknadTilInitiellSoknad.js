import { toDatePrettyPrint } from 'digisyfo-npm';
import { CHECKBOX, CHECKBOX_PANEL, DATO, FRITEKST, JA_NEI, PERIODER, PROSENT, TIMER, TALL, RADIO_GRUPPE } from '../../enums/svartyper';
import { genererParseForEnkeltverdi } from '../../components/soknad-felles-sporsmal/fieldUtils';
import { ANSVARSERKLARING, BEKREFT_OPPLYSNINGER } from '../../enums/tagtyper';

const tilInitielleSvarverder = ({ svar, svartype, id }) => {
    const parse = genererParseForEnkeltverdi(id);
    switch (svartype) {
        case DATO:
            return parse(toDatePrettyPrint(new Date(svar[0].verdi)));
        case PERIODER: {
            return svar.map((s) => {
                const periode = JSON.parse(s.verdi);
                return periode && periode.fom && periode.tom
                    ? {
                        fom: periode.fom.split('.').length === 3 ? periode.fom : toDatePrettyPrint(periode.fom),
                        tom: periode.tom.split('.').length === 3 ? periode.tom : toDatePrettyPrint(periode.tom),
                    }
                    : {};
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
        case RADIO_GRUPPE:
            return parse(svar[0].verdi);
        default: {
            return null;
        }
    }
};

export default (soknad) => {
    const flatten = (sporsmal, accumulator = []) => {
        accumulator.push(sporsmal);
        sporsmal.undersporsmal.forEach((undersporsmal) => { return flatten(undersporsmal, accumulator); });
        return accumulator;
    };

    const alleSporsmal = soknad.sporsmal
        .map((sporsmal) => { return flatten(sporsmal); })
        .flatten();

    return alleSporsmal
        // Dette må skje i backend ved korrigering! .filter((spm) => { return spm.tag !== ANSVARSERKLARING && spm.tag !== BEKREFT_OPPLYSNINGER; })
        .filter((spm) => { return spm.svar.length > 0; })
        .reduce((acc, sporsmal) => {
            acc[sporsmal.tag] = tilInitielleSvarverder(sporsmal);
            return acc;
        }, {});
};
