import React, { PropTypes } from 'react';
import setup from '../setup';
import SykepengerSkjema from '../SykepengerSkjema';
import { Link } from 'react-router';
import Knapperad from '../../skjema/Knapperad';
import mapSkjemasoknadToBackendsoknad from '../mapSkjemasoknadToBackendsoknad';
import { Soknad, Varselstripe, getLedetekst } from 'digisyfo-npm';
import CheckboxSelvstendig from '../../skjema/CheckboxSelvstendig';
import { Field } from 'redux-form';
import validate from '../validering/validerOppsummering';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import ForskuttererArbeidsgiver from './ForskuttererArbeidsgiver';

export const SendingFeilet = () => {
    return (<div className="panel panel--komprimert">
        <Varselstripe type="feil">
            <p className="sist">Beklager, det oppstod en feil! Prøv igjen litt senere.</p>
        </Varselstripe>
    </div>);
};

export const OppsummeringForm = (props) => {
    const { sykepengesoknad, backendsoknad, handleSubmit, actions, sender, sendingFeilet, visForskutteringssporsmal } = props;
    const label = getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label');
    const onSubmit = (values) => {
        const soknad = mapSkjemasoknadToBackendsoknad(values, {
            visForskutteringssporsmal: visForskutteringssporsmal === true,
        });
        const soknadObjekt = JSON.parse(JSON.stringify(soknad)); // Hack for å sikre riktig datoformat
        actions.sendSykepengesoknad(soknadObjekt);
    };
    return (<form onSubmit={handleSubmit(onSubmit)}>
        <Soknad apentUtdrag={false} sykepengesoknad={backendsoknad} tittel="Oppsummering" />
        <div className={sendingFeilet || visForskutteringssporsmal ? 'bekreftet-container blokk' : 'bekreftet-container'}>
            <Field component={CheckboxSelvstendig} name="bekreftetKorrektInformasjon" id="bekreftetKorrektInformasjon" label={label} />
        </div>
        { visForskutteringssporsmal && <ForskuttererArbeidsgiver /> }
        { sendingFeilet && <SendingFeilet /> }
        <Knapperad variant="knapperad--forrigeNeste">
            <Link
                to={`/sykefravaer/soknader/${sykepengesoknad.id}/aktiviteter-i-sykmeldingsperioden`}
                className="rammeknapp rammeknapp--forrige">{getLedetekst('sykepengesoknad.tilbake')}
            </Link>
            <button
                className="knapp"
                type="submit"
                disabled={sender}>{getLedetekst('sykepengesoknad.send')}{sender ? ' ' : null}{ sender ? <span className="knapp__spinner" /> : null}
            </button>
        </Knapperad>
    </form>);
};

OppsummeringForm.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    handleSubmit: PropTypes.func,
    backendsoknad: sykepengesoknadPt,
    actions: PropTypes.object,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
    visForskutteringssporsmal: PropTypes.bool,
};

export const OppsummeringSkjema = setup(validate, OppsummeringForm);

const OppsummeringSide = (props) => {
    const { sykepengesoknad } = props;
    return (<SykepengerSkjema aktivtSteg="3" sykepengesoknad={sykepengesoknad}>
        <OppsummeringSkjema {...props} />
    </SykepengerSkjema>);
};

OppsummeringSide.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default OppsummeringSide;
