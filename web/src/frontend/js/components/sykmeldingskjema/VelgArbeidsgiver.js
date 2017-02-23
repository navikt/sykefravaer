import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { getHtmlLedetekst, getLedetekst, visFeilmelding, getFeilmelding, Hjelpetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';
import ErLederRiktig from './ErLederRiktig';
import ForskuttererArbeidsgiver from './ForskuttererArbeidsgiver';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import Feilomrade from '../skjema/Feilomrade';
import Radioknapper from '../skjema/Radioknapper';

const ArbeidsgiverRadioknapper = (props) => {
    const { ledetekster, input, arbeidsgivere } = props;
    const hjelpetekst = (<Hjelpetekst
        id="velg-arbeidsgiver-hjelpetekst"
        tittel={getLedetekst('din-sykmelding.velg-arbeidsgiver.hjelpetekst.tittel', ledetekster)}
        tekst={getLedetekst('din-sykmelding.velg-arbeidsgiver.hjelpetekst.tekst', ledetekster)} />);

    return (<Radioknapper
        spoersmal={getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal', ledetekster)}
        name="valgtArbeidsgiver"
        hjelpetekst={hjelpetekst}
        {...props}>
        {
            arbeidsgivere.map((arbeidsgiver, index) => {
                const checked = (input.value && input.value.orgnummer === arbeidsgiver.orgnummer) === true;
                const labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                    `(${getLedetekst('send-til-arbeidsgiver.orgnr', ledetekster)}: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})`
                    : null;
                return <input checked={checked} key={index} label={arbeidsgiver.navn} value={arbeidsgiver.orgnummer} labelSekundaer={labelSekundaer} />
            })
        }
    </Radioknapper>)
}

const SkrivUt = (props) => {
    const { ledetekster, sykmelding } = props;
    return (<div className="ekstrasporsmal">
        <div className="hode hode-advarsel hode-brodtekst redaksjonelt-innhold side-innhold"
            dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.infotekst', ledetekster)} />
        <div className="knapperad">
            <p>
                <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}/skriv-ut`} className="rammeknapp">
                    {getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.skriv-ut', ledetekster)}
                </Link>
            </p>
        </div>
    </div>);
}

const Tillegg = (props) => {
    const { input, skjema, ledetekster, pilotSykepenger, skjemaData } = props;
    const { value } = input;
    return (<div>
        {
            value && value.orgnummer === '0' ? <SkrivUt {...props} /> : null
        }
        {
            value && value.naermesteLeder ?
                <ErLederRiktig naermesteLeder={value.naermesteLeder} skjemaData={skjemaData} ledetekster={ledetekster} /> : null
        }
        {
            pilotSykepenger && value && value.orgnummer !== '0' ?
                <ForskuttererArbeidsgiver arbeidsgiver={value} skjemaData={skjemaData} ledetekster={ledetekster} /> : null
        }
    </div>);
}

const rendreVelgArbeidsgiver = (props) => {
    const { ledetekster, sykmelding, input, skjemaData, pilotSykepenger } = props;
    const value = input.value;
    const Sporsmal = (<ArbeidsgiverRadioknapper {...props} />);

    const visTillegg = (_props) => {
        const { input, children } = _props;
        const { value } = input;
        return (value && value.orgnummer === '0') || (value && pilotSykepenger && value.orgnummer !== '0') || (value && value.naermesteLeder);
    }

    return (<div className="hovedsporsmal">
        <SporsmalMedTillegg {...props} Sporsmal={Sporsmal} visTillegg={visTillegg}>
            <Tillegg {...props} />
        </SporsmalMedTillegg>
    </div>);
}

const VelgArbeidsgiver = (props) => {
    const { arbeidsgivere, ledetekster, sykmelding, skjemaData, pilotSykepenger } = props;

    return (<Field
        spoersmal={getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal', ledetekster)}
        name="valgtArbeidsgiver"
        arbeidsgivere={arbeidsgivere}
        ledetekster={ledetekster}
        parse={(orgnummer) => {
            return arbeidsgivere.filter((arbgiver) => {
                return arbgiver.orgnummer === orgnummer;
            })[0];
        }}
        sykmelding={sykmelding}
        component={rendreVelgArbeidsgiver} 
        pilotSykepenger={pilotSykepenger}
        skjemaData={skjemaData} />);

};

VelgArbeidsgiver.propTypes = {
    arbeidsgivere: PropTypes.array,
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
    skjemaData: PropTypes.object,
    pilotSykepenger: PropTypes.bool,
};

export default VelgArbeidsgiver;
