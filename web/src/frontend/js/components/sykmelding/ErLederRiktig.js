import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { visFeilmelding, getFeilmelding, getLedetekst, Hjelpetekst } from 'digisyfo-npm';

const ErLederRiktig = ({ naermesteLeder, skjemaData, ledetekster }) => {
    const alternativer = [{
        label: 'Ja',
        beOmNyNaermesteLeder: false,
    }, {
        label: 'Nei – NAV ber arbeidsgiveren din oppgi ny leder',
        beOmNyNaermesteLeder: true,
    }];
    const erFeil = visFeilmelding(skjemaData, 'beOmNyNaermesteLeder');
    const feilmelding = getFeilmelding(skjemaData, 'beOmNyNaermesteLeder');

    return (<div className="blokk">
        <div className="medHjelpetekst">
            <label htmlFor="select-beOmNyNaermesteLeder" className="skjema__sporsmal">
                {getLedetekst('starte-sykmelding.bekreft-naermeste-leder.sporsmal', ledetekster, {
                    '%NAERMESTELEDER%': naermesteLeder.navn,
                })}
            </label>
            <Hjelpetekst
                id="velg-beOmNyNaermesteLeder-hjelpetekst"
                tittel={getLedetekst('din-sykmelding.beOmNyNaermesteLeder.hjelpetekst.tittel', ledetekster)}
                tekst={getLedetekst('din-sykmelding.beOmNyNaermesteLeder.hjelpetekst.tekst', ledetekster)} />
        </div>
        <div className={erFeil ? 'skjema__feilomrade skjema__feilomrade--feil' : 'skjema__feilomrade'}>
            {
                alternativer.map((alternativ, index) => {
                    return (<div className="nav-input" key={index}>
                        <Field
                            component="input"
                            type="radio"
                            name="beOmNyNaermesteLeder"
                            className="radioknapp"
                            id={`beOmNyNaermesteLeder-${alternativ.beOmNyNaermesteLeder}`}
                            value={alternativ.beOmNyNaermesteLeder}
                            parse={(value) => {
                                return value === 'true';
                            }} />
                        <label htmlFor={`beOmNyNaermesteLeder-${alternativ.beOmNyNaermesteLeder}`}>{alternativ.label}</label>
                    </div>);
                })
            }
            <p className="skjema__feilmelding" aria-live="polite">{erFeil && feilmelding}</p>
        </div>
    </div>);
};

ErLederRiktig.propTypes = {
    skjemaData: PropTypes.object,
    naermesteLeder: PropTypes.shape({
        navn: PropTypes.string,
        epost: PropTypes.string,
        tlf: PropTypes.string,
        organisasjonsnavn: PropTypes.string,
    }),
    ledetekster: PropTypes.object,
};

export default ErLederRiktig;
