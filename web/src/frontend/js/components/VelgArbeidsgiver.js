import React, { PropTypes } from 'react';
import Radiogruppe from './Radiogruppe.js';
import { getHtmlLedetekst } from '../ledetekster';

const VelgArbeidsgiver = ({ valgtArbeidsgiverOrgnummer, onChange, arbeidsgivere, feilmelding, erFeil, ledetekster }) => {
    return (<div className="blokk">
        <Radiogruppe
            name="valgt-arbeidsgiver"
            spoersmaal="Velg riktig arbeidsgiver for denne sykmeldingen"
            valgtVerdi={valgtArbeidsgiverOrgnummer}
            feilmelding={feilmelding}
            erFeil={erFeil}
            onChange={onChange}
            setFokus={erFeil}>
            {
                arbeidsgivere.map((arbeidsgiver) => {
                    let labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ?
                        `(Orgnr: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})`
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
                                    dangerouslySetInnerHTML={getHtmlLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.tekst', ledetekster)} />
                                <div className="knapperad side-innhold">
                                    <p><button className="knapp knapp-hoved">Skriv ut</button></p>
                                    <p><a href="#">Gå tilbake</a></p>
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
};

export default VelgArbeidsgiver;
