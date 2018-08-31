import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import getContextRoot from '../../utils/getContextRoot';
import ErLederRiktig from './ErLederRiktig';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import Radioknapper from '../skjema/Radioknapper';
import { arbeidsgiver as arbeidsgiverPt, fieldPropTypes, sykmelding as sykmeldingPt } from '../../propTypes';
import { formaterOrgnr } from '../../utils';

export const ArbeidsgiverRadioknapper = (props) => {
    const { input, arbeidsgivere } = props;
    let hjelpelinje = null;

    if (arbeidsgivere.length > 2) {
        hjelpelinje = <p>{getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.flere-arbeidsgivere-infotekst')}</p>;
    }

    return (<div>
        <Radioknapper
            spoersmal={getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal')}
            name="valgtArbeidsgiver"
            hjelpelinje={hjelpelinje}
            {...props}>
            {
                arbeidsgivere.map((arbeidsgiver, index) => {
                    const checked = (input.value && input.value.orgnummer === arbeidsgiver.orgnummer) === true;
                    const labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                        `(${getLedetekst('send-til-arbeidsgiver.orgnr')}: ${formaterOrgnr(arbeidsgiver.orgnummer)})`
                        : null;
                    return <input checked={checked} key={index} label={arbeidsgiver.navn} value={arbeidsgiver.orgnummer} labelSekundaer={labelSekundaer} />;
                })
            }
        </Radioknapper>
        {input.value && input.value.orgnummer !== '0' && <p className="sist js-gdpr">{getLedetekst('send-til-arbeidsgiver.gdpr.sender-til-altinn')}</p>}
    </div>);
};

ArbeidsgiverRadioknapper.propTypes = {
    input: fieldPropTypes.input,
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt).isRequired,
};

export const SkrivUt = (props) => {
    const { sykmelding } = props;
    return (<div className="ekstrasporsmal ekstrasporsmal--sist">
        <div
            className="hode hode--advarsel redaksjonelt-innhold"
            dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.infotekst')} />
        <div className="knapperad">
            <p>
                <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}/skriv-ut`} className="knapp">
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
    input: fieldPropTypes.input,
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

const VelgArbeidsgiver = (props) => {
    const { arbeidsgivere, sykmelding } = props;
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
        component={RendreVelgArbeidsgiver} />);
};

VelgArbeidsgiver.propTypes = {
    arbeidsgivere: PropTypes.arrayOf(arbeidsgiverPt),
    sykmelding: sykmeldingPt,
};

export default VelgArbeidsgiver;
