import { fraInputdatoTilJSDato } from '../../../utils';

export const erIFortiden = (dato) => {
    const oppgittDato = fraInputdatoTilJSDato(dato);
    const dagensDato = new Date();
    return oppgittDato.getTime() < dagensDato.getTime();
};

export const datoErFoersteSykmeldingsdagEllerSenere = (dato, sykepengesoknad) => {
    const oppgittDato = fraInputdatoTilJSDato(dato);
    const foersteSykmeldingsdato = sykepengesoknad.identdato;
    return oppgittDato.getTime() >= foersteSykmeldingsdato.getTime();
};

export const harMinstEnPeriode = (perioder = []) => {
    return perioder.filter((periode) => {
        return periode.tom || periode.fom;
    }).length > 0;
};

export const validerDatoerIPerioder = (perioder) => {
    return perioder.map((periode) => {
        const feil = {};
        if (!periode.fom) {
            feil.fom = 'Vennligst fyll ut dato';
        }
        if (!periode.tom) {
            feil.tom = 'Vennligst fyll ut dato';
        }
        if (feil.tom || feil.fom) {
            return feil;
        }
        const fom = fraInputdatoTilJSDato(periode.fom);
        const tom = fraInputdatoTilJSDato(periode.tom);
        if (fom.getTime() > tom.getTime()) {
            feil.fom = 'Startdato må være før sluttdato';
            feil.tom = 'Sluttdato må være etter startdato';
            return feil;
        }
        return undefined;
    });
};

export const validerPerioder = (perioder) => {
    if (!harMinstEnPeriode(perioder)) {
        return {
            _error: 'Vennligst oppgi minst én periode',
        };
    }
    const datofeil = validerDatoerIPerioder(perioder);
    const faktiskeDatofeil = datofeil.filter((feil) => {
        return feil !== undefined;
    });
    if (faktiskeDatofeil.length > 0) {
        return datofeil;
    }
    return null;
};
