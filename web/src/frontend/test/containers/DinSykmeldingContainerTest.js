import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";

chai.use(chaiEnzyme());
const expect = chai.expect;

import getSykmelding from "../mockSykmeldinger";
import { DinSykmldSide, mapStateToProps } from "../../js/containers/DinSykmeldingContainer";
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import DinSykmelding from '../../js/components/sykmelding/DinSykmelding';
import SykmeldingKvittering from '../../js/components/sykmelding/SykmeldingKvittering';
import DinSendteSykmelding from '../../js/components/sykmelding/DinSendteSykmelding';
import DinAvbrutteSykmelding from '../../js/components/sykmelding/DinAvbrutteSykmelding';
import DinBekreftedeSykmelding from '../../js/components/sykmelding/DinBekreftedeSykmelding';
import sinon from 'sinon';
import * as dineArbeidsgivereActions from '../../js/actions/dineArbeidsgivere_actions';
import * as arbeidsgiversSykmeldingerActions from '../../js/actions/arbeidsgiversSykmeldinger_actions';

let component;

describe("DinSykmeldingContainer", () => {

    let component; 
    let ownProps = {};
    let state; 
    let sykmeldinger;

    beforeEach(() => {

        sykmeldinger = [
            getSykmelding({
                id: 1,
                mulighetForArbeid: {
                    perioder: [{
                        fom: { year: 2016, monthValue: 2, dayOfMonth: 1 },
                        tom: { year: 2016, monthValue: 2, dayOfMonth: 6 },
                        grad: 67
                    }],
                }
            }), 
            getSykmelding({
                id: 2,
                mulighetForArbeid: {
                    perioder: [{
                        fom: { year: 2016, monthValue: 1, dayOfMonth: 1 },
                        tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
                        grad: 67
                    }],
                }
            }), 
            getSykmelding({
                id: 3,
                mulighetForArbeid: {
                    perioder: [{
                        fom: { year: 2016, monthValue: 3, dayOfMonth: 1 },
                        tom: { year: 2016, monthValue: 3, dayOfMonth: 10 },
                        grad: 67
                    }],
                }
            }),
            getSykmelding({
                id: 4,
                mulighetForArbeid: {
                    perioder: [{
                        fom: { year: 2016, monthValue: 3, dayOfMonth: 1 },
                        tom: { year: 2016, monthValue: 3, dayOfMonth: 20 },
                        grad: 67
                    }],
                }
            }),
            getSykmelding({
                id: 5,
                status: "GAMMEL",
                mulighetForArbeid: {
                    perioder: [{
                        fom: { year: 2016, monthValue: 3, dayOfMonth: 1 },
                        tom: { year: 2016, monthValue: 3, dayOfMonth: 20 },
                        grad: 67
                    }],
                }
            })
        ]

        state = {
            dineSykmeldinger: {
                data: sykmeldinger,
                hentingFeilet: false,
                henter: false
            },
            arbeidsgiversSykmeldinger: {
                data: [],
                hentingFeilet: false,
                henter: true,
            },
            ledetekster: {
                data: ledetekster,
                henter: true
            },
            brukerinfo: {
                bruker: {
                    data: {
                        strengtFortroligAdresse: false,
                    },
                }
            },
            arbeidsgivere: {
                data: [{
                    orgnummer: 12345678
                }]
            }
        };
        ownProps.params = {};
        ownProps.params.sykmeldingId = 3
    })

    describe("mapStateToProps", () => {

        it("Skal returnere sykmelding basert på ownProps.params.sykmeldingId", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.dinSykmelding).to.equal(sykmeldinger[2])
        });

        it("Skal returnere sykmeldingId basert på ownProps.params.sykmeldingId", () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmeldingId).to.equal(3);
        });        

        it("Skal returnere henter-flagget fra sykmeldinger", () => {
            state.dineSykmeldinger.henter = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.henter).to.equal(true);
        });

        it("Skal returnere hentingFeilet-flagget fra sykmeldinger", () => {
            state.dineSykmeldinger.hentingFeilet = true; 
            const res = mapStateToProps(state, ownProps);
            expect(res.hentingFeilet).to.equal(true);
        });

        it("Skal returnere ledetekster", () => {
            state.ledetekster = {
                data: ledetekster
            };
            const res = mapStateToProps(state, ownProps);
            expect(res.ledetekster).to.deep.equal(ledetekster);
        });

        describe("Dersom dinSykmelding.status === 'SENDT'", () => {

            beforeEach(() => {
                state.dineSykmeldinger.data.push({
                    id: 44,
                    status: "SENDT"
                });
                ownProps = {
                    params: {
                        sykmeldingId: 44
                    }
                };
            });

            it("Skal returnere arbeidsgiversSykmelding når arbeidsgiversSykmeldinger = []'", () => {
                state.arbeidsgiversSykmeldinger = {
                    data: [],
                    hentingFeilet: false,
                    henter: false,
                }
                const res = mapStateToProps(state, ownProps);
                expect(res.arbeidsgiversSykmelding).to.deep.equal(undefined);
            });

            it("Skal returnere arbeidsgiversSykmelding når arbeidsgiversSykmeldinger = [{...}]'", () => {
                state.arbeidsgiversSykmeldinger = {
                    data: [{
                        id: 44, 
                        fornavn: "Hans",
                        etternavn: "Olsen"
                    }],
                    hentingFeilet: false, 
                    henter: false,
                }
                const res = mapStateToProps(state, ownProps);
                expect(res.arbeidsgiversSykmelding).to.deep.equal({
                    id: 44, 
                    fornavn: "Hans",
                    etternavn: "Olsen"
                });
            });            

        })


        describe("visEldreSykmeldingVarsel", () => {

            it("Skal returnere visEldreSykmeldingVarsel === true dersom den valgte sykmeldingen ikke er den eldste", () => {
                ownProps.params.sykmeldingId = 3
                const res = mapStateToProps(state, ownProps);
                expect(res.visEldreSykmeldingVarsel).to.be.true;
            });

            it("Skal returnere visEldreSykmeldingVarsel === false dersom den valgte sykmeldingen er den eldste", () => {
                ownProps.params.sykmeldingId = 2;
                const res = mapStateToProps(state, ownProps);
                expect(res.visEldreSykmeldingVarsel).to.be.false;
            });

            it("Skal returnere eldsteSykmeldingId", () => {
                ownProps.params.sykmeldingId = 4;
                const res = mapStateToProps(state, ownProps);
                expect(res.eldsteSykmeldingId).to.equal(2);
            });

            it("Skal returnere false dersom den valgte sykmeldingen har samme periode som den eldste sykmeldingen", () => {
                state.dineSykmeldinger.data = [
                    getSykmelding({
                        id: 1,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 2, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 2, dayOfMonth: 6 },
                                grad: 100
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 2,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 2, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 2, dayOfMonth: 6 },
                                grad: 100
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 3,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 12, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 12, dayOfMonth: 6 },
                                grad: 100
                            }],
                        }
                    })
                ];
                ownProps.params.sykmeldingId = 2;
                const res = mapStateToProps(state, ownProps);
                expect(res.visEldreSykmeldingVarsel).to.equal(false);
            });

            it("Skal returnere true dersom den valgte sykmeldingen er ikke er eldst, men har samme varighet som den eldste sykmeldingen", () => {
                state.dineSykmeldinger.data = [
                    getSykmelding({
                        id: 1,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 2, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 2, dayOfMonth: 6 },
                                grad: 100
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 2,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 4, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 4, dayOfMonth: 6 },
                                grad: 100
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 3,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 3, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 3, dayOfMonth: 6 },
                                grad: 100
                            }],
                        }
                    })
                ];
                ownProps.params.sykmeldingId = 3;
                const res = mapStateToProps(state, ownProps);
                expect(res.visEldreSykmeldingVarsel).to.equal(true);
            });


            it("Skal returnere true dersom den valgte sykmeldingen er ikke er eldst, men har samme varighet som en annen sykmelding som heller ikke er eldst", () => {
                state.dineSykmeldinger.data = [
                    getSykmelding({
                        id: 1,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 2, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 2, dayOfMonth: 6 },
                                grad: 100
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 2,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 3, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 3, dayOfMonth: 6 },
                                grad: 100
                            }],
                        }
                    }),
                    getSykmelding({
                        id: 3,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: { year: 2016, monthValue: 3, dayOfMonth: 1 },
                                tom: { year: 2016, monthValue: 3, dayOfMonth: 6 },
                                grad: 100
                            }],
                        }
                    })
                ];
                ownProps.params.sykmeldingId = 3;
                const res = mapStateToProps(state, ownProps);
                expect(res.visEldreSykmeldingVarsel).to.equal(true);
            });

            it("Skal bare operere på sykmeldinger som har status === 'NY'", () => {
                state.dineSykmeldinger.data = [{"id":"14378526519","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"AVBRUTT","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":{"monthValue":10,"dayOfYear":277,"dayOfWeek":"MONDAY","dayOfMonth":3,"nano":0,"year":2016,"month":"OCTOBER","hour":10,"minute":53,"second":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"49577056144","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"NY","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":null,"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"52605499554","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"BEKREFTET","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":"NAERINGSDRIVENDE","orgnummer":null,"sendtdato":{"monthValue":10,"dayOfYear":284,"dayOfWeek":"MONDAY","dayOfMonth":10,"nano":0,"year":2016,"month":"OCTOBER","hour":14,"minute":9,"second":47,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"1609301308ande86404.1","startLegemeldtFravaer":{"year":2016,"month":"AUGUST","monthValue":8,"era":"CE","dayOfYear":238,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":25,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"AUGUST","monthValue":8,"era":"CE","dayOfYear":238,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":25,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"SENDT","innsendtArbeidsgivernavn":"TEKNOLOGISK INSTITUTT AS, AVD KONGSBERG","valgtArbeidssituasjon":null,"orgnummer":"975046575","sendtdato":{"monthValue":10,"dayOfYear":278,"dayOfWeek":"TUESDAY","dayOfMonth":4,"nano":0,"year":2016,"month":"OCTOBER","hour":13,"minute":16,"second":57,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Clitory","etternavn":"Hilton"},"arbeidsgiver":"BÆRUM SYKEHUS","diagnose":{"hoveddiagnose":{"diagnose":"HOFTE SYMPTOMER/PLAGER","diagnosekode":"L13","diagnosesystem":"ICPC-2"},"bidiagnoser":[],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":null,"svangerskap":null,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"AUGUST","monthValue":8,"era":"CE","dayOfYear":225,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":12,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":269,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":25,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"OCTOBER","monthValue":10,"era":"CE","dayOfYear":275,"dayOfWeek":"SATURDAY","leapYear":true,"dayOfMonth":1,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["NA-5"],"aktivitetIkkeMulig434":[],"aarsakAktivitetIkkeMulig433":"aktivitet vil forverre helsetilstanden","aarsakAktivitetIkkeMulig434":null},"friskmelding":{"arbeidsfoerEtterPerioden":null,"hensynPaaArbeidsplassen":null,"antarReturSammeArbeidsgiver":false,"antattDatoReturSammeArbeidsgiver":null,"antarReturAnnenArbeidsgiver":false,"tilbakemeldingReturArbeid":null,"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Rullestol","tiltakNAV":null,"tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"AUGUST","monthValue":8,"era":"CE","dayOfYear":229,"dayOfWeek":"TUESDAY","leapYear":true,"dayOfMonth":16,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Trump Dr Tonald","sykmelderTlf":"67154180"}},{"id":"31101845023","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"AVBRUTT","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":"NAERINGSDRIVENDE","orgnummer":null,"sendtdato":{"monthValue":10,"dayOfYear":277,"dayOfWeek":"MONDAY","dayOfMonth":3,"nano":0,"year":2016,"month":"OCTOBER","hour":12,"minute":24,"second":25,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"syfotest26082016_4_9_15","startLegemeldtFravaer":{"year":2016,"month":"AUGUST","monthValue":8,"era":"CE","dayOfYear":238,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":25,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"AUGUST","monthValue":8,"era":"CE","dayOfYear":238,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":25,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"AVBRUTT","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":{"monthValue":9,"dayOfYear":274,"dayOfWeek":"FRIDAY","dayOfMonth":30,"nano":0,"year":2016,"month":"SEPTEMBER","hour":14,"minute":58,"second":3,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Clitory","etternavn":"Hilton"},"arbeidsgiver":"BÆRUM SYKEHUS","diagnose":{"hoveddiagnose":{"diagnose":"HOFTE SYMPTOMER/PLAGER","diagnosekode":"L13","diagnosesystem":"ICPC-2"},"bidiagnoser":[],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":null,"svangerskap":null,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"AUGUST","monthValue":8,"era":"CE","dayOfYear":225,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":12,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"AUGUST","monthValue":8,"era":"CE","dayOfYear":238,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":25,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":245,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":1,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["NA-5"],"aktivitetIkkeMulig434":[],"aarsakAktivitetIkkeMulig433":"aktivitet vil forverre helsetilstanden","aarsakAktivitetIkkeMulig434":null},"friskmelding":{"arbeidsfoerEtterPerioden":null,"hensynPaaArbeidsplassen":null,"antarReturSammeArbeidsgiver":false,"antattDatoReturSammeArbeidsgiver":null,"antarReturAnnenArbeidsgiver":false,"tilbakemeldingReturArbeid":null,"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Rullestol","tiltakNAV":null,"tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"AUGUST","monthValue":8,"era":"CE","dayOfYear":229,"dayOfWeek":"TUESDAY","leapYear":true,"dayOfMonth":16,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Trump Dr Tonald","sykmelderTlf":"67154180"}},{"id":"69173978475","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"SENDT","innsendtArbeidsgivernavn":"TEKNOLOGISK INSTITUTT AS, AVD KONGSBERG","valgtArbeidssituasjon":null,"orgnummer":"975046575","sendtdato":{"monthValue":10,"dayOfYear":278,"dayOfWeek":"TUESDAY","dayOfMonth":4,"nano":0,"year":2016,"month":"OCTOBER","hour":13,"minute":20,"second":52,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"7235156529","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"AVBRUTT","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":{"monthValue":10,"dayOfYear":277,"dayOfWeek":"MONDAY","dayOfMonth":3,"nano":0,"year":2016,"month":"OCTOBER","hour":14,"minute":11,"second":51,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"38003934171","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"AVBRUTT","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":{"monthValue":10,"dayOfYear":277,"dayOfWeek":"MONDAY","dayOfMonth":3,"nano":0,"year":2016,"month":"OCTOBER","hour":9,"minute":42,"second":54,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"19309487843","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"NY","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":null,"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"olaTester2","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"NY","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":null,"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":198,"dayOfWeek":"SATURDAY","leapYear":true,"dayOfMonth":16,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"30834537479","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"SENDT","innsendtArbeidsgivernavn":"TEKNOLOGISK INSTITUTT AS, AVD KONGSBERG","valgtArbeidssituasjon":null,"orgnummer":"975046575","sendtdato":{"monthValue":9,"dayOfYear":273,"dayOfWeek":"THURSDAY","dayOfMonth":29,"nano":0,"year":2016,"month":"SEPTEMBER","hour":10,"minute":26,"second":42,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"69595481708janm","startLegemeldtFravaer":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":259,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":259,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"SENDT","innsendtArbeidsgivernavn":"TEKNOLOGISK INSTITUTT AS, AVD KONGSBERG","valgtArbeidssituasjon":null,"orgnummer":"975046575","sendtdato":{"monthValue":9,"dayOfYear":265,"dayOfWeek":"WEDNESDAY","dayOfMonth":21,"nano":0,"year":2016,"month":"SEPTEMBER","hour":16,"minute":8,"second":45,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":259,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":259,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":273,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":29,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":259,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":259,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"SEPTEMBER","monthValue":9,"era":"CE","dayOfYear":259,"dayOfWeek":"THURSDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"olaTester1","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"NY","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":null,"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":198,"dayOfWeek":"SATURDAY","leapYear":true,"dayOfMonth":16,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":192,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":10,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"36858507612","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"NY","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":null,"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"syfotest21092016_autotest_5883","startLegemeldtFravaer":{"year":2016,"month":"MAY","monthValue":5,"era":"CE","dayOfYear":129,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":8,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"MAY","monthValue":5,"era":"CE","dayOfYear":129,"dayOfWeek":"SUNDAY","leapYear":true,"dayOfMonth":8,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"BEKREFTET","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":"NAERINGSDRIVENDE","orgnummer":null,"sendtdato":{"monthValue":9,"dayOfYear":267,"dayOfWeek":"FRIDAY","dayOfMonth":23,"nano":0,"year":2016,"month":"SEPTEMBER","hour":14,"minute":11,"second":54,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"FRIDA","etternavn":"FROSK"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":"Annet","fravaerBeskrivelse":"Medisinsk Ã¥rsak i kategorien \"annet\"","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"APRIL","monthValue":4,"era":"CE","dayOfYear":118,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":27,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":190,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":8,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"Andre Ã¥rsaker til sykefravÃ¦r.","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r."},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"MAY","monthValue":5,"era":"CE","dayOfYear":137,"dayOfWeek":"MONDAY","leapYear":true,"dayOfMonth":16,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"MAY","monthValue":5,"era":"CE","dayOfYear":123,"dayOfWeek":"MONDAY","leapYear":true,"dayOfMonth":2,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. DEt er nylig tatt MR bildet som vier forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. Avhenger av funksjon og vurdering hos spesialist i ortopedi.","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"MAY","monthValue":5,"era":"CE","dayOfYear":124,"dayOfWeek":"TUESDAY","leapYear":true,"dayOfMonth":3,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Victor Frankenstein","sykmelderTlf":"67151410"}},{"id":"LillianTest1","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"BEKREFTET","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":"FRILANSER","orgnummer":null,"sendtdato":{"monthValue":9,"dayOfYear":267,"dayOfWeek":"FRIDAY","dayOfMonth":23,"nano":0,"year":2016,"month":"SEPTEMBER","hour":14,"minute":23,"second":19,"chronology":{"calendarType":"iso8601","id":"ISO"}},"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"9558284772","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"NY","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":null,"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}},{"id":"55701825450","startLegemeldtFravaer":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"skalViseSkravertFelt":true,"identdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"status":"NY","innsendtArbeidsgivernavn":null,"valgtArbeidssituasjon":null,"orgnummer":null,"sendtdato":null,"pasient":{"fnr":"***REMOVED***","fornavn":"Frida","etternavn":"Frost"},"arbeidsgiver":"LOMMEN BARNEHAVE","diagnose":{"hoveddiagnose":{"diagnose":"TENDINITT INA","diagnosekode":"L87","diagnosesystem":"ICPC-2"},"bidiagnoser":[{"diagnose":"GANGLION SENE","diagnosekode":"L87","diagnosesystem":"ICPC-2"}],"fravaersgrunnLovfestet":null,"fravaerBeskrivelse":"Medising Ã¥rsak i kategorien annet","svangerskap":true,"yrkesskade":true,"yrkesskadeDato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}}},"mulighetForArbeid":{"perioder":[{"fom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"tom":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":202,"dayOfWeek":"WEDNESDAY","leapYear":true,"dayOfMonth":20,"chronology":{"calendarType":"iso8601","id":"ISO"}},"grad":100,"behandlingsdager":null,"reisetilskudd":null,"avventende":null}],"aktivitetIkkeMulig433":["Annet"],"aktivitetIkkeMulig434":["Annet"],"aarsakAktivitetIkkeMulig433":"andre Ã¥rsaker til sykefravÃ¦r","aarsakAktivitetIkkeMulig434":"andre Ã¥rsaker til sykefravÃ¦r"},"friskmelding":{"arbeidsfoerEtterPerioden":true,"hensynPaaArbeidsplassen":"MÃ¥ ta det pent","antarReturSammeArbeidsgiver":true,"antattDatoReturSammeArbeidsgiver":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"antarReturAnnenArbeidsgiver":true,"tilbakemeldingReturArbeid":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"utenArbeidsgiverAntarTilbakeIArbeid":false,"utenArbeidsgiverAntarTilbakeIArbeidDato":null,"utenArbeidsgiverTilbakemelding":null},"utdypendeOpplysninger":{"sykehistorie":null,"paavirkningArbeidsevne":null,"resultatAvBehandling":null,"henvisningUtredningBehandling":null},"arbeidsevne":{"tilretteleggingArbeidsplass":"Fortsett som sist.","tiltakNAV":"Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hÃ¥nd som mulig mÃ¥ opereres. Venter pÃ¥ time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ","tiltakAndre":null},"meldingTilNav":{"navBoerTaTakISaken":false,"navBoerTaTakISakenBegrunnelse":null},"innspillTilArbeidsgiver":null,"tilbakedatering":{"dokumenterbarPasientkontakt":null,"tilbakedatertBegrunnelse":null},"bekreftelse":{"utstedelsesdato":{"year":2016,"month":"JULY","monthValue":7,"era":"CE","dayOfYear":197,"dayOfWeek":"FRIDAY","leapYear":true,"dayOfMonth":15,"chronology":{"calendarType":"iso8601","id":"ISO"}},"sykmelder":"Frida Frost","sykmelderTlf":"94431152"}}];                
                ownProps.params.sykmeldingId = "olaTester2";
                const res = mapStateToProps(state, ownProps);
                expect(res.visEldreSykmeldingVarsel).to.equal(false);
            });

        });

    });

    describe("DinSykmldSide", () => {

        let dispatch;
        let sykmelding; 

        beforeEach(() => {
            dispatch = sinon.spy(); 
            sykmelding = {
                status: 'NY'
            };
        });

        it("Skal vise AppSpinner når siden laster", () => {
            let component = shallow(<DinSykmldSide henter={true} dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(AppSpinner)).to.have.length(1);
        }); 

        it("Skal vise Feilmelding når siden laster", () => {
            let component = shallow(<DinSykmldSide hentingFeilet={true} dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it("Skal vise feilmelding dersom sykmeldingen ikke finnes", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: undefined
            };
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal vise sykmelding dersom den finnes", () => {
            let sykmelding = sykmeldinger[1];
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(DinSykmelding)).to.have.length(1);
        });

        it("Skal vise DinSendteSykmelding dersom sykmeldingen har status === 'SENDT'", () => {
            let sykmelding = {
                status: 'SENDT'
            }
            let arbeidsgiversSykmelding = {
                data: {}
            }
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(DinSendteSykmelding)).to.have.length(1);
        });

        it("Skal vise DinAvbrutteSykmelding dersom sykmeldingen har status === 'AVBRUTT'", () => {
            let sykmelding = {
                status: "AVBRUTT",
            }
            let arbeidsgiversSykmelding = {
                data: {}
            }
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(DinAvbrutteSykmelding)).to.have.length(1);
        });

        it("Skal vise DinBekreftedeSykmelding dersom sykmeldingen har status === 'BEKREFTET'", () => {
            let sykmelding = {
                status: "BEKREFTET",
            }
            let arbeidsgiversSykmelding = {
                data: {}
            }
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.find(DinBekreftedeSykmelding)).to.have.length(1);
        });

        it("Skal vise DinBekreftedeSykmelding med arbeidsgivers sykmelding dersom sykmeldingen har status === 'BEKREFTET' og valgtArbeidssituasjon === 'ARBEIDSTAKER'", () => {
            let sykmelding = {
                status: "BEKREFTET",
                valgtArbeidssituasjon: 'ARBEIDSTAKER'
            }
            let arbeidsgiversSykmelding = {
                navn: "Olsen"
            }
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(component.contains(<DinBekreftedeSykmelding dinSykmelding={sykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={state.ledetekster.data} />)).to.be.true;
        }); 

        it("Skal hente aktuelle arbeidsgivere'", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: Object.assign({}, sykmeldinger[1], {
                    status: "NY"
                }),
            };
            let spy = sinon.spy(dineArbeidsgivereActions, "hentAktuelleArbeidsgivere");
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(dispatch.calledThrice).to.be.true;
            expect(spy.calledOnce).to.be.true;
            spy.restore();
        });

        it("Skal hente arbeidsgiversSykmeldinger", () => {
            let sykmelding = {
                hentingFeilet: false,
                data: Object.assign({}, sykmeldinger[1], {
                    status: "SENDT"
                }),
            };
            let spy = sinon.spy(arbeidsgiversSykmeldingerActions, "hentArbeidsgiversSykmeldinger");
            let component = shallow(<DinSykmldSide dinSykmelding={sykmelding} ledetekster={state.ledetekster.data} dispatch={dispatch} />)
            expect(dispatch.calledThrice).to.be.true;
            expect(spy.calledOnce).to.be.true;
            spy.restore();
        });



    });

}); 