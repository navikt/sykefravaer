import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Field, FieldArray } from 'redux-form';
import { toDatePrettyPrint, getLedetekst, getTomDato, tidligsteFom } from 'digisyfo-npm';
import SykepengerSkjema from '../SykepengerSkjema';
import history from '../../../history';
import setup from '../setup';
import JaEllerNei, { JaEllerNeiRadioknapper, parseJaEllerNei } from '../JaEllerNei';
import Datovelger from '../../skjema/Datovelger';
import Aktiviteter from './Aktiviteter';
import AndreInntektskilder from './AndreInntektskilder';
import Knapperad from '../../skjema/Knapperad';
import validate from '../validering/validerAktiviteterISykmeldingsperioden';
import connectGjenopptattArbeidFulltUtDato from '../../../utils/connectGjenopptattArbeidFulltUtDato';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import AvbrytSoknadContainer from '../../../containers/sykepengesoknad/AvbrytSoknadContainer';

export const UtdanningStartDato = ({ senesteTom }) => {
    return (<div className="blokk">
        <label className="skjema__sporsmal" htmlFor="utdanning.utdanningStartdato">{getLedetekst('sykepengesoknad.utdanning.startdato.sporsmal')}</label>
        <Datovelger name="utdanning.utdanningStartdato" id="utdanning.utdanningStartdato" senesteTom={senesteTom} />
    </div>);
};

UtdanningStartDato.propTypes = {
    senesteTom: PropTypes.instanceOf(Date),
};

export const getUtdanningssporsmal = (sykepengesoknad, gjenopptattArbeidFulltUtDato, callback = getLedetekst) => {
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const _tidligsteFom = tidligsteFom(perioder);
    const _soknad = {
        ...sykepengesoknad,
        gjenopptattArbeidFulltUtDato,
    };
    const _senesteTom = getTomDato(_soknad);

    return callback('sykepengesoknad.utdanning.ja-nei.sporsmal', {
        '%STARTDATO%': toDatePrettyPrint(_tidligsteFom),
        '%SLUTTDATO%': toDatePrettyPrint(_senesteTom),
    });
};

export class AktiviteterISykmeldingsperiodenSkjema extends Component {
    componentDidMount() {
        if (this.form) {
            this.form.focus();
        }
    }

    render() {
        const { handleSubmit, sykepengesoknad, autofill, untouch, gjenopptattArbeidFulltUtDato } = this.props;
        const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
            return aktivitet.periode;
        });
        const _tidligsteFom = tidligsteFom(perioder);
        const _soknad = {
            ...sykepengesoknad,
            gjenopptattArbeidFulltUtDato,
        };
        const _senesteTom = getTomDato(_soknad);

        const onSubmit = () => {
            history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/oppsummering`);
        };

        return (<form
            className="sykepengerskjema"
            ref={(c) => {
                this.form = c;
            }}
            tabIndex="-1"
            id="aktiviteter-i-sykmeldingsperioden-skjema"
            onSubmit={handleSubmit(onSubmit)}>
            <FieldArray
                component={Aktiviteter}
                fields={sykepengesoknad.aktiviteter}
                autofill={autofill}
                untouch={untouch}
                name="aktiviteter"
                arbeidsgiver={sykepengesoknad.arbeidsgiver.navn} />

            <JaEllerNei
                name="harAndreInntektskilder"
                spoersmal={getLedetekst('sykepengesoknad.andre-inntektskilder.janei.sporsmal', {
                    '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
                })}>
                <AndreInntektskilder />
            </JaEllerNei>

            <JaEllerNei
                name="utdanning.underUtdanningISykmeldingsperioden"
                spoersmal={getUtdanningssporsmal(sykepengesoknad, gjenopptattArbeidFulltUtDato)}>
                <UtdanningStartDato senesteTom={_senesteTom} />
                <Field
                    component={JaEllerNeiRadioknapper}
                    name="utdanning.erUtdanningFulltidsstudium"
                    parse={parseJaEllerNei}
                    spoersmal={getLedetekst('sykepengesoknad.utdanning.fulltidsstudium.sporsmal')}
                    Overskrift="h4" />
            </JaEllerNei>

            <Knapperad variant="knapperad--forrigeNeste knapperad--medAvbryt">
                <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/fravaer-og-friskmelding`} className="rammeknapp">Tilbake</Link>
                <button type="submit" className="knapp js-ga-videre">Gå videre</button>
            </Knapperad>
            <AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />
        </form>);
    }
}

AktiviteterISykmeldingsperiodenSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    sykepengesoknad: sykepengesoknadPt,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
};

const AktiviteterISykmeldingsperiodenSkjemaConnected = connectGjenopptattArbeidFulltUtDato(AktiviteterISykmeldingsperiodenSkjema);

const AktiviteterISykmeldingsperiodenReduxSkjema = setup(validate, AktiviteterISykmeldingsperiodenSkjemaConnected);

const AktiviteterISykmeldingsperioden = (props) => {
    const { sykepengesoknad } = props;

    return (
        <SykepengerSkjema
            aktivtSteg="2"
            tittel={getLedetekst('sykepengesoknad.aktiviteter-i-sykmeldingsperioden.tittel')}
            sykepengesoknad={sykepengesoknad}>
            <AktiviteterISykmeldingsperiodenReduxSkjema sykepengesoknad={sykepengesoknad} />
        </SykepengerSkjema>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default AktiviteterISykmeldingsperioden;
