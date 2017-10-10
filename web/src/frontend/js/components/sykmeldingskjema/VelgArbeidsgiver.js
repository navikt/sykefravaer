import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';
import ErLederRiktig from './ErLederRiktig';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import Radioknapper from '../skjema/Radioknapper';
import { sykmelding as sykmeldingPt, arbeidsgiver as arbeidsgiverPt } from '../../propTypes';

export const ArbeidsgiverRadioknapper = (props) => {
    const { input, arbeidsgivere } = props;
    let hjelpelinje = null;

    if (arbeidsgivere.length > 2) {
        hjelpelinje = <p>{getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.flere-arbeidsgivere-infotekst')}</p>;
    }

    return (<Radioknapper
        spoersmal={getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal')}
        name="valgtArbeidsgiver"
        hjelpelinje={hjelpelinje}
        {...props}>
        {
            arbeidsgivere.map((arbeidsgiver, index) => {
                const checked = (input.value && input.value.orgnummer === arbeidsgiver.orgnummer) === true;
                const labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                    `(${getLedetekst('send-til-arbeidsgiver.orgnr')}: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})`
                    : null;
                return <input checked={checked} key={index} label={arbeidsgiver.navn} value={arbeidsgiver.orgnummer} labelSekundaer={labelSekundaer} />;
            })
        }
    </Radioknapper>);
};

ArbeidsgiverRadioknapper.propTypes = {
    input: PropTypes.object.isRequired,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt).isRequired,
};

export const SkrivUt = (props) => {
    const { sykmelding } = props;
    return (<div className="ekstrasporsmal ekstrasporsmal--sist">
        <div className="hode hode--advarsel redaksjonelt-innhold"
            dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.infotekst')} />
        <div className="knapperad">
            <p>
                <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}/skriv-ut`} className="rammeknapp">
                    {getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.skriv-ut')}
                </Link>
            </p>
        </div>
    </div>);
};

SkrivUt.propTypes = {
    sykmelding: sykmeldingPt.isRequired,
};

export const Tilleggsinfo = (props) => {
    const { input } = props;
    const { value } = input;
    return (<div>
        {
            value && value.orgnummer === '0' ? <SkrivUt {...props} /> : null
        }
        {
            value && value.naermesteLeder ?
                <ErLederRiktig naermesteLeder={value.naermesteLeder} /> : null
        }
    </div>);
};

Tilleggsinfo.propTypes = {
    input: PropTypes.object.isRequired,
};

export const visTilleggssporsmal = (_props) => {
    const { input } = _props;
    const { value } = input;
    return !value ? false : (value.orgnummer === '0' ||
        (typeof value.naermesteLeder === 'object' && value.naermesteLeder !== null));
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
};

const VelgArbeidsgiver = (props) => {
    const { arbeidsgivere, sykmelding, skjemaData } = props;

    return (<Field
        spoersmal={getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal')}
        name="valgtArbeidsgiver"
        arbeidsgivere={arbeidsgivere}
        parse={(orgnummer) => {
            return arbeidsgivere.filter((arbgiver) => {
                return arbgiver.orgnummer === orgnummer;
            })[0];
        }}
        sykmelding={sykmelding}
        component={RendreVelgArbeidsgiver}
        skjemaData={skjemaData} />);
};

VelgArbeidsgiver.propTypes = {
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
    sykmelding: sykmeldingPt,
    skjemaData: PropTypes.object,
};

export default VelgArbeidsgiver;
