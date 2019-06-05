import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Sidetopp from '../Sidetopp';
import DialogmoterInnholdLenke from './DialogmoterInnholdLenke';
import MotebehovInnholdLenke from './MotebehovInnholdLenke';

const DialogmoterInnhold = (
    {
        harMote,
        skalViseKvittering,
        skalViseMotebehov,
    }) => {
    return (<div className="dialogmoterInnhold">
        <Sidetopp tittel={getLedetekst('mote.moter.sidetittel')} />

        { skalViseMotebehov &&
        <MotebehovInnholdLenke
            skalViseKvittering={skalViseKvittering}
        />
        }

        { harMote && <DialogmoterInnholdLenke /> }
    </div>);
};
DialogmoterInnhold.propTypes = {
    harMote: PropTypes.bool,
    skalViseKvittering: PropTypes.bool,
    skalViseMotebehov: PropTypes.bool,
};

export default DialogmoterInnhold;
