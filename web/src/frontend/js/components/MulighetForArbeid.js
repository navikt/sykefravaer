import React, { PropTypes } from 'react';
import { getLedetekst } from '../ledetekster';
import { SykmeldingOpplysning } from './SykmeldingOpplysning.js';
import { SykmeldingCheckbox } from './SykmeldingCheckbox.js';
import { getSykmeldingCheckbox, getSykmeldingOpplysning } from '../utils/dinSykmeldingUtils.js';

const fjernAnnet = (array) => {
    if (array.length === 1 && array.indexOf('Annet') > -1) {
        return [];
    }
    return array;
};

const Aarsaker = ({ aarsaker, containerClassName }) => {
    return (<div className={containerClassName}>
        {
            fjernAnnet(aarsaker).map((aarsak, key) => {
                return <SykmeldingCheckbox tekst={aarsak} key={key} className="sykmelding-subopplysning" />;
            })
        }
    </div>);
};

Aarsaker.propTypes = {
    aarsaker: PropTypes.array,
    containerClassName: PropTypes.string,
};

const MulighetForArbeid = ({ sykmelding, ledetekster }) => {
    const visSeksjon = ((sykmelding.mulighetForArbeid.aktivitetIkkeMulig433 && sykmelding.mulighetForArbeid.aktivitetIkkeMulig433.length) ||
    sykmelding.mulighetForArbeid.aarsakAktivitetIkkeMulig433 ||
    (sykmelding.mulighetForArbeid.aktivitetIkkeMulig434 && sykmelding.mulighetForArbeid.aktivitetIkkeMulig434.length) ||
    sykmelding.mulighetForArbeid.aarsakAktivitetIkkeMulig434);
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
                <h4 className="sykmelding-seksjonstittel">{getLedetekst('din-sykmelding.mulighet.for.arbeid.tittel', ledetekster)}</h4>
                {
                    (sykmelding.mulighetForArbeid.aktivitetIkkeMulig433 && sykmelding.mulighetForArbeid.aktivitetIkkeMulig433.length) > 0 ?
                        <SykmeldingOpplysning tittel={getLedetekst('din-sykmelding.mulighet.for.arbeid.pasient.ikke.i.arbeid.tittel', ledetekster)}>
                            <div>
                                {
                                    getSykmeldingCheckbox(sykmelding.mulighetForArbeid,
                                        'aktivitetIkkeMulig433', getLedetekst('din-sykmelding.mulighet.for.arbeid.medisinsk.tittel', ledetekster))
                                }
                                <Aarsaker aarsaker={sykmelding.mulighetForArbeid.aktivitetIkkeMulig433}
                                    containerClassName="js-aktivitetIkkeMulig433hvisJa" />
                            </div>
                        </SykmeldingOpplysning> : null
                }
                {
                    getSykmeldingOpplysning(sykmelding.mulighetForArbeid,
                        'aarsakAktivitetIkkeMulig433',
                        getLedetekst('din-sykmelding.mulighet.for.arbeid.medisinsk.beskriv.tittel', ledetekster))
                }
                {
                    (sykmelding.mulighetForArbeid.aktivitetIkkeMulig434 && sykmelding.mulighetForArbeid.aktivitetIkkeMulig434.length > 0) ?
                        <SykmeldingOpplysning
                            tittel={getLedetekst('din-sykmelding.mulighet.for.arbeid.pasient.ikke.i.arbeid.tittel', ledetekster)}>
                        <div>
                            {
                                getSykmeldingCheckbox(sykmelding.mulighetForArbeid, 'aktivitetIkkeMulig434',
                                    getLedetekst('din-sykmelding.mulighet.for.arbeid.forhold.arbeidsplassen.tittel', ledetekster))
                            }
                            <Aarsaker aarsaker={sykmelding.mulighetForArbeid.aktivitetIkkeMulig434}
                                containerClassName="js-aktivitetIkkeMulig434hvisJa" />
                        </div>
                    </SykmeldingOpplysning> : null
                }
                {
                    getSykmeldingOpplysning(sykmelding.mulighetForArbeid, 'aarsakAktivitetIkkeMulig434',
                        getLedetekst('din-sykmelding.mulighet.for.arbeid.forhold.arbeidsplassen.beskriv.tittel', ledetekster))
                }
        </div>);
};

MulighetForArbeid.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default MulighetForArbeid;
