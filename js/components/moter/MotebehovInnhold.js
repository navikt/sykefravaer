import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
} from 'digisyfo-npm';
import {
    proptypes as motebehovProptypes,
    MotebehovSvarAT as MotebehovSvar,
    MotebehovKvitteringAT as MotebehovKvittering,
} from 'moter-npm';
import getContextRoot from '../../utils/getContextRoot';
import Sidetopp from '../Sidetopp';
import {
    finnNyesteMotebehovForVirksomhetListe,
} from '../../utils/motebehovUtils';

const MotebehovInnhold = (
    {
        ledetekster,
        actions,
        motebehovReducer,
        motebehovSvarReducerListe,
        virksomhetnrMedMotebehovListe,
    }) => {
    const motebehov = finnNyesteMotebehovForVirksomhetListe(motebehovReducer, virksomhetnrMedMotebehovListe);

    const innhold = motebehov
        ? (<MotebehovKvittering
            ledetekster={ledetekster}
            motebehov={motebehov}
            rootUrlImg={getContextRoot()}
        />)
        : (<MotebehovSvar
            ledetekster={ledetekster}
            virksomhetsnrListe={virksomhetnrMedMotebehovListe}
            motebehovSvarReducerListe={motebehovSvarReducerListe}
            svarMotebehov={actions.svarMotebehov}
            rootUrl={getContextRoot()}
        />);
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
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovProptypes.motebehovSvarReducerPt),
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
};

export default MotebehovInnhold;
