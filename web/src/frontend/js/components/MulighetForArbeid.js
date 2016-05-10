import React, { PropTypes } from 'react';
import { formatDate } from '../utils/index.js';
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
    const visSeksjon = (sykmelding.startLegemeldtFravaer ||
    (sykmelding.aktivitetIkkeMulig433 && sykmelding.aktivitetIkkeMulig433.length) ||
    sykmelding.aarsakAktivitetIkkeMulig433 ||
    (sykmelding.aktivitetIkkeMulig434 && sykmelding.aktivitetIkkeMulig434.length) ||
    sykmelding.aarsakAktivitetIkkeMulig434);
    if (!visSeksjon) {
        return <span />;
    }
    return (<div className="sykmelding-seksjon">
                <h4 className="sykmelding-seksjonstittel">{getLedetekst('sykmelding.vis.mulighet.for.arbeid.tittel', ledetekster)}</h4>
                {
                    getSykmeldingOpplysning(sykmelding, 'startLegemeldtFravaer', getLedetekst('sykmelding.vis.mulighet.for.arbeid.start.legemeldt.fravaer.tittel', ledetekster), formatDate(sykmelding.startLegemeldtFravaer))
                }
                {
                    (sykmelding.aktivitetIkkeMulig433 && sykmelding.aktivitetIkkeMulig433.length) > 0 ?
                        <SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.mulighet.for.arbeid.pasient.ikke.i.arbeid.tittel', ledetekster)}>
                            <div>
                                {
                                    getSykmeldingCheckbox(sykmelding, 'aktivitetIkkeMulig433', getLedetekst('sykmelding.vis.mulighet.for.arbeid.medisinsk.tittel', ledetekster))
                                }
                                <Aarsaker aarsaker={sykmelding.aktivitetIkkeMulig433} containerClassName="js-aktivitetIkkeMulig433hvisJa" />
                            </div>
                        </SykmeldingOpplysning> : null
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'aarsakAktivitetIkkeMulig433', getLedetekst('sykmelding.vis.mulighet.for.arbeid.medisinsk.beskriv.tittel', ledetekster))
                }
                {
                    (sykmelding.aktivitetIkkeMulig434 && sykmelding.aktivitetIkkeMulig434.length > 0) ?
                    <SykmeldingOpplysning tittel={getLedetekst('sykmelding.vis.mulighet.for.arbeid.tittel', ledetekster)}>
                        <div>
                            {
                                getSykmeldingCheckbox(sykmelding, 'aktivitetIkkeMulig434', getLedetekst('sykmelding.vis.mulighet.for.arbeid.forhold.arbeidsplassen.tittel', ledetekster))
                            }
                            <Aarsaker aarsaker={sykmelding.aktivitetIkkeMulig434} containerClassName="js-aktivitetIkkeMulig434hvisJa" />
                        </div>
                    </SykmeldingOpplysning> : null
                }
                {
                    getSykmeldingOpplysning(sykmelding, 'aarsakAktivitetIkkeMulig434', getLedetekst('sykmelding.vis.mulighet.for.arbeid.forhold.arbeidsplassen.beskriv.tittel', ledetekster))
                }
		</div>);
};

MulighetForArbeid.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default MulighetForArbeid;
