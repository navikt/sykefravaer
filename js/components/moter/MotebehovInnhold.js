import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import {
    motebehovReducerPt,
    motebehovSvarReducerPt,
    sykeforloepPt,
} from '../../propTypes';
import Sidetopp from '../Sidetopp';
import MotebehovSvar from './motebehov/MotebehovSvar';
import MotebehovKvittering from './motebehov/MotebehovKvittering';
import {
    finnNyesteMotebehovForVirksomhetListeIOppfolgingstilfelle,
} from '../../utils/motebehovUtils';

const MotebehovInnhold = (
    {
        actions,
        motebehovReducer,
        motebehovSvarReducerListe,
        oppfolgingsforlopsPerioderReducerListe,
        virksomhetnrMedMotebehovListe,
    }) => {
    const motebehov = finnNyesteMotebehovForVirksomhetListeIOppfolgingstilfelle(motebehovReducer, virksomhetnrMedMotebehovListe, oppfolgingsforlopsPerioderReducerListe);

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
    motebehovReducer: motebehovReducerPt,
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovSvarReducerPt),
    oppfolgingsforlopsPerioderReducerListe: PropTypes.arrayOf(sykeforloepPt),
    virksomhetnrMedMotebehovListe: PropTypes.arrayOf(PropTypes.string),
};

export default MotebehovInnhold;
