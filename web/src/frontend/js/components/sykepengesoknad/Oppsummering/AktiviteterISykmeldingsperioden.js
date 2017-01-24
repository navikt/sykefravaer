import React, { PropTypes } from 'react';
import { Avkrysset } from './opplysninger';
import { toDatePrettyPrint } from 'digisyfo-npm';
import { inntektskildeLabels } from '../AktiviteterISykmeldingsperioden/AndreInntektskilder';

export const GjennomsnittligJobbing = ({ periode }) => {
    return (<div>
        <h4 className="oppsummering__sporsmal">Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos SOLSTRÅLEN BARNEHAGE?</h4>
        <p>{periode.gjennomsnittPerUke.antall} {periode.gjennomsnittPerUke.enhet} totalt per uke</p>
    </div>);
};

GjennomsnittligJobbing.propTypes = {
    periode: PropTypes.object,
};

export const NormalJobbing = ({ periode }) => {
    return (<div>
        <h4 className="oppsummering__sporsmal">Hvor mange timer jobber du normalt per uke?</h4>
        <p>{periode.gjennomsnittPerUke.normaltAntall} timer</p>
    </div>);
};

NormalJobbing.propTypes = {
    periode: PropTypes.object,
};

export const GradertPeriode = ({ soknadPeriode, sykmeldingPeriode }) => {
    return (<div className="oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">I perioden {toDatePrettyPrint(sykmeldingPeriode.fom)} - {toDatePrettyPrint(sykmeldingPeriode.tom)} skulle du jobbe {sykmeldingPeriode.grad} % av din normale arbeidstid hos SOLSTRÅLEN BARNEHAGE.</h3>
        <h4 className="oppsummering__sporsmal">Har du jobbet mer enn dette?</h4>
        <Avkrysset tekst={soknadPeriode.jobbetMerEnnPlanlagt ? 'Ja' : 'Nei'} />
        {
            soknadPeriode.jobbetMerEnnPlanlagt && <GjennomsnittligJobbing periode={soknadPeriode} />
        }
        {
            soknadPeriode.jobbetMerEnnPlanlagt && <NormalJobbing periode={soknadPeriode} />
        }
    </div>);
};

GradertPeriode.propTypes = {
    soknadPeriode: PropTypes.object,
    sykmeldingPeriode: PropTypes.object,
};

export const Periode = ({ soknadPeriode, sykmeldingPeriode }) => {
    return (<div className="oppsummering__bolk">
        <h3 className="oppsummering__sporsmal">I perioden {toDatePrettyPrint(sykmeldingPeriode.fom)} - {toDatePrettyPrint(sykmeldingPeriode.tom)} var du 100 % sykmeldt fra SOLSTRÅLEN BARNEHAGE.</h3>
        <h4 className="oppsummering__sporsmal">Har du jobbet noe?</h4>
        <Avkrysset tekst={soknadPeriode.jobbetMerEnnPlanlagt ? 'Ja' : 'Nei'} />
        {
            soknadPeriode.jobbetMerEnnPlanlagt && <GjennomsnittligJobbing periode={soknadPeriode} />
        }
    </div>);
};

Periode.propTypes = {
    soknadPeriode: PropTypes.object,
    sykmeldingPeriode: PropTypes.object,
};

const getInntektskilder = (inntektskilder) => {
    const arr = [];
    for (const kilde in inntektskilder) {
        if (inntektskilder[kilde].avkrysset) {
            arr.push({
                type: kilde,
                sykmeldt: inntektskilder[kilde].sykmeldt,
            });
        }
    }
    return arr;
};

const AndreInntektskilder = ({ inntektskilder }) => {
    return (<div className="oppsummering__bolk">
        {
            inntektskilder.map((k, index) => {
                return (<div key={index}>
                    <Avkrysset tekst={inntektskildeLabels[k.type]} />
                    {
                        k.type !== 'annet' && <div className="js-inntektskilde-sykmeldt oppsummering__tilleggssvar">
                            <h5 className="oppsummering__sporsmal">Er du sykmeldt fra dette?</h5>
                            <Avkrysset tekst={k.sykmeldt ? 'Ja' : 'Nei'} />
                        </div>
                    }
                </div>);
            })
        }
    </div>);
};

AndreInntektskilder.propTypes = {
    inntektskilder: PropTypes.array,
};

export const Inntektskilder = ({ soknad }) => {
    return (<div>
        <h3 className="oppsummering__sporsmal">Har du andre inntektskilder enn SOLSTRÅLEN BARNEHAGE?</h3>
        <Avkrysset tekst={soknad.harAndreInntektskilder ? 'Ja' : 'Nei'} />
        {
            soknad.harAndreInntektskilder && <h4 className="oppsummering__sporsmal">Hvilke inntektskilder har du?</h4>
        }
        {
            soknad.harAndreInntektskilder && <AndreInntektskilder inntektskilder={getInntektskilder(soknad.andreInntektskilder)} />
        }
    </div>);
};

Inntektskilder.propTypes = {
    soknad: PropTypes.object,
};

export const Utdanning = ({ soknad }) => {
    return (<div>
        <h3 className="oppsummering__sporsmal">Har du vært under utdanning i løpet av perioden 01.01.2017 - 31.01.2017?</h3>
        <Avkrysset tekst={soknad.underUtdanning ? 'Ja' : 'Nei'} />
        {
            soknad.underUtdanning && (<div className="js-utdanning-fulltid">
                <h3 className="oppsummering__sporsmal">Er utdanningen et fulltidsstudium?</h3>
                <Avkrysset tekst={soknad.erUtdanningFulltidsstudium ? 'Ja' : 'Nei'} />
            </div>)
        }
        {
            soknad.underUtdanning && (<div className="js-utdanning-start">
                <h3 className="oppsummering__sporsmal">Når startet du på utdanningen?</h3>
                <p>Den {soknad.utdanningStartdato}</p>
            </div>)
        }
    </div>);
};

Utdanning.propTypes = {
    soknad: PropTypes.object,
};

export const Perioder = ({ soknad, sykmelding }) => {
    return (<div>
        {sykmelding.mulighetForArbeid.perioder.map((periode, index) => {
            if (periode.grad < 100) {
                return <GradertPeriode soknadPeriode={soknad.perioder[index]} sykmeldingPeriode={periode} key={index} />;
            }
            return <Periode soknadPeriode={soknad.perioder[index]} sykmeldingPeriode={periode} key={index} />;
        })}
    </div>);
};

Perioder.propTypes = {
    soknad: PropTypes.object,
    sykmelding: PropTypes.object,
};

const AktiviteterISykmeldingsperioden = ({ soknad, sykmelding }) => {
    return (<div>
        <Perioder soknad={soknad} sykmelding={sykmelding} />
        <Inntektskilder soknad={soknad} />
        <Utdanning soknad={soknad} />
    </div>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    soknad: PropTypes.object,
    sykmelding: PropTypes.object,
};

export default AktiviteterISykmeldingsperioden;
