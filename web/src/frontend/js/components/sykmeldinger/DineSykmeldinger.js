import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, getHtmlLedetekst, sorterSykmeldinger, sorterSykmeldingerEldsteFoerst } from 'digisyfo-npm';
import SykmeldingTeasere from './SykmeldingTeasere';
import SykmeldingerSorteringContainer from '../../containers/SykmeldingerSorteringContainer';
import Sidetopp from '../Sidetopp';
import { NY } from '../../enums/sykmeldingstatuser';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const DineSykmeldinger = ({ sykmeldinger = [], sortering }) => {
    const nyeSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status === NY;
    });
    const tidligereSykmeldinger = sykmeldinger.filter((sykmld) => {
        return sykmld.status !== NY;
    });
    const tidligereSortering = sortering && sortering.tidligere ? sortering.tidligere : undefined;

    return (<div>
        <Sidetopp
            tittel={getLedetekst('dine-sykmeldinger.tittel')}
            htmlTekst={getHtmlLedetekst('dine-sykmeldinger.introduksjonstekst')}
        />
        <SykmeldingTeasere
            sykmeldinger={sorterSykmeldingerEldsteFoerst(nyeSykmeldinger)}
            tittel={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.tittel')}
            ingenSykmeldingerMelding={getLedetekst('dine-sykmeldinger.nye-sykmeldinger.ingen-sykmeldinger.melding')}
            className="js-nye-sykmeldinger"
            id="sykmelding-liste-nye" />
        {
            tidligereSykmeldinger.length > 0 && <SykmeldingTeasere
                sykmeldinger={sorterSykmeldinger(tidligereSykmeldinger, tidligereSortering)}
                tittel={getLedetekst('dine-sykmeldinger.tidligere-sykmeldinger.tittel')}
                ingenSykmeldingerMelding={getLedetekst('dine-sykmeldinger.tidligere-sykmeldinger.ingen-sykmeldinger.melding')}
                className="js-tidligere-sykmeldinger"
                id="sykmelding-liste-tidligere">
                <SykmeldingerSorteringContainer status="tidligere" />
            </SykmeldingTeasere>
        }
    </div>);
};

DineSykmeldinger.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    sortering: PropTypes.shape({
        tidligere: PropTypes.string,
    }),
};

export default DineSykmeldinger;
