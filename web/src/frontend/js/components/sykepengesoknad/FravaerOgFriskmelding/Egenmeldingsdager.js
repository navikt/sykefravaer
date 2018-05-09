import React from 'react';
import { Hjelpetekst, toDatePrettyPrint, getLedetekst, Bjorn } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import JaEllerNei from '../JaEllerNei';
import Periodevelger from '../../skjema/datovelger/Periodevelger';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import { getTidligsteStartdatoSykeforloep } from '../../../utils/sykmeldingUtils';
import { getEgenmeldingsdagerSporsmal } from '../Oppsummering/sykepengesoknadSporsmal';
import { Vis } from '../../../utils';

const EgenmeldingsDager = ({ sykepengesoknad, erEgenmeldingsdagerPreutfylt }) => {
    const startSykeforloep = getTidligsteStartdatoSykeforloep(sykepengesoknad);
    const senesteTom = new Date(startSykeforloep);
    senesteTom.setDate(startSykeforloep.getDate() - 1);
    const tidligsteFom = new Date(senesteTom);
    tidligsteFom.setMonth(senesteTom.getMonth() - 6);

    const hjelpetekst = (<Hjelpetekst
        id="egenmeldingsdager-hjelpetekst"
        tittel={getLedetekst('sykepengesoknad.egenmeldingsdager.hjelpetekst.tittel')}
        tekst={getLedetekst('sykepengesoknad.egenmeldingsdager.hjelpetekst.tekst', {
            '%DATO%': toDatePrettyPrint(startSykeforloep),
        })} />);

    const informasjon = (<Vis hvis={erEgenmeldingsdagerPreutfylt}>
        <Bjorn nokkel="sykepengesoknad.egenmeldingsdager.preutfylt-melding" className="press" />
    </Vis>);

    return (<JaEllerNei
        spoersmal={getEgenmeldingsdagerSporsmal(sykepengesoknad)}
        name="bruktEgenmeldingsdagerFoerLegemeldtFravaer"
        hjelpetekst={hjelpetekst}
        informasjon={informasjon}>
        <Periodevelger
            name="egenmeldingsperioder"
            spoersmal={getLedetekst('sykepengesoknad.egenmeldingsdager.dato.sporsmal-2', {
                '%DATO%': toDatePrettyPrint(startSykeforloep),
            })}
            tidligsteFom={tidligsteFom}
            senesteTom={senesteTom} />
    </JaEllerNei>);
};

EgenmeldingsDager.propTypes = {
    sykepengesoknad: sykepengesoknadPt.isRequired,
    erEgenmeldingsdagerPreutfylt: PropTypes.bool,
};

export default EgenmeldingsDager;
