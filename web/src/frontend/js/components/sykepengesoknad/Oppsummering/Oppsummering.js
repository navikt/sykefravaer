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
import { fraInputdatoTilJSDato } from '../../../utils';

const parsePerioder = (perioder) => {
    return perioder.map((periode) => {
        return {
            fom: fraInputdatoTilJSDato(periode.fom),
            tom: fraInputdatoTilJSDato(periode.tom),
        };
    });
};

const parseInntektskilder = (inntektskilder) => {
    if (Array.isArray(inntektskilder)) {
        return inntektskilder;
    }
    const a = [];
    for (const annenInntektskildeType in inntektskilder) {
        if (inntektskilder[annenInntektskildeType].avkrysset) {
            a.push({
                annenInntektskildeType,
                sykmeldt: inntektskilder[annenInntektskildeType].sykmeldt === true,
            });
        }
    }
    return a;
};

const getUtenlandsopphold = (utenlandsopphold) => {
    return {
        soektOmSykepengerIPerioden: utenlandsopphold.soektOmSykepengerIPerioden,
        perioder: parsePerioder(utenlandsopphold.perioder),
    };
};

const getUtdanning = (utdanning) => {
    if (utdanning.underUtdanningISykmeldingsperioden) {
        return {
            utdanningStartdato: fraInputdatoTilJSDato(utdanning.utdanningStartdato),
            erUtdanningFulltidsstudium: utdanning.erUtdanningFulltidsstudium,
        };
    }
    return null;
};

const getAktiviteter = (aktiviteter) => {
    return aktiviteter.map((aktivitet) => {
        const _aktivitet = aktivitet;
        if (!_aktivitet.jobbetMerEnnPlanlagt) {
            _aktivitet.avvik = null;
        } else {
            delete _aktivitet.avvik.enhet;
        }
        delete _aktivitet.jobbetMerEnnPlanlagt;
        return _aktivitet;
    });
};

const frontendProps = [
    'bruktEgenmeldingsdagerFoerLegemeldtFravaer',
    'harGjenopptattArbeidFulltUt',
    'harHattFeriePermisjonEllerUtenlandsopphold',
    'harHattFerie',
    'harHattPermisjon',
    'harHattUtenlandsopphold',
    'utenlandsoppholdSoktOmSykepenger',
    'harAndreInntektskilder',
];

export const mapSkjemasoknadToBackendsoknad = (soknad) => {
    const harHattPermisjon = soknad.harHattFeriePermisjonEllerUtenlandsopphold && soknad.harHattPermisjon;
    const harHattFerie = soknad.harHattFeriePermisjonEllerUtenlandsopphold && soknad.harHattFerie;
    const harHattUtenlandsopphold = soknad.harHattFeriePermisjonEllerUtenlandsopphold && soknad.harHattUtenlandsopphold;

    const permisjon = harHattPermisjon ? soknad.permisjon : [];
    const ferie = harHattFerie ? soknad.ferie : [];
    const utenlandsopphold = harHattUtenlandsopphold ? getUtenlandsopphold(soknad.utenlandsopphold) : null;

    const backendSoknad = Object.assign({}, soknad, {
        permisjon: parsePerioder(permisjon),
        ferie: parsePerioder(ferie),
        utenlandsopphold,
        andreInntektskilder: parseInntektskilder(soknad.andreInntektskilder),
        gjenopptattArbeidFulltUtDato: soknad.harGjenopptattArbeidFulltUt ? fraInputdatoTilJSDato(soknad.gjenopptattArbeidFulltUtDato) : null,
        egenmeldingsperioder: soknad.bruktEgenmeldingsdagerFoerLegemeldtFravaer ? parsePerioder(soknad.egenmeldingsperioder) : [],
        aktiviteter: getAktiviteter(soknad.aktiviteter),
        utdanning: getUtdanning(soknad.utdanning),
    });

    frontendProps.forEach((prop) => {
        delete backendSoknad[prop];
    });
    return backendSoknad;
};

const Oppsummering = ({ sykepengesoknad }) => {
    return (<div>
        <div className="oppsummering__bolk">
            <Avkrysset tekst="Jeg er klar over at dersom jeg gir uriktige opplysninger eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar." />
        </div>
        <FravaerOgFriskmelding sykepengesoknad={sykepengesoknad} />
        <AktiviteterISykmeldingsperioden sykepengesoknad={sykepengesoknad} />
    </div>);
};

Oppsummering.propTypes = {
    sykepengesoknad: PropTypes.object,
};

export const OppsummeringWrap = (props) => {
    const { skjemasoknad, sykepengesoknad, handleSubmit, ledetekster, sendSykepengesoknad } = props;
    const label = 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte';
    const onSubmit = (values) => {
        const soknad = mapSkjemasoknadToBackendsoknad(values);
        const soknadObjekt = JSON.parse(JSON.stringify(soknad));
        sendSykepengesoknad(soknadObjekt);
    };
    const backendSoknad = mapSkjemasoknadToBackendsoknad(skjemasoknad);
    console.log(JSON.stringify(skjemasoknad));

    return (<SykepengerSkjema aktivtSteg="3" sykepengesoknad={sykepengesoknad} ledetekster={ledetekster}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="blokk">
                <Utvidbar tittel="Oppsummering" Overskrift="h2">
                    <Oppsummering sykepengesoknad={backendSoknad} />
                </Utvidbar>
            </div>
            <div className="panel blokk">
                <p>Vær klar over at</p>
                <ul>
                    <li>rett til sykepenger forutsetter at du har inntektstap på grunn av egen sykdom. Sosiale eller økonomiske problemer gir ikke rett til sykepenger</li>
                    <li>sykepenger utbetales i maksimum 52 uker, også for gradert (delvis) sykmelding</li>
                    <li>du kan miste retten til sykepenger hvis du uten rimelig grunn nekter å opplyse om egen funksjonsevne eller nekter å ta imot tilbud om behandling og/eller tilrettelegging</li>
                </ul>
            </div>
            <Field component={CheckboxSelvstendig} name="bekreftetKorrektInformasjon" id="informasjonLestOgBekreftetKorrekt" label={label} />
            <Knapperad variant="knapperad--forrigeNeste">
                <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/aktiviteter-i-sykmeldingsperioden`} className="rammeknapp rammeknapp--forrige">Tilbake</Link>
                <button className="knapp">Send søknad</button>
            </Knapperad>
        </form>
    </SykepengerSkjema>);
};

OppsummeringWrap.propTypes = {
    sykepengesoknad: PropTypes.object,
    handleSubmit: PropTypes.func,
    skjemasoknad: PropTypes.object,
    ledetekster: PropTypes.object,
    sendSykepengesoknad: PropTypes.func,
};

const validate = (values) => {
    if (!values.informasjonLestOgBekreftetKorrekt) {
        return {
            informasjonLestOgBekreftetKorrekt: 'Du må bekrefte at du har lest informasjonen og bekreftet at opplysningene du har gitt er korrekte',
        };
    }
    return {};
};

const OppsummeringSkjema = setup(validate, OppsummeringWrap);

export default OppsummeringSkjema;
