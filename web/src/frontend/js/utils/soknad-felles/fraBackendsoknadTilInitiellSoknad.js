import { CHECKBOX_PANEL, FRITEKST, JA_NEI, PERIODER } from '../../enums/svartyper';
import { genererParseForEnkeltverdi } from '../../components/soknad-felles/fieldUtils';

const tilInitielleSvarverder = ({ svar, svartype, id }) => {
    const parse = genererParseForEnkeltverdi(id);

    switch (svartype) {
        case PERIODER: {
            return svar.length === 0
                ? [{}]
                : svar.map((s) => {
                    const periode = JSON.parse(s.verdi);
                    return {
                        fom: periode.fom,
                        tom: periode.tom,
                    };
                });
        }
        case JA_NEI:
        case CHECKBOX_PANEL:
        case FRITEKST: {
            return svar.length > 0
                ? parse(svar[0].verdi)
                : svar;
        }
        default: {
            return null;
        }
    }
};

const tilInitieltSvar = (sporsmal, verdier) => {
    let returVerdier = { ...verdier };
    sporsmal.undersporsmal.forEach((spm) => {
        returVerdier = tilInitieltSvar(spm, returVerdier);
    });
    return {
        ...returVerdier,
        [sporsmal.tag]: tilInitielleSvarverder(sporsmal),
    };
};

export default (soknad) => {
    let verdier = {};
    soknad.sporsmal.forEach((spm) => {
        verdier = tilInitieltSvar(spm, verdier);
    });
    return verdier;
};
