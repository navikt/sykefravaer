import React, { PropTypes } from 'react';
import SykepengerSkjema from '../SykepengerSkjema';
import { Field, FieldArray } from 'redux-form';
import history from '../../../history';
import setup from '../setup';
import JaEllerNei, { JaEllerNeiRadioknapper, parseJaEllerNei } from '../JaEllerNei';
import Datovelger from '../../skjema/Datovelger';
import Aktiviteter from './Aktiviteter';
import AndreInntektskilder from './AndreInntektskilder';
import { Link } from 'react-router';
import Knapperad from '../../skjema/Knapperad';
import { toDatePrettyPrint, getLedetekst } from 'digisyfo-npm';
import * as periodeUtils from '../../../utils/periodeUtils';
import validate from '../validering/validerAktiviteterISykmeldingsperioden';
import connectGjenopptattArbeidFulltUtDato from '../../../utils/connectGjenopptattArbeidFulltUtDato';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';

export const UtdanningStartDato = ({ senesteTom }) => {
    return (<div className="blokk">
        <label className="skjema__sporsmal" htmlFor="utdanning.utdanningStartdato">{getLedetekst('sykepengesoknad.utdanning.startdato.sporsmal')}</label>
        <Datovelger name="utdanning.utdanningStartdato" id="utdanning.utdanningStartdato" senesteTom={senesteTom} />
    </div>);
};

UtdanningStartDato.propTypes = {
    senesteTom: PropTypes.instanceOf(Date),
};

export const AktiviteterISykmeldingsperiodenSkjema = (props) => {
    const { handleSubmit, sykepengesoknad, autofill, untouch, gjenopptattArbeidFulltUtDato } = props;
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const _tidligsteFom = periodeUtils.tidligsteFom(perioder);
    let _senesteTom = periodeUtils.senesteTom(perioder);

    if (gjenopptattArbeidFulltUtDato) {
        _senesteTom = new Date(gjenopptattArbeidFulltUtDato - (1000 * 60 * 60 * 24));
    }

    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/oppsummering`);
    };

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <FieldArray
            gjenopptattArbeidFulltUtDato={gjenopptattArbeidFulltUtDato}
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
            spoersmal={getLedetekst('sykepengesoknad.utdanning.ja-nei.sporsmal', {
                '%STARTDATO%': toDatePrettyPrint(_tidligsteFom),
                '%SLUTTDATO%': toDatePrettyPrint(_senesteTom),
            })}>
            <UtdanningStartDato senesteTom={_senesteTom} />
            <Field
                component={JaEllerNeiRadioknapper}
                name="utdanning.erUtdanningFulltidsstudium"
                parse={parseJaEllerNei}
                spoersmal={getLedetekst('sykepengesoknad.utdanning.fulltidsstudium.sporsmal')}
                Overskrift="h4" />
        </JaEllerNei>

        <Knapperad variant="knapperad--forrigeNeste">
            <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/fravaer-og-friskmelding`} className="rammeknapp">Tilbake</Link>
            <button type="submit" className="knapp">Gå videre</button>
        </Knapperad>
    </form>);
};

AktiviteterISykmeldingsperiodenSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    sykepengesoknad: sykepengesoknadPt,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
    gjenopptattArbeidFulltUtDato: PropTypes.instanceOf(Date),
};

const AktiviteterISykmeldingsperiodenSkjemaConnected = connectGjenopptattArbeidFulltUtDato(AktiviteterISykmeldingsperiodenSkjema);

const AktiviteterISykmeldingsperiodenReduxSkjema = setup(validate, AktiviteterISykmeldingsperiodenSkjemaConnected);

export const AktiviteterISykmeldingsperioden = (props) => {
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
