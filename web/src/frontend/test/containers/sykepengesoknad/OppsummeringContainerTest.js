import chai from "chai";
import React from "react";
import {shallow} from "enzyme";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";
import OppsummeringContainer, {
    ConnectedOppsummering,
    Controller,
    mapStateToProps,
    Oppsummering
} from "../../../js/containers/sykepengesoknad/OppsummeringContainer";
import GenerellSoknadContainer from "../../../js/containers/sykepengesoknad/GenerellSoknadContainer";
import OppsummeringSkjema from "../../../js/components/sykepengesoknad/Oppsummering/OppsummeringSkjema";
import Kvittering from "../../../js/components/sykepengesoknad/Kvittering";
import StartIgjen from "../../../js/components/sykepengesoknad/StartIgjen";
import {getSoknad} from "../../mockSoknader";
import * as mapping from "../../../js/components/sykepengesoknad/mapSkjemasoknadToBackendsoknad";
import AppSpinner from "../../../js/components/AppSpinner";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("OppsummeringContainer", () => {

    let component;

    beforeEach(() => {
        component = shallow(<OppsummeringContainer />);
    });

    it("Skal inneholde en GenerellSoknadContainer med riktige props", () => {
        expect(component.find(GenerellSoknadContainer)).to.have.length(1);
        expect(component.find(GenerellSoknadContainer).prop("Component")).to.deep.equal(Controller);
        expect(component.find(GenerellSoknadContainer).prop("Brodsmuler")).to.be.defined;
    });

    describe("Controller", () => {

        let skjemasoknad;

        beforeEach(() => {
            skjemasoknad = {}
        });

        it("Skal vise StartIgjen hvis skjemasoknad ikke finnes", () => {
            const containerComponent = shallow(<Controller sykepengesoknad={getSoknad({})}/>)
            expect(containerComponent.find(StartIgjen)).to.have.length(1);
        });

        it("Skal vise Kvittering hvis søknad har status SENDT", () => {
            const sykepengesoknad = getSoknad({
                status: "SENDT",
            })
            const containerComponent = shallow(<Controller sykepengesoknad={sykepengesoknad}
                                                           skjemasoknad={skjemasoknad}/>)
            expect(containerComponent.find(Kvittering)).to.have.length(1);
            expect(containerComponent.find(ConnectedOppsummering)).to.have.length(0);
        });

        it("Skal vise ConnectedOppsummering hvis søknad har status = NY", () => {
            const sykepengesoknad = getSoknad({
                status: "NY",
            });
            const containerComponent = shallow(<Controller sykepengesoknad={sykepengesoknad}
                                                           skjemasoknad={skjemasoknad}/>)
            expect(containerComponent.find(Kvittering)).to.have.length(0);
            expect(containerComponent.find(ConnectedOppsummering)).to.have.length(1);
        });


    });

    describe("mapStateToProps", () => {

        let state;
        let ownProps;
        let backendsoknad;
        let stub;

        beforeEach(() => {
            state = {
                formMeta: {},
                ledere: {
                    data: [{
                        orgnummer: '871635382',
                        arbeidsgiverForskuttererLoenn: null,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {},
                    henter: false,
                    hentingFeilet: false,
                }
            };
            ownProps = {
                skjemasoknad: {
                    arbeidsgiver: {
                        orgnummer: '871635382',
                    },
                }
            };
            backendsoknad = {"backendsoknad": "backendsoknad"};
            stub = sinon.stub(mapping, "default").returns(backendsoknad)
        });

        afterEach(() => {
            stub.restore();
        })

        it("Returnerer visForskutteringssporsmal om leder ikke har svart og utenforperiode periode", () => {
            state = Object.assign(state, {
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: true,
                    },
                    henter: false,
                    hentingFeilet: false,
                }
            });
            expect(mapStateToProps(state, ownProps).visForskutteringssporsmal).to.be.true;
        });

        it("Returnerer ikke visForskutteringssporsmal om leder ikke har svart og innenfor periode", () => {
            state = Object.assign(state, {
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: false,
                    },
                    henter: false,
                    hentingFeilet: false,
                }
            });
            expect(mapStateToProps(state, ownProps).visForskutteringssporsmal).to.be.false;
        });

        it("Returnerer ikke visForskutteringssporsmal om leder har svart og utenforperiode periode", () => {
            state = Object.assign(state, {
                ledere: {
                    data: [{
                        orgnummer: '871635382',
                        arbeidsgiverForskuttererLoenn: true,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: true,
                    },
                    henter: false,
                    hentingFeilet: false,
                }
            });
            expect(mapStateToProps(state, ownProps).visForskutteringssporsmal).to.be.false;
        });

        it("Returnerer ikke visForskutteringssporsmal om leder har svart og innenfor periode", () => {
            state = Object.assign(state, {
                ledere: {
                    data: [{
                        orgnummer: '871635382',
                        arbeidsgiverForskuttererLoenn: false,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: false,
                    },
                    henter: false,
                    hentingFeilet: false,
                }
            });
            expect(mapStateToProps(state, ownProps).visForskutteringssporsmal).to.be.false;
        });

        it("Returnerer visForskutteringssporsmal om leder mangler og utenfor periode", () => {
            state = Object.assign(state, {
                ledere: {
                    data: [],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: true,
                    },
                    henter: false,
                    hentingFeilet: false,
                }
            });
            expect(mapStateToProps(state, ownProps).visForskutteringssporsmal).to.be.true;
        });

        it("Skal returnere backendsoknad", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.backendsoknad).to.deep.equal(backendsoknad);
        });

        it("NAV er mottaker om arbeidsgiverperioden er over 16 dager og hverken leder eller bruker har svart Ja paa forskuttering", () => {
            state = Object.assign(state, {
                ledere: {
                    data: [{
                        orgnummer: '871635382',
                        arbeidsgiverForskuttererLoenn: null,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: true,
                    },
                }
            });
            ownProps = {
                skjemasoknad: {
                    arbeidsgiver: {
                        orgnummer: '871635382',
                    },
                    arbeidsgiverForskutterer: null,
                }
            };
            expect(mapStateToProps(state, ownProps).sendesTil).to.equal('NAV');
        })

        it("NAV er mottaker om arbeidsgiverperioden er over 16 dager, leder ikke svart, bruker svart nei", () => {
            state = Object.assign(state, {
                ledere: {
                    data: [{
                        orgnummer: '871635382',
                        arbeidsgiverForskuttererLoenn: null,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: true,
                    },
                }
            });
            ownProps = {
                skjemasoknad: {
                    arbeidsgiver: {
                        orgnummer: '871635382',
                    },
                    arbeidsgiverForskutterer: 'NEI',
                }
            };
            expect(mapStateToProps(state, ownProps).sendesTil).to.equal('NAV');
        })

        it("Arbeidsgiver er mottaker om arbeidsgiverperioden er under 16 dager, leder ikke svart, bruker ikke svart", () => {
            state = Object.assign(state, {
                ledere: {
                    data: [{
                        orgnummer: '871635382',
                        arbeidsgiverForskuttererLoenn: null,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: false,
                    },
                }
            });
            ownProps = {
                skjemasoknad: {
                    arbeidsgiver: {
                        orgnummer: '871635382',
                    },
                    arbeidsgiverForskutterer: null,
                }
            };
            expect(mapStateToProps(state, ownProps).sendesTil).to.equal('ARBEIDSGIVER');
        })

        it("Arbeidsgiver er mottaker om arbeidsgiverperioden er under 16 dager, leder svart ja, bruker ikke svart", () => {
            state = Object.assign(state, {
                ledere: {
                    data: [{
                        orgnummer: '871635382',
                        arbeidsgiverForskuttererLoenn: true,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: false,
                    },
                }
            });
            ownProps = {
                skjemasoknad: {
                    arbeidsgiver: {
                        orgnummer: '871635382',
                    },
                    arbeidsgiverForskutterer: null,
                }
            };
            expect(mapStateToProps(state, ownProps).sendesTil).to.equal('ARBEIDSGIVER');
        })

        it("Arbeidsgiver er mottaker om arbeidsgiverperioden er under 16 dager, leder ikke svart, bruker svart VET_IKKE", () => {
            state = Object.assign(state, {
                ledere: {
                    data: [{
                        orgnummer: '871635382',
                        arbeidsgiverForskuttererLoenn: null,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: false,
                    },
                }
            });
            ownProps = {
                skjemasoknad: {
                    arbeidsgiver: {
                        orgnummer: '871635382',
                    },
                    arbeidsgiverForskutterer: 'VET_IKKE',
                }
            };
            expect(mapStateToProps(state, ownProps).sendesTil).to.equal('ARBEIDSGIVER');
        })

        it("Arbeidsgiver og NAV er mottaker om arbeidsgiverperioden er over 16 dager, leder ikke svart, bruker svart VET_IKKE", () => {
            state = Object.assign(state, {
                ledere: {
                    data: [{
                        orgnummer: '871635382',
                        arbeidsgiverForskuttererLoenn: null,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
                arbeidsgiverperiodeberegning: {
                    data: {
                        erUtenforArbeidsgiverperiode: true,
                    },
                }
            });
            ownProps = {
                skjemasoknad: {
                    arbeidsgiver: {
                        orgnummer: '871635382',
                    },
                    arbeidsgiverForskutterer: 'VET_IKKE',
                }
            };
            expect(mapStateToProps(state, ownProps).sendesTil).to.equal('NAV_OG_ARBEIDSGIVER');
        })
});

describe("Oppsummering", () => {

    let sjekkSkalViseForskutteringssporsmal;
    let backendsoknad;

    beforeEach(() => {
        hentArbeidsgiverperiodeberegning = sinon.spy();
        hentLedere = sinon.spy();
        backendsoknad = {"backendsoknad": "backendsoknad"};
    });

    it("Skal kalle hentArbeidsgiverperiodeberegning", () => {
        const component = shallow(<Oppsummering
            hentArbeidsgiverperiodeberegning={hentArbeidsgiverperiodeberegning}
            hentLedere={hentLedere}
            backendsoknad={backendsoknad}/>);
        expect(hentArbeidsgiverperiodeberegning.calledWith(backendsoknad)).to.be.true;
    });

    it("Skal kalle hentLedere", () => {
        const component = shallow(<Oppsummering
            hentLedere={hentLedere}
            hentArbeidsgiverperiodeberegning={hentArbeidsgiverperiodeberegning}
            backendsoknad={backendsoknad}/>);
        expect(hentLedere.calledWith()).to.be.true;
    });

    it("Skal rendre AppSpinner hvis henter arbeidsgiverperiodeberegning = true", () => {
        const component = shallow(<Oppsummering
            henterArbeidsgiverperiodeberegning={true}
            hentLedere={hentLedere}
            hentArbeidsgiverperiodeberegning={hentArbeidsgiverperiodeberegning}
            backendsoknad={backendsoknad}/>);
        expect(component.find(AppSpinner)).to.have.length(1);
    });

    it("Skal rendre AppSpinner hvis henter ledere = true", () => {
        const component = shallow(<Oppsummering
            henterLedere={true}
            hentLedere={hentLedere}
            hentArbeidsgiverperiodeberegning={hentArbeidsgiverperiodeberegning}
            backendsoknad={backendsoknad}/>);
        expect(component.find(AppSpinner)).to.have.length(1);
    });

    it("Skal rendre OppsummeringSkjema hvis arbeidsgiverperiodeberegning = false og hentLedere = false", () => {
        const component = shallow(<Oppsummering
            henterLedere={false}
            henterArbeidsgiverperiodeberegning={false}
            hentLedere={hentLedere}
            hentArbeidsgiverperiodeberegning={hentArbeidsgiverperiodeberegning}
            backendsoknad={backendsoknad}/>);
        expect(component.find(OppsummeringSkjema)).to.have.length(1);
    });

});


})
;