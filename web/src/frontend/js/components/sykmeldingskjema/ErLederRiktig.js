import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import Radioknapper from '../skjema/Radioknapper';
import { naermesteLeder as naermesteLederPt } from '../../propTypes';

export const RendreErLederRiktig = ({ input, meta, ledetekster, naermesteLeder }) => {
    const alternativer = [{
        label: 'Ja',
        value: false,
    }, {
        label: 'Nei – NAV ber arbeidsgiveren din oppgi ny leder',
        value: true,
    }];

    const hjelpetekst = (<Hjelpetekst
        id="velg-beOmNyNaermesteLeder-hjelpetekst"
        tittel={getLedetekst('din-sykmelding.beOmNyNaermesteLeder.hjelpetekst.tittel', ledetekster)}
        tekst={getLedetekst('din-sykmelding.beOmNyNaermesteLeder.hjelpetekst.tekst', ledetekster)} />);

    return (<div className="hovedsporsmal__tilleggssporsmal">
        <Radioknapper
            input={input}
            meta={meta}
            spoersmal={getLedetekst('starte-sykmelding.bekreft-naermeste-leder.sporsmal', ledetekster, {
                '%NAERMESTELEDER%': naermesteLeder.navn,
            })}
            hjelpetekst={hjelpetekst}>
            {
                alternativer.map((alternativ, index) => {
                    return <input {...alternativ} key={index} />;
                })
            }
        </Radioknapper>
    </div>);
};

RendreErLederRiktig.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    ledetekster: PropTypes.object,
    naermesteLeder: naermesteLederPt,
};

const ErLederRiktig = (props) => {
    return (<Field
        {...props}
        component={RendreErLederRiktig}
        name="beOmNyNaermesteLeder"
        parse={(value) => {
            return value === 'true';
        }} />);
};

ErLederRiktig.propTypes = {
    skjemaData: PropTypes.object,
    naermesteLeder: naermesteLederPt,
    ledetekster: PropTypes.object,
};

export default ErLederRiktig;
