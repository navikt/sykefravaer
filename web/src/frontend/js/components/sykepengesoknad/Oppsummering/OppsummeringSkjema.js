import React, { PropTypes } from 'react';
import setup from '../setup';
import SykepengerSkjema from '../SykepengerSkjema';
import { Link } from 'react-router';
import Knapperad from '../../skjema/Knapperad';
import mapSkjemasoknadToBackendsoknad from '../mapSkjemasoknadToBackendsoknad';
import { Varselstripe } from 'digisyfo-npm';
import * as foerDuBegynner from '../FoerDuBegynner/FoerDuBegynner';
import * as aktiviteterISykmeldingsperioden from '../AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import * as fravaerOgFriskmelding from '../FravaerOgFriskmelding/FravaerOgFriskmelding';
import { Soknad } from '../Soknad';

const SendingFeilet = () => {
    return (<div className="panel panel-komprimert">
        <Varselstripe type="feil">
            <p className="sist">Beklager, det oppstod en feil! Prøv igjen litt senere.</p>
        </Varselstripe>
    </div>);
};

export const OppsummeringSide = (props) => {
    const { skjemasoknad, sykepengesoknad, handleSubmit, ledetekster, actions, sender, sendingFeilet } = props;
    const onSubmit = (values) => {
        const soknad = mapSkjemasoknadToBackendsoknad(values);
        const soknadObjekt = JSON.parse(JSON.stringify(soknad)); // Hack for å sikre riktig datoformat
        actions.sendSykepengesoknad(soknadObjekt);
    };
    const backendSoknad = mapSkjemasoknadToBackendsoknad(skjemasoknad);

    return (<SykepengerSkjema aktivtSteg="3" sykepengesoknad={sykepengesoknad} ledetekster={ledetekster}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Soknad sykepengesoknad={backendSoknad} ledetekster={ledetekster} />
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

export const validate = (values, props) => {
    const foerDuBegynnerFeil = foerDuBegynner.validate(values, props);
    const fravaerOgFriskmeldingFeil = fravaerOgFriskmelding.validate(values, props);
    const aktiviteterISykmeldingsperiodenFeil = aktiviteterISykmeldingsperioden.validate(values, props);
    const feilmeldinger = Object.assign({}, foerDuBegynnerFeil, fravaerOgFriskmeldingFeil, aktiviteterISykmeldingsperiodenFeil);

    if (Object.keys(feilmeldinger).length > 0) {
        console.error('Feilmeldinger \n', feilmeldinger);
        props.sendTilFoerDuBegynner(props.sykepengesoknad);
    }

    if (!values.bekreftetKorrektInformasjon) {
        feilmeldinger.bekreftetKorrektInformasjon = 'Du må bekrefte at du har lest informasjonen og bekreftet at opplysningene du har gitt er korrekte';
    }
    return feilmeldinger;
};

const OppsummeringSkjema = setup(validate, OppsummeringSide);

export default OppsummeringSkjema;
