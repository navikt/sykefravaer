import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { proptypes as motebehovProptypes } from 'moter-npm';
import Sidetopp from '../Sidetopp';
import MotebehovSvar from './motebehov/MotebehovSvar';
import MotebehovKvittering from './motebehov/MotebehovKvittering';
import {
    finnNyesteMotebehovForVirksomhetListe,
} from '../../utils/motebehovUtils';

const MotebehovInnhold = (
    {
        actions,
        motebehovReducer,
        motebehovSvarReducerListe,
        virksomhetnrMedMotebehovListe,
    }) => {
    const motebehov = finnNyesteMotebehovForVirksomhetListe(motebehovReducer, virksomhetnrMedMotebehovListe);

    const innhold = motebehov
        ? (<MotebehovKvittering
            motebehov={motebehov}
        />)
        : (<MotebehovSvar
            virksomhetsnrListe={virksomhetnrMedMotebehovListe}
            motebehovSvarReducerListe={motebehovSvarReducerListe}
            svarMotebehov={actions.svarMotebehov}
        />);
    return (<div className="motebehovSideInnhold">
        <Sidetopp tittel={getLedetekst('mote.motebehov.sidetittel')} />

        { innhold }
    </div>);
};
MotebehovInnhold.propTypes = {
    actions: PropTypes.shape({
        hentMotebehov: PropTypes.func,
        svarMotebehov: PropTypes.func,
    }),
    motebehovReducer: motebehovProptypes.motebehovReducerATPt,
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovProptypes.motebehovSvarReducerPt),
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
};

export default MotebehovInnhold;
