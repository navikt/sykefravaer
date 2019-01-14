import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { motebehovReducerPt } from '../../propTypes';
import Sidetopp from '../Sidetopp';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';

const DialogmoterInnhold = (
    {
        motebehovReducer,
        harMote,
        skalViseMotebehov,
        virksomhetnrMedMotebehovListe,
    }) => {
    return (<div className="dialogmoterInnhold">
        <Sidetopp tittel={getLedetekst('mote.moter.sidetittel')} />

        { skalViseMotebehov &&
        <MotebehovInnholdLenke
            motebehovReducer={motebehovReducer}
            virksomhetsnrListe={virksomhetnrMedMotebehovListe}
        />
        }

        { harMote && <DialogmoterInnholdLenke /> }
    </div>);
};
DialogmoterInnhold.propTypes = {
    motebehovReducer: motebehovReducerPt,
    harMote: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
};

export default DialogmoterInnhold;
