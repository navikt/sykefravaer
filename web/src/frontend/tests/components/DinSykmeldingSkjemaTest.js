import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DinSykmeldingSkjema from "../../js/components/sykmelding/DinSykmeldingSkjema";
import StrengtFortroligInfo from "../../js/components/sykmelding/StrengtFortroligInfo";
import VelgArbeidssituasjonContainer from "../../js/containers/VelgArbeidssituasjonContainer";
import DineSykmeldingOpplysninger from "../../js/components/sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import VelgArbeidsgiverContainer from "../../js/containers/VelgArbeidsgiverContainer";
import ArbeidsgiversSykmeldingContainer from "../../js/containers/ArbeidsgiversSykmeldingContainer";
import Varselstripe from "../../js/components/Varselstripe";

import { Provider } from 'react-redux';

describe("DinSykmeldingSkjema", () => {

    let component;

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    let store;
    let state;
    let brukerinfo;

    beforeEach(() => {
        getState = {
            ledetekster: { 
                data: ledetekster,
            },
            arbeidsgiversSykmeldinger: {
                data: [getSykmelding({id: "123"})]
            },
            arbeidsgivere: {
                data: [],
            },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
        };
        store = mockStore(getState);
        brukerinfo = {
            strengtFortroligAdresse: false,
        };
    });


    it("Skal vise VelgArbeidssituasjonContainer", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding()} />);
        expect(component.find(VelgArbeidssituasjonContainer)).to.have.length(1);
    });

    it("Skal ikke vise VelgArbeidsgiverContainer dersom arbeidssituasjon === undefined", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding()} />);
        expect(component.find(VelgArbeidsgiverContainer)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal ikke vise VelgArbeidsgiverContainer arbeidssituasjon === 'arbeidsledig'", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding({
                    'arbeidssituasjon': 'arbeidsledig'
                })} />);
        expect(component.find(VelgArbeidsgiverContainer)).to.have.length(0);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(0);
    });

    it("Skal vise VelgArbeidsgiverContainer og ArbeidsgiversSykmeldingContainer dersom arbeidssituasjon === 'arbeidstaker'", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding({
                        arbeidssituasjon: 'arbeidstaker',
                    })} />);
        expect(component.find(VelgArbeidsgiverContainer)).to.have.length(1);
        expect(component.find(ArbeidsgiversSykmeldingContainer)).to.have.length(1);
    });

    it("Skal sende egen state videre til VelgArbeidssituasjonContainer", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        component.setState({
            forsoktBekreftet: true,
        });
        expect(component.find(VelgArbeidssituasjonContainer).prop("erFeil")).to.be.true;
    });

    it("Skal sende egen state videre til VelgArbeidsgiverContainer", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding({
            arbeidssituasjon: "arbeidstaker"
        })} ledetekster={ledetekster}/>);
        expect(component.find(VelgArbeidsgiverContainer).prop("erFeil")).to.be.false;
    });

    it("Skal sende egen state videre til VelgArbeidsgiverContainer", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding({
            arbeidssituasjon: "arbeidstaker"
        })} ledetekster={ledetekster}/>);
        component.setState({"forsoktSendt": true});
        expect(component.find(VelgArbeidsgiverContainer).prop("erFeil")).to.be.true;
    });

    it("Skal vise info om utskrift dersom harStrengtFortroligAdresse = true", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding({
            arbeidssituasjon: "arbeidstaker"
        })} ledetekster={ledetekster} harStrengtFortroligAdresse={true} />);
        expect(component.find(StrengtFortroligInfo)).to.have.length(1);
    });

    it("Skal ikke vise info om utskrift dersom harStrengtFortroligAdresse = false", () => {
        component = shallow(<DinSykmeldingSkjema sykmelding={getSykmelding({
            arbeidssituasjon: "arbeidstaker"
        })} ledetekster={ledetekster} harStrengtFortroligAdresse={false} />);
        expect(component.find(StrengtFortroligInfo)).to.have.length(0);
    });    

    describe("Validering", () => {

        it("Setter forsoktBekreftet til true dersom man ikke har valgt arbeidssituasjon", function () {
            const sykmelding = getSykmelding();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            component.simulate('submit');
            expect(component.state('forsoktBekreftet')).to.be.true;
        });

        it("Setter forsoktSendt til true dersom man ikke har valgt arbeidsgiver", function () {
            const sykmelding = getSykmelding({
                arbeidssituasjon: 'arbeidstaker'
            });
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            component.simulate('submit');
            expect(component.state('forsoktSendt')).to.be.true;
        });

        it("Kaller på bekreft dersom man har valgt en arbeidssituasjon som _ikke_ er arbeidstaker", function () {
            const sykmelding = getSykmelding({
                arbeidssituasjon: 'frilanser'
            });
            const bekreftStub = sinon.stub(DinSykmeldingSkjema.prototype, "bekreft");
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            component.simulate('submit');
            expect(bekreftStub.calledOnce).to.be.true;
            bekreftStub.restore();
        });

        it("Kaller på send dersom arbeidssituasjon === arbeidstaker og valgtArbeidsgiver er satt", function () {
            const sykmelding = getSykmelding({
                arbeidssituasjon: 'arbeidstaker',
                valgtArbeidsgiver: {
                    navn: "Olsen pizza",
                    orgnummer: "2345"
                }
            });
            const sendStub = sinon.stub(DinSykmeldingSkjema.prototype, "send");
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            component.simulate('submit');
            expect(sendStub.calledOnce).to.be.true;
            expect(component.state("forsoktSendt")).to.be.true;
            expect(component.state("forsoktBekreftet")).to.be.false;
            sendStub.restore();
        });

        it("Setter forsoktSendt til true dersom valgtArbeidsgiver.orgnummer === '0'", () => {
            const sykmelding = getSykmelding({
                arbeidssituasjon: 'arbeidstaker',
                valgtArbeidsgiver: {
                    navn: "Annen arbeidsgiver",
                    orgnummer: "0"
                }
            });
            const sendStub = sinon.stub(DinSykmeldingSkjema.prototype, "send");
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            component.simulate("submit");
            expect(component.state("forsoktSendt")).to.be.true;
            sendStub.restore();
        });

        it("Setter forsoktSendt til true dersom valgtArbeidsgiver === undefined", () => {
            const sykmelding = getSykmelding({
                arbeidssituasjon: 'arbeidstaker',
            });
            const sendStub = sinon.stub(DinSykmeldingSkjema.prototype, "send");
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            component.simulate("submit");
            expect(component.state("forsoktSendt")).to.be.true;
            sendStub.restore();
        });
    });

    describe("Sending", () => {
        it("Går igjennom", function () {
            const sykmelding = getSykmelding({ 
                arbeidssituasjon: 'arbeidstaker', 
                valgtArbeidsgiver: {
                    orgnummer: "12345678",
                    navn: "Olsens Pizza AS"
                },
                id: "123",
            });
            const spy = () => {
                return {
                    then: (func) => {
                        func();
                    }
                };
            }
            var sendStub = sinon.stub(DinSykmeldingSkjema.prototype, "send");
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} sendSykmeldingTilArbeidsgiver={spy}/>);
            component.simulate('submit');
            expect(sendStub.calledOnce).to.be.true;
            sendStub.restore();
        });

        it("Skal vise spinner når det sendes", () => {
            const sykmelding = getSykmelding({ 
                arbeidssituasjon: 'arbeidstaker', 
                valgtArbeidsgiver: {
                    orgnummer: "12345678",
                    navn: "Olsens Pizza AS"
                },
                id: "123",
            });
            const spy = () => {
                return {
                    then: (func) => {
                        func();
                    }
                };
            }
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} sendSykmeldingTilArbeidsgiver={spy} sender={true} />);
            expect(component.find(".js-spinner")).to.have.length(1);
        })
    });

    describe("Tekst på knapp", () => {

        it("Er 'Bekreft sykmelding' dersom man velger 'selvstendig_naeringsdrivende',", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'selvstendig_naeringsdrivende' };
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

        it("Er 'Bekreft sykmelding' dersom man velger 'frilanser',", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'frilanser' };
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

        it("Er 'Bekreft sykmelding' dersom man velger 'annet',", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'annet' };
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

        it("Er 'Bekreft sykmelding' dersom man velger 'arbeidsledig',", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'arbeidsledig' };
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

        it("Er 'Send sykmelding' dersom man velger 'arbeidstaker',", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'arbeidstaker' };
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} />);
            expect(component.find(".js-submit").text()).to.equal("Send sykmelding")
        });

        it("Er 'Bekreft sykmelding' dersom man har strengt fortrolig adresse", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'arbeidstaker' };
            const spy = sinon.spy();
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding} harStrengtFortroligAdresse={true} />);
            expect(component.find(".js-submit").text()).to.equal("Bekreft sykmelding")
        });

    }); 

    describe("Bekreft sykmelding", () => {

        it("Kaller på bekreftSykmelding med sykmeldingId og arbeidssituasjon dersom man klikker på Bekreft-knappen,", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'frilanser' };
            const sendSpy = sinon.spy(); 
            const httpRespons = {
                status: 200
            }
            const bekreft = () => {
                return {
                    then: (func) => {
                        return;
                    }
                };
            }
            let bekreftSpy = sinon.spy(bekreft);
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding}
              ledetekster={ledetekster}
              bekreftSykmelding={bekreftSpy}
              sendSykmeldingTilArbeidsgiver={sendSpy}
            />);
            component.simulate("submit");
            expect(bekreftSpy.calledOnce).to.be.true;
            expect(bekreftSpy.getCall(0).args[0]).to.equal(23);
            expect(bekreftSpy.getCall(0).args[1]).to.equal("frilanser");
        }); 

        it("Kaller på bekreftSykmelding med sykmeldingId og arbeidssituasjon dersom man klikker på Bekreft-knappen når man har strengt fortrolig adresse", () => {
            const sykmelding = { id: 23, arbeidssituasjon: 'arbeidstaker' };
            const sendSpy = sinon.spy(); 
            const httpRespons = {
                status: 200
            }
            const bekreft = () => {
                return {
                    then: (func) => {
                        return;
                    }
                };
            }
            let bekreftSpy = sinon.spy(bekreft);
            const component = shallow(<DinSykmeldingSkjema sykmelding={sykmelding}
              ledetekster={ledetekster}
              bekreftSykmelding={bekreftSpy}
              sendSykmeldingTilArbeidsgiver={sendSpy}
              harStrengtFortroligAdresse={true}
            />);
            component.simulate("submit");
            expect(bekreftSpy.calledOnce).to.be.true;
            expect(bekreftSpy.getCall(0).args[0]).to.equal(23);
            expect(bekreftSpy.getCall(0).args[1]).to.equal("arbeidstaker");
        }); 

    });



});