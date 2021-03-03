/* eslint arrow-body-style: ["error", "as-needed"] */
import React from 'react';
import PropTypes from 'prop-types';
import AlertStripeInfo from 'nav-frontend-alertstriper';
import {
    getHtmlLedetekst, getLedetekst, sorterSykmeldinger, sorterSykmeldingerEldsteFoerst, sykmeldingstatuser,
} from '../../digisyfoNpm';
import SykmeldingTeasere from './SykmeldingTeasere';
import SykmeldingerSorteringContainer from './SykmeldingerSorteringContainer';
import Sidetopp from '../../components/Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import { smSykmeldingerPt } from '../../propTypes/smSykmeldingProptypes';

const Sykmeldinger = ({
    sykmeldinger = [], sortering, smSykmeldinger, infomelding = null,
}) => {
    const nyeSykmeldinger = sykmeldinger.filter(sykmld => sykmld.status === sykmeldingstatuser.NY);
    const tidligereSykmeldinger = sykmeldinger.filter(sykmld => sykmld.status !== sykmeldingstatuser.NY);
    const tidligereSortering = sortering && sortering.tidligere ? sortering.tidligere : undefined;
    const ulesteSmSykmeldinger = smSykmeldinger.filter(smSykmelding => smSykmelding.sykmeldingStatus.statusEvent === 'APEN');
    const lesteSmSykmeldinger = smSykmeldinger.filter(smSykmelding => smSykmelding.sykmeldingStatus.statusEvent === 'BEKREFTET');
    return (
        <React.Fragment>
            <Sidetopp
                tittel={getLedetekst('dine-sykmeldinger.tittel')}
                htmlTekst={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst')}
            />
            {infomelding !== null && <AlertStripeInfo type="info" className="blokk-m">{infomelding}</AlertStripeInfo>}
            <SykmeldingTeasere
                sykmeldinger={sorterSykmeldingerEldsteFoerst([...nyeSykmeldinger, ...ulesteSmSykmeldinger])}
                tittel={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.tittel')}
                ingenSykmeldingerMelding={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.ingen-sykmeldinger.melding')}
                className="js-nye-sykmeldinger"
                id="sykmelding-liste-nye"
            />
            {(tidligereSykmeldinger.length > 0 || lesteSmSykmeldinger.length > 0) && (
                <SykmeldingTeasere
                    sykmeldinger={sorterSykmeldinger([...tidligereSykmeldinger, ...lesteSmSykmeldinger], tidligereSortering)}
                    tittel={getLedetekst('dine-sykmeldinger.tidligere-sykmeldinger.tittel')}
                    className="js-tidligere-sykmeldinger"
                    id="sykmelding-liste-tidligere"
                >
                    <SykmeldingerSorteringContainer status="tidligere" />
                </SykmeldingTeasere>
            )
            }
        </React.Fragment>
    );
};

Sykmeldinger.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    sortering: PropTypes.shape({
        tidligere: PropTypes.string,
    }),
    smSykmeldinger: smSykmeldingerPt,
    infomelding: PropTypes.string,
};

export default Sykmeldinger;
