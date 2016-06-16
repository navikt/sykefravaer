import React, { PropTypes } from 'react';
import Radiogruppe from './Radiogruppe.js';

const VelgArbeidsgiver = ({ valgtArbeidsgiverOrgnummer, onChange, arbeidsgivere, feilmelding, erFeil }) => {
    return (<div className="blokk">
        <Radiogruppe
            name="valgt-arbeidsgiver"
            spoersmaal="Velg riktig arbeidsgiver for denne sykmeldingen"
            valgtVerdi={valgtArbeidsgiverOrgnummer}
            feilmelding={feilmelding}
            erFeil={erFeil}
            onChange={onChange}>
            {
                arbeidsgivere.map((arbeidsgiver) => {
                    let labelSekundaer = (arbeidsgiver.orgnummer && arbeidsgiver.orgnummer.length) !== 1 ? `(Orgnr: ${arbeidsgiver.orgnummer.replace(/(...)(...)(...)/g, '$1 $2 $3')})` : null;
                    return (<input
                        key={arbeidsgiver.orgnummer}
                        id={arbeidsgiver.orgnummer}
                        value={arbeidsgiver.orgnummer}
                        label={arbeidsgiver.navn}
                        labelSekundaer={labelSekundaer}>
                        {arbeidsgiver.orgnummer !== '0' ? null : 
                            <div className="panel panel-ekstra">
                                <p>Du må sende sykmeldingen din på papir!</p>
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
};

export default VelgArbeidsgiver;
