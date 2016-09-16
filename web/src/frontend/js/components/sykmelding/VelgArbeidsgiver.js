import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Radiogruppe from '../skjema/Radiogruppe';
import { getHtmlLedetekst, getLedetekst } from '../../ledetekster';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths.js';

const VelgArbeidsgiver = ({ arbeidsgivere, ledetekster, sykmelding, skjemaData }) => {
    const values = skjemaData && skjemaData.values ? skjemaData.values : {};

    return (<div className="blokk">
            {
                arbeidsgivere.map((arbeidsgiver, index) => {
                    const labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                        `(${getLedetekst('send-til-arbeidsgiver.orgnr', ledetekster)}: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})`
                        : null;
                    const visAnnenInfo = values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer === '0' && arbeidsgiver.orgnummer === '0';
                    const checked = (values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer === arbeidsgiver.orgnummer) === true;
                    return (<div className="nav-input" key={index}>
                        <Field
                            key={index}
                            component="input"
                            type="radio"
                            name="valgtArbeidsgiver"
                            id={`arbeidsgiver-${arbeidsgiver.orgnummer}`}
                            value={arbeidsgiver.orgnummer} 
                            className="nav-radioknapp"
                            checked={checked}
                            parse={(orgnummer) => {
                                return arbeidsgivere.filter((arbgiver) => {
                                    return arbgiver.orgnummer === orgnummer;
                                })[0]
                            }} />
                        <label htmlFor={`arbeidsgiver-${arbeidsgiver.orgnummer}`}>{arbeidsgiver.navn} {labelSekundaer ? <span className="label-sekundaer">{labelSekundaer}</span> : null}</label>
                        {
                            visAnnenInfo && 
                            <div className="panel panel-ekstra">
                                <div className="hode hode-advarsel hode-brodtekst redaksjonelt-innhold side-innhold" 
                                    dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.infotekst', ledetekster)} />
                                <div className="knapperad side-innhold">
                                    <p>
                                        <Link target="_blank" to={`${getContextRoot()}/sykmeldinger/${sykmelding.id}/skriv-ut`} className="rammeknapp">
                                            {getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.skriv-ut', ledetekster)}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        }
                    </div>);
                })
            }
    </div>);
};

VelgArbeidsgiver.propTypes = {
    arbeidsgivere: PropTypes.array,
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
    fields: PropTypes.object,
};

export default VelgArbeidsgiver;
