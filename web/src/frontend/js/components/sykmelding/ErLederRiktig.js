import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { visFeilmelding, getFeilmelding } from '../../utils/valideringUtils';

const ErLederRiktig = ({ naermesteLeder, skjemaData }) => {
    const alternativer = [{
        label: 'Ja',
        beOmNyNaermesteLeder: false,
    }, {
        label: 'Nei – NAV ber arbeidsgiveren din oppgi ny personalasvarlig',
        beOmNyNaermesteLeder: true,
    }];
    const erFeil = visFeilmelding(skjemaData, 'beOmNyNaermesteLeder');
    const feilmelding = getFeilmelding(skjemaData, 'beOmNyNaermesteLeder');

    return (<div className="blokk">
        <h4 className="skjema-sporsmal">Din nærmeste leder med personalansvar</h4>
        <p>Nærmeste leder vil få sykmeldingen du sender til arbeidsgiver. Personen kan også bli kontaktet av NAV hvis det er behov for det underveis i sykefraværet. </p>
        <div className={erFeil ? 'skjema-feilomrade feil' : 'skjema-feilomrade'}>
            <h5 className="label radiogruppeLabel">Er {naermesteLeder} din nærmeste leder?</h5>
            {
                alternativer.map((alternativ, index) => {
                    return (<div className="nav-input" key={index}>
                        <Field
                            component="input"
                            type="radio"
                            name="beOmNyNaermesteLeder"
                            className="nav-radioknapp"
                            id={`beOmNyNaermesteLeder-${alternativ.beOmNyNaermesteLeder}`}
                            value={alternativ.beOmNyNaermesteLeder}
                            parse={(value) => {
                                return value === 'true';
                            }} />
                        <label htmlFor={`beOmNyNaermesteLeder-${alternativ.beOmNyNaermesteLeder}`}>{alternativ.label}</label>
                    </div>);
                })
            }
            <p className="skjema-feilmelding" aria-live="polite">{erFeil && feilmelding}</p>
        </div>
    </div>);
};

ErLederRiktig.propTypes = {
    skjemaData: PropTypes.object,
    naermesteLeder: PropTypes.string,
};

export default ErLederRiktig;
