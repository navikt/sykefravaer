import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknadstatuser } from 'digisyfo-npm';
import AktiviteterISykmeldingsperioden from '../../components/sykepengesoknad/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import GenerellSoknadContainer from './GenerellArbeidstakersoknadContainer';
import StartIgjen from '../../components/sykepengesoknad/StartIgjen';
import Kvittering from '../../components/sykepengesoknad/Kvittering';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const { SENDT, TIL_SENDING } = sykepengesoknadstatuser;

export const Controller = (props) => {
    if (props.sykepengesoknad.status === SENDT || props.sykepengesoknad.status === TIL_SENDING) {
        return <Kvittering sykepengesoknad={props.sykepengesoknad} />;
    }
    if (props.skjemasoknad) {
        return <AktiviteterISykmeldingsperioden {...props} />;
    }
    return <StartIgjen sykepengesoknad={props.sykepengesoknad} />;
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    skjemasoknad: PropTypes.shape(),
};

const AktiviteterISykmeldingsperiodenContainer = ({ params }) => {
    return <GenerellSoknadContainer Component={Controller} params={params} />;
};

AktiviteterISykmeldingsperiodenContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
};

export default AktiviteterISykmeldingsperiodenContainer;
