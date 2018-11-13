import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
} from 'digisyfo-npm';
import {
    proptypes as motebehovProptypes,
} from 'moter-npm';
import getContextRoot from '../../utils/getContextRoot';
import Sidetopp from '../Sidetopp';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';

export const DIALOGMOTE_SIDEVISNING = {
    MOTEBEHOV: 'behov',
    MOTE: 'mote',
};

const DialogmoterInnhold = (
    {
        ledetekster,
        koblingId,
        motebehovReducer,
        harMote,
        skalViseMotebehov,
        virksomhetsnrListe,
    }) => {
    return (<div className="dialogmoterInnhold">
        <Sidetopp tittel={getLedetekst('mote.moter.sidetittel')} />
        { skalViseMotebehov && virksomhetsnrListe.map((virksomhetsnummer, idx) => {
            return (<MotebehovInnholdLenke
                key={idx}
                ledetekster={ledetekster}
                koblingId={koblingId}
                motebehov={motebehovReducer}
                virksomhetsnummer={virksomhetsnummer}
                rootUrl={getContextRoot()}
            />);
        })}

        { harMote &&
        <DialogmoterInnholdLenke
            imgUrl={`${getContextRoot()}/img/svg/kalender-bgblaa.svg`}
            visning={DIALOGMOTE_SIDEVISNING.MOTE}
            innholdstekster={{
                tittel: getLedetekst('mote.dialogmoterInnholdLenke.tittel'),
            }}
            rootUrl={getContextRoot()}
        />
        }
    </div>);
};
DialogmoterInnhold.propTypes = {
    ledetekster: keyValue,
    koblingId: PropTypes.string,
    motebehovReducer: motebehovProptypes.motebehovReducerATPt,
    harMote: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
};

export default DialogmoterInnhold;
