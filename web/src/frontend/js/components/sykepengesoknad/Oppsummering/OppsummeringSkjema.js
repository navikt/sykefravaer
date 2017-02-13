import React, { PropTypes } from 'react';
import setup from '../setup';
import SykepengerSkjema from '../SykepengerSkjema';
import { Link } from 'react-router';
import Knapperad from '../../skjema/Knapperad';
import mapSkjemasoknadToBackendsoknad from '../mapSkjemasoknadToBackendsoknad';
import { Varselstripe } from 'digisyfo-npm';
import Soknad from '../Soknad';
import CheckboxSelvstendig from '../../skjema/CheckboxSelvstendig';
import { Field } from 'redux-form';
import validate from '../validering/validerOppsummering';

export const SendingFeilet = () => {
    return (<div className="panel panel-komprimert">
        <Varselstripe type="feil">
            <p className="sist">Beklager, det oppstod en feil! Prøv igjen litt senere.</p>
        </Varselstripe>
    </div>);
};

export const OppsummeringSide = (props) => {
    const { skjemasoknad, sykepengesoknad, handleSubmit, ledetekster, actions, sender, sendingFeilet } = props;
    const label = 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte';
    const onSubmit = (values) => {
        const soknad = mapSkjemasoknadToBackendsoknad(values);
        const soknadObjekt = JSON.parse(JSON.stringify(soknad)); // Hack for å sikre riktig datoformat
        actions.sendSykepengesoknad(soknadObjekt);
    };
    const backendSoknad = mapSkjemasoknadToBackendsoknad(skjemasoknad);

    return (<SykepengerSkjema aktivtSteg="3" sykepengesoknad={sykepengesoknad} ledetekster={ledetekster}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Soknad sykepengesoknad={backendSoknad} ledetekster={ledetekster} />
            <div className={sendingFeilet ? 'bekreftet-container blokk' : 'bekreftet-container'}>
                <Field component={CheckboxSelvstendig} name="bekreftetKorrektInformasjon" id="bekreftetKorrektInformasjon" label={label} />
            </div>
            {
                sendingFeilet && <SendingFeilet />
            }
            <Knapperad variant="knapperad--forrigeNeste">
                <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/aktiviteter-i-sykmeldingsperioden`} className="rammeknapp rammeknapp--forrige">Tilbake</Link>
                <button className="knapp" type="submit" disabled={sender}>Send søknad{sender ? ' ' : null}{ sender ? <span className="knapp__spinner" /> : null}</button>
            </Knapperad>
        </form>
    </SykepengerSkjema>);
};

OppsummeringSide.propTypes = {
    sykepengesoknad: PropTypes.object,
    handleSubmit: PropTypes.func,
    skjemasoknad: PropTypes.object,
    ledetekster: PropTypes.object,
    actions: PropTypes.object,
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
};

const OppsummeringSkjema = setup(validate, OppsummeringSide);

export default OppsummeringSkjema;
