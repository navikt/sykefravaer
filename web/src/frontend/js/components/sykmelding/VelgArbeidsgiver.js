import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { getHtmlLedetekst, getLedetekst, visFeilmelding, getFeilmelding, Hjelpetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';
import ErLederRiktig from './ErLederRiktig';

const VelgArbeidsgiver = ({ arbeidsgivere, ledetekster, sykmelding, skjemaData }) => {
    const values = skjemaData && skjemaData.values ? skjemaData.values : {};
    const erFeil = visFeilmelding(skjemaData, 'valgtArbeidsgiver');
    const feilmelding = getFeilmelding(skjemaData, 'valgtArbeidsgiver');

    return (<div>
        <div className="blokk">
            <div className={erFeil ? 'skjema__feilomrade skjema__feilomrade--feil' : 'skjema__feilomrade'}>
                <div className="medHjelpetekst">
                    <h4 className="skjema__sporsmal">{getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal', ledetekster)}</h4>
                    <Hjelpetekst
                        id="velg-arbeidsgiver-hjelpetekst"
                        tittel={getLedetekst('din-sykmelding.velg-arbeidsgiver.hjelpetekst.tittel', ledetekster)}
                        tekst={getLedetekst('din-sykmelding.velg-arbeidsgiver.hjelpetekst.tekst', ledetekster)} />
                </div>
                {
                    arbeidsgivere.map((arbeidsgiver, index) => {
                        const labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                            `(${getLedetekst('send-til-arbeidsgiver.orgnr', ledetekster)}: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})`
                            : null;
                        const visAnnenInfo = values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer === '0' && arbeidsgiver.orgnummer === '0';
                        const checked = (values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer === arbeidsgiver.orgnummer) === true;
                        return (<div className="skjema__input" key={index}>
                            <Field
                                key={index}
                                component="input"
                                type="radio"
                                name="valgtArbeidsgiver"
                                id={`arbeidsgiver-${arbeidsgiver.orgnummer}`}
                                value={arbeidsgiver.orgnummer}
                                className="radioknapp"
                                checked={checked}
                                parse={(orgnummer) => {
                                    return arbeidsgivere.filter((arbgiver) => {
                                        return arbgiver.orgnummer === orgnummer;
                                    })[0];
                                }} />
                            <label htmlFor={`arbeidsgiver-${arbeidsgiver.orgnummer}`}>{arbeidsgiver.navn}
                                {labelSekundaer ? <span className="sekundaerLabel">{labelSekundaer}</span> : null}</label>
                            {
                                visAnnenInfo &&
                                <div className="panel panel-ekstra js-annen-info">
                                    <div className="hode hode-advarsel hode-brodtekst redaksjonelt-innhold side-innhold"
                                        dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.infotekst', ledetekster)} />
                                    <div className="knapperad">
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
                <span className="skjema__feilmelding" role="alert" aria-live="polite">
                    {erFeil && feilmelding}
                </span>
            </div>
        </div>
        {
            values.valgtArbeidsgiver && values.valgtArbeidsgiver.naermesteLeder &&
                <ErLederRiktig naermesteLeder={values.valgtArbeidsgiver.naermesteLeder} skjemaData={skjemaData} ledetekster={ledetekster} />
        }
    </div>);
};

VelgArbeidsgiver.propTypes = {
    arbeidsgivere: PropTypes.array,
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
    skjemaData: PropTypes.object,
};

export default VelgArbeidsgiver;
