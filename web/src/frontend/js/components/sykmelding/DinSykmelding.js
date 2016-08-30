import React, { PropTypes } from 'react';
import DineSykmeldingOpplysninger from '../sykmeldingOpplysninger/DineSykmeldingOpplysninger';
import DinSykmeldingSkjemaContainer from '../../containers/DinSykmeldingSkjemaContainer';

const DinSykmelding = ({ sykmelding, ledetekster, harPilotarbeidsgiver = false }) => {
    return (<div>
        <div className="header-bolk header-sykmelding">
            <img className="header-ikon" src="/sykefravaer/img/svg/person.svg" alt="Du" />
            <img className="header-ikon header-ikon-hoykontrast"
                src="/sykefravaer/img/svg/person-highcontrast.svg" alt="Du" />
            <h1 className="header-tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h1>
        </div>
        <div className="panel blokk">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </div>
        {
            harPilotarbeidsgiver && <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} />
        }
    </div>);
};

DinSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    harPilotarbeidsgiver: PropTypes.bool,
    harStrengtFortroligAdresse: PropTypes.bool,
};

export default DinSykmelding;
