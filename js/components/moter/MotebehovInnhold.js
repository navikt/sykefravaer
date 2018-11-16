import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
} from 'digisyfo-npm';
import {
    proptypes as motebehovProptypes,
    MotebehovKvittering,
    MotebehovSvarAT,
} from 'moter-npm';
import getContextRoot from '../../utils/getContextRoot';
import Sidetopp from '../Sidetopp';
import { skalViseMotebehovKvittering } from '../../utils/motebehovUtils';

const MotebehovInnhold = (
    {
        ledetekster,
        actions,
        motebehovReducer,
        motebehovSvarReducer,
        virksomhetsnr,
    }) => {
    let innhold;
    if (skalViseMotebehovKvittering(motebehovReducer, virksomhetsnr)) {
        innhold = (<MotebehovKvittering
            ledetekster={ledetekster}
            motebehov={motebehovReducer}
            rootUrlImg={getContextRoot()}
            rootUrl={getContextRoot()}
        />);
    } else {
        const sykmeldtFnr = '';
        innhold = (<MotebehovSvarAT
            ledetekster={ledetekster}
            virksomhetsnummer={virksomhetsnr}
            sykmeldtFnr={sykmeldtFnr}
            motebehovSvarReducer={motebehovSvarReducer}
            svarMotebehov={actions.svarMotebehov}
            rootUrl={getContextRoot()}
        />);
    }
    return (<div className="motebehovSideInnhold">
        <Sidetopp tittel={getLedetekst('mote.motebehov.sidetittel')} />

        { innhold }
    </div>);
};
MotebehovInnhold.propTypes = {
    ledetekster: keyValue,
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
    }),
    motebehovReducer: motebehovProptypes.motebehovReducerATPt,
    motebehovSvarReducer: motebehovProptypes.motebehovSvarReducerPt,
    virksomhetsnr: PropTypes.string,
};

export default MotebehovInnhold;
