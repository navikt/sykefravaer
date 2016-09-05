import React, { PropTypes } from 'react';
import Radiogruppe from '../skjema/Radiogruppe';
import { getHtmlLedetekst, getLedetekst } from '../../ledetekster';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths.js';

const VelgArbeidsgiver = ({ arbeidsgivere, ledetekster, sykmelding, fields }) => {
    const valgtArbeidsgiver = fields.valgtArbeidsgiver;
    const erFeil = valgtArbeidsgiver.touched && typeof valgtArbeidsgiver.error === 'string';

    return (<div className="blokk">
        <Radiogruppe
            name="valgtArbeidsgiver"
            spoersmaal={getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal', ledetekster)}
            valgtVerdi={JSON.stringify(valgtArbeidsgiver.value)}
            feilmelding={valgtArbeidsgiver.error}
            onChange={(value) => {
                valgtArbeidsgiver.onChange(JSON.parse(value));
            }}
            erFeil={erFeil}
            Overskrift="H4">
            {
                arbeidsgivere.map((arbeidsgiver) => {
                    let labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                        `(${getLedetekst('send-til-arbeidsgiver.orgnr', ledetekster)}: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})`
                        : null;

                    return (<input
                        key={arbeidsgiver.orgnummer}
                        id={arbeidsgiver.orgnummer}
                        value={JSON.stringify(arbeidsgiver)}
                        label={arbeidsgiver.navn}
                        labelSekundaer={labelSekundaer}>
                        {arbeidsgiver.orgnummer !== '0' ? null :
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
                            </div>}
                        </input>);
                })
            }
        </Radiogruppe>
    </div>);
};

VelgArbeidsgiver.propTypes = {
    arbeidsgivere: PropTypes.array,
    ledetekster: PropTypes.object,
    sykmelding: PropTypes.object,
    fields: PropTypes.object,
};

export default VelgArbeidsgiver;
