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
import { toDatePrettyPrint } from 'digisyfo-npm';
import { tidligsteFom, senesteTom } from '../../../utils/periodeUtils';
import validate from '../validering/validerAktiviteterISykmeldingsperioden';

export const UtdanningStartDato = () => {
    return (<div className="blokk">
        <label className="skjema__sporsmal" htmlFor="utdanningStartdato">Når startet du på utdanningen?</label>
        <Datovelger name="utdanning.utdanningStartdato" id="utdanningStartdato" />
    </div>);
};

export const AktiviteterISykmeldingsperioden = (props) => {
    const { handleSubmit, sykepengesoknad, ledetekster, autofill, untouch } = props;
    const perioder = sykepengesoknad.aktiviteter.map((aktivitet) => {
        return aktivitet.periode;
    });
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/oppsummering`);
    };

    return (<SykepengerSkjema aktivtSteg="2" tittel="Aktiviteter i sykmeldingsperioden" ledetekster={ledetekster} sykepengesoknad={sykepengesoknad}>
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
                spoersmal={`Har du andre inntektskilder enn ${sykepengesoknad.arbeidsgiver.navn}?`}>
                <AndreInntektskilder />
            </JaEllerNei>

            <JaEllerNei
                name="utdanning.underUtdanningISykmeldingsperioden"
                spoersmal={`Har du vært under utdanning i løpet av perioden ${toDatePrettyPrint(tidligsteFom(perioder))} – ${toDatePrettyPrint(senesteTom(perioder))}?`}>
                <UtdanningStartDato />
                <Field
                    component={JaEllerNeiRadioknapper}
                    name="utdanning.erUtdanningFulltidsstudium"
                    parse={parseJaEllerNei}
                    spoersmal="Er utdanningen et fulltidsstudium?"
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
