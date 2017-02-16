import validerFoerDuBegynner from './validerFoerDuBegynner';
import * as valideringUtils from './valideringUtils';
import { toDatePrettyPrint } from 'digisyfo-npm';

export const validate = (values, props) => {
    const feilmeldinger = {};

    if (Object.keys(validerFoerDuBegynner(values)).length !== 0) {
        props.sendTilFoerDuBegynner(props.sykepengesoknad);
    }

    if (values.bruktEgenmeldingsdagerFoerLegemeldtFravaer === undefined) {
        feilmeldinger.bruktEgenmeldingsdagerFoerLegemeldtFravaer = 'Du må svare om du brukte egenmeldingsdager før det legemeldte fraværet startet';
    }
    if (values.harGjenopptattArbeidFulltUt === undefined) {
        feilmeldinger.harGjenopptattArbeidFulltUt = 'Vennligst oppgi om du har gjenopptatt arbeidet fullt ut';
    } else if (values.harGjenopptattArbeidFulltUt) {
        if (!values.gjenopptattArbeidFulltUtDato) {
            feilmeldinger.gjenopptattArbeidFulltUtDato = 'Vennligst oppgi når du gjenopptok arbeidet fullt ut';
        } else if (!valideringUtils.erIFortiden(values.gjenopptattArbeidFulltUtDato)) {
            feilmeldinger.gjenopptattArbeidFulltUtDato = 'Datoen må være bakover i tid';
        } else if (!valideringUtils.datoErFoersteSykmeldingsdagEllerSenere(values.gjenopptattArbeidFulltUtDato, props.sykepengesoknad)) {
            feilmeldinger.gjenopptattArbeidFulltUtDato = `Datoen kan ikke være før du ble sykmeldt ${toDatePrettyPrint(props.sykepengesoknad.identdato)}`;
        }
    }

    if (values.bruktEgenmeldingsdagerFoerLegemeldtFravaer) {
        const egenmeldingsperioderFeil = valideringUtils.validerPerioder(values.egenmeldingsperioder);
        if (egenmeldingsperioderFeil) {
            feilmeldinger.egenmeldingsperioder = egenmeldingsperioderFeil;
        }
    }

    if (values.harHattFeriePermisjonEllerUtenlandsopphold === undefined) {
        feilmeldinger.harHattFeriePermisjonEllerUtenlandsopphold = 'Vennligst svar på om du har hatt ferie, permisjon eller utenlandsopphold';
    } else if (values.harHattFeriePermisjonEllerUtenlandsopphold) {
        if (([values.harHattFerie, values.harHattPermisjon, values.harHattUtenlandsopphold]).filter((a) => {
            return a;
        }).length === 0) {
            feilmeldinger.feriePermisjonEllerUtenlandsopphold = {
                _error: 'Vennligst kryss av ett av alternativene',
            };
        }

        if (values.harHattFerie) {
            const feriefeilmeldinger = valideringUtils.validerPerioder(values.ferie);
            if (feriefeilmeldinger) {
                feilmeldinger.ferie = feriefeilmeldinger;
            }
        }

        if (values.harHattUtenlandsopphold) {
            const utenlandsoppholdPeriodefeilmeldinger = valideringUtils.validerPerioder(values.utenlandsopphold.perioder);
            const utenlandsoppholdfeilmeldinger = {};
            if (utenlandsoppholdPeriodefeilmeldinger) {
                utenlandsoppholdfeilmeldinger.perioder = utenlandsoppholdPeriodefeilmeldinger;
            }

            if (values.utenlandsopphold.soektOmSykepengerIPerioden === undefined || values.utenlandsopphold.soektOmSykepengerIPerioden === null) {
                utenlandsoppholdfeilmeldinger.soektOmSykepengerIPerioden = 'Vennligst oppgi om du har søkt på sykepenger under oppholdet utenfor Norge';
            }

            if (Object.keys(utenlandsoppholdfeilmeldinger).length > 0) {
                feilmeldinger.utenlandsopphold = utenlandsoppholdfeilmeldinger;
            }
        }

        if (values.harHattPermisjon) {
            const permisjonfeilmeldinger = valideringUtils.validerPerioder(values.permisjon);
            if (permisjonfeilmeldinger) {
                feilmeldinger.permisjon = permisjonfeilmeldinger;
            }
        }
    }
    return feilmeldinger;
};

export default validate;
