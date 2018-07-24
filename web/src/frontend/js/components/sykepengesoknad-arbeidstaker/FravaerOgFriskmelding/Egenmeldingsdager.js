import React from 'react';
import { toDatePrettyPrint, getLedetekst, Bjorn } from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import PropTypes from 'prop-types';
import { getContextRoot } from '../../../routers/paths';
import JaEllerNei from '../JaEllerNei';
import Periodevelger from '../../skjema/datovelger/Periodevelger';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import { getTidligsteStartdatoSykeforloep } from '../../../utils/sykmeldingUtils';
import { getEgenmeldingsdagerSporsmal } from '../Oppsummering/sykepengesoknadSporsmal';
import { Vis } from '../../../utils';

export const PreutfyltBjorn = ({ vis }) => {
    return (<Vis
        hvis={vis}
        render={() => {
            return (<Bjorn
                className="press"
                nokkel="sykepengesoknad.egenmeldingsdager.preutfylt-melding"
                rootUrl={getContextRoot()} />);
        }} />);
};

PreutfyltBjorn.propTypes = {
    vis: PropTypes.bool,
};

const EgenmeldingsDager = ({ sykepengesoknad, erEgenmeldingsperioderPreutfylt }) => {
    const startSykeforloep = getTidligsteStartdatoSykeforloep(sykepengesoknad);
    const senesteTom = new Date(startSykeforloep);
    senesteTom.setDate(startSykeforloep.getDate() - 1);
    const tidligsteFom = new Date(senesteTom);
    tidligsteFom.setMonth(senesteTom.getMonth() - 6);

    const hjelpetekst = (<Hjelpetekst
        id="egenmeldingsdager-hjelpetekst">{getLedetekst('sykepengesoknad.egenmeldingsdager.hjelpetekst.tekst', {
            '%DATO%': toDatePrettyPrint(startSykeforloep),
        })}</Hjelpetekst>);

    const informasjon = <PreutfyltBjorn vis={erEgenmeldingsperioderPreutfylt} />;

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
    erEgenmeldingsperioderPreutfylt: PropTypes.bool,
};

export default EgenmeldingsDager;
