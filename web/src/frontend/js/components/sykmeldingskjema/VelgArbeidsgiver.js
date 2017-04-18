import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';
import ErLederRiktig from './ErLederRiktig';
import ForskuttererArbeidsgiver from './ForskuttererArbeidsgiver';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import Radioknapper from '../skjema/Radioknapper';

export const ArbeidsgiverRadioknapper = (props) => {
    const { ledetekster, input, arbeidsgivere } = props;
    let intro = null;

    if (arbeidsgivere.length > 2) {
        intro = <p>{getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.flere-arbeidsgivere-infotekst', ledetekster)}</p>;
    }

    return (<Radioknapper
        spoersmal={getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal', ledetekster)}
        name="valgtArbeidsgiver"
        intro={intro}
        {...props}>
        {
            arbeidsgivere.map((arbeidsgiver, index) => {
                const checked = (input.value && input.value.orgnummer === arbeidsgiver.orgnummer) === true;
                const labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                    `(${getLedetekst('send-til-arbeidsgiver.orgnr', ledetekster)}: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})`
                    : null;
                return <input checked={checked} key={index} label={arbeidsgiver.navn} value={arbeidsgiver.orgnummer} labelSekundaer={labelSekundaer} />;
            })
        }
    </Radioknapper>);
};

ArbeidsgiverRadioknapper.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    arbeidsgivere: PropTypes.array.isRequired,
};

export const SkrivUt = (props) => {
    const { ledetekster, sykmelding } = props;
    return (<div className="ekstrasporsmal ekstrasporsmal--sist">
        <div className="hode hode--advarsel redaksjonelt-innhold"
            dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.infotekst', ledetekster)} />
        <div className="knapperad">
            <p>
                <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}/skriv-ut`} className="rammeknapp">
                    {getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.skriv-ut', ledetekster)}
                </Link>
            </p>
        </div>
    </div>);
};

SkrivUt.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    sykmelding: PropTypes.object.isRequired,
};

export const Tilleggsinfo = (props) => {
    const { input, ledetekster, pilotSykepenger } = props;
    const { value } = input;
    return (<div>
        {
            value && value.orgnummer === '0' ? <SkrivUt {...props} /> : null
        }
        {
            value && value.naermesteLeder ?
                <ErLederRiktig naermesteLeder={value.naermesteLeder} ledetekster={ledetekster} /> : null
        }
        {
            pilotSykepenger && value && value.orgnummer && value.orgnummer !== '0' ?
                <ForskuttererArbeidsgiver arbeidsgiver={value} ledetekster={ledetekster} /> : null
        }
    </div>);
};

Tilleggsinfo.propTypes = {
    input: PropTypes.object.isRequired,
    ledetekster: PropTypes.object.isRequired,
    pilotSykepenger: PropTypes.bool.isRequired,
};

export const visTilleggssporsmal = (_props) => {
    const { input, pilotSykepenger } = _props;
    const { value } = input;
    return !value ? false : (value.orgnummer === '0' || (pilotSykepenger && value.orgnummer !== '0') || (typeof value.naermesteLeder === 'object' && value.naermesteLeder !== null));
};

export const RendreVelgArbeidsgiver = (props) => {
    const Sporsmal = (<ArbeidsgiverRadioknapper {...props} />);

    return (<div className="hovedsporsmal__tilleggssporsmal">
        <SporsmalMedTillegg {...props} Sporsmal={Sporsmal} visTillegg={visTilleggssporsmal}>
            <Tilleggsinfo {...props} />
        </SporsmalMedTillegg>
    </div>);
};

RendreVelgArbeidsgiver.propTypes = {
    skjemaData: PropTypes.object,
    pilotSykepenger: PropTypes.bool,
};

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
        component={RendreVelgArbeidsgiver}
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
