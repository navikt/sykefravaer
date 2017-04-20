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

export const SendingFeilet = () => {
    return (<div className="panel panel--komprimert">
        <Varselstripe type="feil">
            <p className="sist">Beklager, det oppstod en feil! Prøv igjen litt senere.</p>
        </Varselstripe>
    </div>);
};

export const OppsummeringSide = (props) => {
    const { skjemasoknad, sykepengesoknad, handleSubmit, ledetekster, actions, sender, sendingFeilet } = props;
    const label = getLedetekst('sykepengesoknad.oppsummering.bekreft-korrekt-informasjon.label', ledetekster);
    const onSubmit = (values) => {
        const soknad = mapSkjemasoknadToBackendsoknad(values);
        const soknadObjekt = JSON.parse(JSON.stringify(soknad)); // Hack for å sikre riktig datoformat
        actions.sendSykepengesoknad(soknadObjekt);
    };
    const backendSoknad = mapSkjemasoknadToBackendsoknad(skjemasoknad);

    return (<SykepengerSkjema aktivtSteg="3" sykepengesoknad={sykepengesoknad} ledetekster={ledetekster}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Soknad apentUtdrag={false} sykepengesoknad={backendSoknad} ledetekster={ledetekster} tittel={'Oppsummering'} />
            <div className={sendingFeilet ? 'bekreftet-container blokk' : 'bekreftet-container'}>
                <Field component={CheckboxSelvstendig} name="bekreftetKorrektInformasjon" id="bekreftetKorrektInformasjon" label={label} />
            </div>
            {
                sendingFeilet && <SendingFeilet />
            }
            <Knapperad variant="knapperad--forrigeNeste">
                <Link
                    to={`/sykefravaer/soknader/${sykepengesoknad.id}/aktiviteter-i-sykmeldingsperioden`}
                    className="rammeknapp rammeknapp--forrige">{getLedetekst('sykepengesoknad.tilbake', ledetekster)}
                </Link>
                <button
                    className="knapp"
                    type="submit"
                    disabled={sender}>{getLedetekst('sykepengesoknad.send', ledetekster)}{sender ? ' ' : null}{ sender ? <span className="knapp__spinner" /> : null}
                </button>
            </Knapperad>
        </form>
    </SykepengerSkjema>);
};

OppsummeringSide.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    handleSubmit: PropTypes.func,
    skjemasoknad: PropTypes.object,
    ledetekster: PropTypes.object,
    actions: PropTypes.object,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
};

const OppsummeringSkjema = setup(validate, OppsummeringSide);

export default OppsummeringSkjema;
