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

export const UtdanningStartDato = ({ ledetekster, senesteTom }) => {
    return (<div className="blokk">
        <label className="skjema__sporsmal" htmlFor="utdanningStartdato">{getLedetekst('sykepengesoknad.utdanning.startdato.sporsmal', ledetekster)}</label>
        <Datovelger name="utdanning.utdanningStartdato" id="utdanningStartdato" senesteTom={senesteTom} />
    </div>);
};

UtdanningStartDato.propTypes = {
    ledetekster: PropTypes.object,
    senesteTom: PropTypes.instanceOf(Date),
};

export const AktiviteterISykmeldingsperioden = (props) => {
    const { handleSubmit, sykepengesoknad, ledetekster, autofill, untouch } = props;
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const _tidligsteFom = periodeUtils.tidligsteFom(perioder);
    const _senesteTom = periodeUtils.senesteTom(perioder);

    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/oppsummering`);
    };

    return (
        <SykepengerSkjema
            aktivtSteg="2"
            tittel={getLedetekst('sykepengesoknad.aktiviteter-i-sykmeldingsperioden.tittel', ledetekster)}
            ledetekster={ledetekster}
            sykepengesoknad={sykepengesoknad}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldArray
                    component={Aktiviteter}
                    fields={sykepengesoknad.aktiviteter}
                    autofill={autofill}
                    untouch={untouch}
                    name="aktiviteter"
                    ledetekster={ledetekster}
                    arbeidsgiver={sykepengesoknad.arbeidsgiver.navn} />

                <JaEllerNei
                    name="harAndreInntektskilder"
                    spoersmal={getLedetekst('sykepengesoknad.andre-inntektskilder.janei.sporsmal', ledetekster, {
                        '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
                    })}>
                    <AndreInntektskilder ledetekster={ledetekster} />
                </JaEllerNei>

                <JaEllerNei
                    name="utdanning.underUtdanningISykmeldingsperioden"
                    spoersmal={getLedetekst('sykepengesoknad.utdanning.ja-nei.sporsmal', ledetekster, {
                        '%STARTDATO%': toDatePrettyPrint(_tidligsteFom),
                        '%SLUTTDATO%': toDatePrettyPrint(_senesteTom),
                    })}>
                    <UtdanningStartDato ledetekster={ledetekster} senesteTom={_senesteTom} />
                    <Field
                        component={JaEllerNeiRadioknapper}
                        name="utdanning.erUtdanningFulltidsstudium"
                        parse={parseJaEllerNei}
                        spoersmal={getLedetekst('sykepengesoknad.utdanning.fulltidsstudium.sporsmal', ledetekster)}
                        Overskrift="h4" />
                </JaEllerNei>

                <Knapperad variant="knapperad--forrigeNeste">
                    <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/fravaer-og-friskmelding`} className="rammeknapp">Tilbake</Link>
                    <button type="submit" className="knapp">Gå videre</button>
                </Knapperad>
            </form>
        </SykepengerSkjema>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    handleSubmit: PropTypes.func,
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
    autofill: PropTypes.func,
    untouch: PropTypes.func,
};

const AktiviteterISykmeldingsperiodenSkjema = setup(validate, AktiviteterISykmeldingsperioden);

export default AktiviteterISykmeldingsperiodenSkjema;
