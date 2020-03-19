import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import Radioknapper from '../../../../components/skjema/Radioknapper';
import {
    naermesteLeder as naermesteLederPt,
    fieldPropTypes,
} from '../../../../propTypes';

export const RendreErLederRiktig = ({ input, meta, naermesteLeder }) => {
    const alternativer = [
        {
            label: getLedetekst('radioknapp.ja'),
            value: false,
        },
        {
            label: getLedetekst('radioknapp.nei'),
            value: true,
        },
    ];

    const infoOmSykemeldingmottaker = (navn) => {
        return input.value === true ? (
            <p className="sist">
                {getLedetekst('starte-sykmelding.bekreft-naermeste-leder.sporsmal.nei')}
            </p>
        ) : input.value === false ? (
            <p className="sist">
                {`Vi sender egenerklæringen til ${navn}, som finner den ved å logge inn på nav.no.`}
            </p>
        ) : null;
    };

    const hjelpetekst = (
        <Hjelpetekst id="velg-beOmNyNaermesteLeder-hjelpetekst">
      Arbeidsgiveren din har oppgitt at det er denne personen som følger deg opp
      på jobb. Personen vil få se egenerklæringen ved å logge seg på nav.no, og
      kan bli kontaktet av NAV underveis i egenerklæringen hvis det er behov for
      det. Hvis du er usikker på om navnet er riktig, bør du spørre
      arbeidsgiveren din om hvorfor de har valgt det.
        </Hjelpetekst>
    );

    return (
        <div className="hovedsporsmal__tilleggssporsmal">
            <Radioknapper
                input={input}
                meta={meta}
                spoersmal={`Er det ${naermesteLeder.navn} som følger deg opp på jobb?`}
                hjelpetekst={hjelpetekst}
            >
                {alternativer.map((alternativ, index) => {
                    return <input {...alternativ} key={index} />;
                })}
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
            }}
        />
    );
};

ErLederRiktig.propTypes = {
    skjemaData: PropTypes.shape({}),
    naermesteLeder: naermesteLederPt,
};

export default ErLederRiktig;
