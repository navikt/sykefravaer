import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { getLedetekst } from '../../../../digisyfoNpm';
import Radioknapper from '../../../../components/skjema/Radioknapper';
import { naermesteLeder as naermesteLederPt, fieldPropTypes } from '../../../../propTypes';

export const RendreErLederRiktig = ({ input, meta, naermesteLeder }) => {
    const alternativer = [{
        label: getLedetekst('radioknapp.ja'),
        value: false,
    }, {
        label: getLedetekst('radioknapp.nei'),
        value: true,
    }];

    const infoOmSykemeldingmottaker = (navn) => {
        return input.value === true
            ? <p className="sist">{getLedetekst('starte-sykmelding.bekreft-naermeste-leder.sporsmal.nei')}</p>
            : input.value === false
                ? (
                    <p className="sist">
                        {getLedetekst('starte-sykmelding.bekreft-naermeste-leder.sporsmal.ja', {
                            '%NAERMESTELEDER%': navn,
                        })}
                    </p>
                )
                : null;
    };

    // eslint-disable-next-line max-len
    const hjelpetekst = (<Hjelpetekst id="velg-beOmNyNaermesteLeder-hjelpetekst">I forbindelse med en tidligere sykmelding har arbeidsgiveren din oppgitt at det er denne personen som følger deg opp når du er sykmeldt. Personen vil få se sykmeldingen ved å logge seg på nav.no og kan bli kontaktet av NAV underveis i sykefraværet hvis det er behov for det. Hør med arbeidsgiveren din hvis du er usikker på hvorfor de har valgt denne personen.</Hjelpetekst>);

    return (
        <div className="hovedsporsmal__tilleggssporsmal">
            <Radioknapper
                input={input}
                meta={meta}
                spoersmal={getLedetekst('starte-sykmelding.bekreft-naermeste-leder.sporsmal.v2', {
                    '%NAERMESTELEDER%': naermesteLeder.navn,
                })}
                hjelpetekst={hjelpetekst}>
                {
                    alternativer.map((alternativ, index) => {
                        return <input {...alternativ} key={index} />;
                    })
                }
            </Radioknapper>
            {infoOmSykemeldingmottaker(naermesteLeder.navn)}
        </div>
    );
};

RendreErLederRiktig.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
    naermesteLeder: naermesteLederPt,
};

const ErLederRiktig = (props) => {
    return (
        <Field
            {...props}
            component={RendreErLederRiktig}
            name="beOmNyNaermesteLeder"
            parse={(value) => {
                if (value !== undefined) {
                    return value === 'true';
                }
                return value;
            }} />
    );
};

ErLederRiktig.propTypes = {
    skjemaData: PropTypes.shape({}),
    naermesteLeder: naermesteLederPt,
};

export default ErLederRiktig;
