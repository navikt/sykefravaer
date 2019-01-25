import React from 'react';
import PropTypes from 'prop-types';
import { Bjorn } from '@navikt/digisyfo-npm';
import { motebehovSvarReducerPt } from '../../../propTypes';
import SvarMotebehovSkjema from './SvarMotebehovSkjema';
import MotebehovInfoForSvar from './MotebehovInfoForSvar';
import FolketrygdlovenTekst from './FolketrygdlovenTekst';

const bjornTekst = 'Hei! Det nærmer seg tid for dialogmøte, og vi vil gjerne høre hvordan du vurderer behovet for et møte. Vi spør arbeidsgiveren din om det samme.';

const MotebehovSvar = (
    {
        virksomhetsnrListe,
        motebehovSvarReducerListe,
        svarMotebehov,
    }) => {
    return (<div className="motebehovSvar">
        <Bjorn
            rootUrl="sykefravaer"
            hvit
            stor>
            <p>{bjornTekst}</p>
        </Bjorn>

        <MotebehovInfoForSvar />

        <FolketrygdlovenTekst />

        <SvarMotebehovSkjema
            virksomhetsnrListe={virksomhetsnrListe}
            motebehovSvarReducerListe={motebehovSvarReducerListe}
            svarMotebehov={svarMotebehov}
        />
    </div>);
};
MotebehovSvar.propTypes = {
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    motebehovSvarReducerListe: PropTypes.arrayOf(motebehovSvarReducerPt),
    svarMotebehov: PropTypes.func,
};

export default MotebehovSvar;
