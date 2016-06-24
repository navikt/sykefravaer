import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster/index';
import DinSykmeldingBrukerInputContainer from '../containers/DinSykmeldingBrukerInputContainer';
import arbeidssituasjoner from '../arbeidssituasjonData';
import DineSykmeldingOpplysninger from './DineSykmeldingOpplysninger';

const DinSykmelding = ({ sykmelding, ledetekster, visSendTilArbeidsgiver = false }) => {
    return (<div>
        <div className="header-bolk header-sykmelding">
            <img className="header-ikon" src="/sykefravaer/img/svg/person.svg" alt="Du" />
            <img className="header-ikon header-ikon-hoykontrast"
                src="/sykefravaer/img/svg/person-highcontrast.svg" alt="Du" />
            <h1 className="header-tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h1>
        </div>
        <div className="panel blokk">
            <h2 className="typo-innholdstittel blokk-l">
                {getLedetekst('din-sykmelding.tittel', ledetekster)}
            </h2>
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
                {
                    (visSendTilArbeidsgiver) ?
                        <DinSykmeldingBrukerInputContainer sykmelding={sykmelding} arbeidssituasjoner={arbeidssituasjoner} /> : <noscript />
                }
        </div>
    </div>);
};

DinSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    visSendTilArbeidsgiver: PropTypes.bool,
};

export default DinSykmelding;
