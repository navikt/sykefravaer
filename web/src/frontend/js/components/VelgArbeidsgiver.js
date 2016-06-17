import React, { PropTypes } from 'react';
import Radiogruppe from './Radiogruppe.js';
import { getHtmlLedetekst, getLedetekst } from '../ledetekster';
import { Link } from 'react-router';

const VelgArbeidsgiver = ({ valgtArbeidsgiverOrgnummer, onChange, arbeidsgivere, feilmelding, erFeil, ledetekster, sykmeldingId }) => {
    return (<div className="blokk">
        <Radiogruppe
            name="valgt-arbeidsgiver"
            spoersmaal={getLedetekst('send-til-arbeidsgiver.velg-arbeidsgiver.spoersmaal', ledetekster)}
            valgtVerdi={valgtArbeidsgiverOrgnummer}
            feilmelding={feilmelding}
            erFeil={erFeil}
            onChange={onChange}
            setFokus={erFeil}>
            {
                arbeidsgivere.map((arbeidsgiver) => {
                    let labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                        `(${getLedetekst('send-til-arbeidsgiver.orgnr', ledetekster)}: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})`
                        : null;
                    return (<input
                        key={arbeidsgiver.orgnummer}
                        id={arbeidsgiver.orgnummer}
                        value={arbeidsgiver.orgnummer}
                        label={arbeidsgiver.navn}
                        labelSekundaer={labelSekundaer}
                        erValgt={arbeidsgiver.orgnummer === valgtArbeidsgiverOrgnummer}>
                        {arbeidsgiver.orgnummer !== '0' ? null :
                            <div className="panel panel-ekstra">
                                <div className="hode hode-advarsel hode-brodtekst redaksjonelt-innhold side-innhold"
                                    dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.infotekst', ledetekster)} />
                                <div className="knapperad side-innhold">
                                    <p><button type="button" className="knapp knapp-hoved" onClick={() => {
                                        window.print();
                                    }}>{getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.skriv-ut', ledetekster)}</button></p>
                                    <p><Link to={`/sykefravaer/sykmeldinger/${sykmeldingId}`}>{getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.tilbake', ledetekster)}</Link></p>
                                </div>
                            </div>}
                        </input>);
                })
            }
        </Radiogruppe>
    </div>);
};

VelgArbeidsgiver.propTypes = {
    valgtArbeidsgiverOrgnummer: PropTypes.string,
    onChange: PropTypes.func,
    arbeidsgivere: PropTypes.array,
    feilmelding: PropTypes.string,
    erFeil: PropTypes.bool,
    ledetekster: PropTypes.object,
    sykmeldingId: PropTypes.string,
};

export default VelgArbeidsgiver;
