import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { visFeilmelding, getFeilmelding, getLedetekst } from 'digisyfo-npm';

const ErLederRiktig = ({ naermesteLeder, skjemaData, ledetekster }) => {
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
        <h4 className="skjema-sporsmal">{getLedetekst('starte-sykmelding.bekreft-naermeste-leder.tittel', ledetekster)}</h4>
        <p>{getLedetekst('starte-sykmelding.bekreft-naermeste-leder.tekst', ledetekster)}</p>
        <div className={erFeil ? 'skjema-feilomrade feil' : 'skjema-feilomrade'}>
            <h5 className="label radiogruppeLabel">
                {
                    getLedetekst('starte-sykmelding.bekreft-naermeste-leder.sporsmal', ledetekster, {
                        '%NAERMESTELEDER%': naermesteLeder,
                    })
                }
            </h5>
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
    ledetekster: PropTypes.object,
};

export default ErLederRiktig;
