import React, { PropTypes } from 'react';
import setup from '../setup';
import FravaerOgFriskmelding from './FravaerOgFriskmelding';
import AktiviteterISykmeldingsperioden from './AktiviteterISykmeldingsperioden';
import { Utvidbar } from 'digisyfo-npm';
import CheckboxSelvstendig from '../../skjema/CheckboxSelvstendig';
import { Field } from 'redux-form';
import { Avkrysset } from './opplysninger';
import SykepengerSkjema from '../SykepengerSkjema';
import { Link } from 'react-router';
import Knapperad from '../../skjema/Knapperad';
import mapSkjemasoknadToBackendsoknad from '../mapSkjemasoknadToBackendsoknad';
import { Varselstripe } from 'digisyfo-npm';
import * as foerDuBegynner from '../FoerDuBegynner/FoerDuBegynner';
import * as aktiviteterISykmeldingsperioden from '../AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import * as fravaerOgFriskmelding from '../FravaerOgFriskmelding/FravaerOgFriskmelding';

export const Oppsummering = ({ sykepengesoknad, ledetekster }) => {
    return (<div>
        <div className="oppsummering__bolk">
            <Avkrysset tekst="Jeg er klar over at dersom jeg gir uriktige opplysninger eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar." />
        </div>
        <FravaerOgFriskmelding sykepengesoknad={sykepengesoknad} />
        <AktiviteterISykmeldingsperioden sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
    </div>);
};

Oppsummering.propTypes = {
    sykepengesoknad: PropTypes.object,
};

const SendingFeilet = () => {
    return (<div className="panel panel-komprimert">
        <Varselstripe type="feil">
            <p>Beklager, det oppstod en feil! Prøv igjen litt senere.</p>
        </Varselstripe>
    </div>)
}

export const OppsummeringWrap = (props) => {
    const { skjemasoknad, sykepengesoknad, handleSubmit, ledetekster, actions, sender, sendingFeilet } = props;
    const label = 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte';
    const onSubmit = (values) => {
        const soknad = mapSkjemasoknadToBackendsoknad(values);
        const soknadObjekt = JSON.parse(JSON.stringify(soknad)); // Hack for å sikre riktig datoformat
        actions.sendSykepengesoknad(soknadObjekt);
    };
    const backendSoknad = mapSkjemasoknadToBackendsoknad(skjemasoknad);

    console.log(JSON.stringify(backendSoknad))

    return (<SykepengerSkjema aktivtSteg="3" sykepengesoknad={sykepengesoknad} ledetekster={ledetekster}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="blokk">
                <Utvidbar tittel="Oppsummering" Overskrift="h2">
                    <Oppsummering sykepengesoknad={backendSoknad} ledetekster={ledetekster} />
                </Utvidbar>
            </div>
            <div className="panel blokk">
                <p>Vær klar over at</p>
                <ul>
                    <li>rett til sykepenger forutsetter at du er borte fra arbeid på grunn av egen sykdom. Sosiale eller økonomiske problemer gir ikke rett til sykepenger</li>
                    <li>du kan miste retten til sykepenger hvis du uten rimelig grunn nekter å opplyse om egen funksjonsevne eller nekter å ta imot tilbud om behandling og/eller tilrettelegging</li>
                    <li>fristen for å søke sykepenger er som hovedregel 3 måneder</li>
                </ul>
            </div>
            <Field component={CheckboxSelvstendig} name="bekreftetKorrektInformasjon" id="bekreftetKorrektInformasjon" label={label} />
            {
                sendingFeilet && <SendingFeilet />
            }
            <Knapperad variant="knapperad--forrigeNeste">
                <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/aktiviteter-i-sykmeldingsperioden`} className="rammeknapp rammeknapp--forrige">Tilbake</Link>
                <button className="knapp">Send søknad{sender ? ' ' : null}{ sender ? <span className="knapp__spinner" /> : null}</button>
            </Knapperad>
        </form>
    </SykepengerSkjema>);
};

OppsummeringWrap.propTypes = {
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

const OppsummeringSkjema = setup(validate, OppsummeringWrap);

export default OppsummeringSkjema;
