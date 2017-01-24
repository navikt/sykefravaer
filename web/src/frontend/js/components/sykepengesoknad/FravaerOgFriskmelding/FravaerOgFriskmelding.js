import React, { PropTypes } from 'react';
import SykepengerSkjema from '../SykepengerSkjema';
import { Link } from 'react-router';
import history from '../../../history';
import setup from '../setup';
import Egenmeldingsdager from './Egenmeldingsdager';
import GjenopptattArbeidFulltUt from './GjenopptattArbeidFulltUt';
import FeriePermisjonEllerUtenlandsopphold from './FeriePermisjonEllerUtenlandsopphold';
import * as valideringUtils from '../../../utils/sykepengerValideringUtils';
import Knapperad from '../../skjema/Knapperad';

const FravaerOgFriskmelding = ({ handleSubmit }) => {
    const onSubmit = () => {
        history.push('/sykepenger/aktiviteter-i-sykmeldingsperioden');
    };

    return (<SykepengerSkjema aktivtSteg="1" tittel="Fravær og friskmelding">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Egenmeldingsdager />
            <GjenopptattArbeidFulltUt />
            <FeriePermisjonEllerUtenlandsopphold />

            <Knapperad variant="knapperad--forrigeNeste">
                <Link to="/sykepenger" className="rammeknapp">Tilbake</Link>
                <button type="submit" className="knapp">
                    Gå videre
                </button>
            </Knapperad>
        </form>
    </SykepengerSkjema>);
};

FravaerOgFriskmelding.propTypes = {
    handleSubmit: PropTypes.func,
};

export const validate = (values, props) => {
    const feilmeldinger = {};

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
        } else if (!valideringUtils.datoErEtterFøersteSykmeldingsdag(values.gjenopptattArbeidFulltUtDato, props.sykmelding)) {
            feilmeldinger.gjenopptattArbeidFulltUtDato = 'Datoen må være etter at du ble sykmeldt';
        }
    }

    if (values.bruktEgenmeldingsdagerFoerLegemeldtFravaer) {
        feilmeldinger.egenmeldingsperioder = valideringUtils.validerPerioder(values.egenmeldingsperioder);
    }

    if (values.harHattFeriePermisjonEllerUtenlandsopphold === undefined) {
        feilmeldinger.harHattFeriePermisjonEllerUtenlandsopphold = 'Vennligst svar på om du har hatt ferie, permisjon eller utenlandsopphold';
    } else if (values.harHattFeriePermisjonEllerUtenlandsopphold) {
        if ((!values.ferie && !values.utenlandsopphold && !values.permisjon) || [values.ferie, values.permisjon, values.utenlandsopphold].filter((a) => {
            return a ? a.avkrysset : false;
        }).length === 0) {
            feilmeldinger.feriePermisjonEllerUtenlandsopphold = {
                _error: 'Vennligst kryss av ett av alternativene',
            };
        }

        if (values.ferie && values.ferie.avkrysset) {
            feilmeldinger.ferie = {
                perioder: valideringUtils.validerPerioder(values.ferie.perioder),
            };
        }

        if (values.utenlandsopphold && values.utenlandsopphold.avkrysset) {
            feilmeldinger.utenlandsopphold = {
                perioder: valideringUtils.validerPerioder(values.utenlandsopphold.perioder),
            };
        }

        if (values.permisjon && values.permisjon.avkrysset) {
            feilmeldinger.permisjon = {
                perioder: valideringUtils.validerPerioder(values.permisjon.perioder),
            };
        }

        if (values.utenlandsoppholdSoktOmSykepenger === undefined) {
            feilmeldinger.utenlandsoppholdSoktOmSykepenger = 'Vennligst oppgi om du har søkt på sykepenger under oppholdet utenfor Norge';
        }
    }
    return feilmeldinger;
};

const FravaerOgFriskmeldingSkjema = setup(validate, FravaerOgFriskmelding);

export default FravaerOgFriskmeldingSkjema;
