import React, { PropTypes } from 'react';
import Radiogruppe from './Radiogruppe.js';

const VelgArbeidsgiver = ({ valgtArbeidsgiverOrgnummer, onChange, arbeidsgivere }) => {
    return (<div className="blokk">
            <Radiogruppe
                name="valgt-arbeidsgiver"
                spoersmaal="Velg riktig arbeidsgiver for denne sykmeldingen"
                valgtVerdi={valgtArbeidsgiverOrgnummer}
                onChange={onChange}>
                {
                    arbeidsgivere.data.map((arbeidsgiver) => {
                        return <input key={arbeidsgiver.orgnummer} id={arbeidsgiver.orgnummer} value={arbeidsgiver.orgnummer} label={arbeidsgiver.navn} />;
                    })
                }
            </Radiogruppe>
        </div>);
};

VelgArbeidsgiver.propTypes = {
    valgtArbeidsgiverOrgnummer: PropTypes.number,
    onChange: PropTypes.func,
    arbeidsgivere: PropTypes.array,
};

export default VelgArbeidsgiver;
