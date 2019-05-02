import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, getHtmlLedetekst, sorterSykmeldinger, sorterSykmeldingerEldsteFoerst, sykmeldingstatuser } from '@navikt/digisyfo-npm';
import SykmeldingTeasere from './SykmeldingTeasere';
import SykmeldingerSorteringContainer from './SykmeldingerSorteringContainer';
import Sidetopp from '../../components/Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import { smSykmeldingerPt } from '../../propTypes/smSykmeldingProptypes';

const Sykmeldinger = ({ sykmeldinger = [], sortering, smSykmeldinger }) => {
    const nyeSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status === sykmeldingstatuser.NY;
    });
    const tidligereSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status !== sykmeldingstatuser.NY;
    });
    const tidligereSortering = sortering && sortering.tidligere ? sortering.tidligere : undefined;
    const ulesteSmSykmeldinger = smSykmeldinger.filter((smSykmelding) => {
        return smSykmelding.bekreftetDato === null;
    });
    const lesteSmSykmeldinger = smSykmeldinger.filter((smSykmelding) => {
        return smSykmelding.bekreftetDato !== null;
    });
    return (<div>
        <Sidetopp
            tittel={getLedetekst('dine-sykmeldinger.tittel')}
            htmlTekst={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst')}
        />
        <SykmeldingTeasere
            sykmeldinger={sorterSykmeldingerEldsteFoerst([...nyeSykmeldinger, ...ulesteSmSykmeldinger])}
            tittel={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.tittel')}
            ingenSykmeldingerMelding={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.ingen-sykmeldinger.melding')}
            className="js-nye-sykmeldinger"
            id="sykmelding-liste-nye" />
        {
            (tidligereSykmeldinger.length > 0 || lesteSmSykmeldinger.length > 0) && <SykmeldingTeasere
                sykmeldinger={sorterSykmeldinger([...tidligereSykmeldinger, ...lesteSmSykmeldinger], tidligereSortering)}
                tittel={getLedetekst('dine-sykmeldinger.tidligere-sykmeldinger.tittel')}
                className="js-tidligere-sykmeldinger"
                id="sykmelding-liste-tidligere">
                <SykmeldingerSorteringContainer status="tidligere" />
            </SykmeldingTeasere>
        }
    </div>);
};

Sykmeldinger.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    sortering: PropTypes.shape({
        tidligere: PropTypes.string,
    }),
    smSykmeldinger: smSykmeldingerPt,
};

export default Sykmeldinger;
