import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from 'digisyfo-npm';
import sinon from 'sinon';
import ledetekster from '../../mock/mockLedetekster';
import getSykmelding from '../../mock/mockSykmeldinger';
import Feilmelding from '../../../js/components/Feilmelding';

import { mapStateToProps, Skjemalaster } from '../../../js/containers/sykmelding/DinSykmeldingSkjemaContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('DinSykmeldingSkjemaContainer', () => {
    const getState = (state = {}) => {
        const defaultState = {
            arbeidsgiversSykmeldinger: {
                data: [{
                    id: 123,
                    navn: 'Olsen',
                    mulighetForArbeid: {
                        perioder: [],
                    },
                }, {
                    id: 1234,
                    navn: 'Hansen',
                }],
                sender: true,
            },
            arbeidsgivere: {
                data: [{
                    navn: 'Oles pizza',
                    orgnummer: '123456789',
                }, {
                    navn: 'Doles pizza',
                    orgnummer: '123456788',
                }],
            },
            sykeforloep: {

            },
            dineSykmeldinger: {
                data: [
                    getSykmelding({
                        id: 2,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: '2016-01-01',
                                tom: '2016-01-06',
                                grad: 67,
                            }],
                        },
                    }),
                    getSykmelding({
                        id: 1,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: '2016-02-01',
                                tom: '2016-02-06',
                                grad: 67,
                            }],
                        },
                    }),
                    getSykmelding({
                        id: 3,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: '2016-03-01',
                                tom: '2016-03-10',
                                grad: 67,
                            }],
                        },
                    }),
                    getSykmelding({
                        id: 4,
                        mulighetForArbeid: {
                            perioder: [{
                                fom: '2016-03-01',
                                tom: '2016-03-20',
                                grad: 67,
                            }],
                        },
                    }),
                    getSykmelding({
                        id: 5,
                        status: 'GAMMEL',
                        mulighetForArbeid: {
                            perioder: [{
                                fom: '2016-03-01',
                                tom: '2016-03-20',
                                grad: 67,
                            }],
                        },
                    }),
                ],
            },
            ledetekster: {
                data: ledetekster,
            },
            form: {
                dinSykmeldingSkjema: {
                    test: 'OK',
                },
            },
            brukerinfo: {
                bruker: {
                    data: {
                        strengtFortroligAdresse: true,
                    },
                },
            },
            vedlikehold: {
                data: {
                    vedlikehold: false,
                },
                henter: false,
            },
            sykmeldingMeta: {},
        };
        return Object.assign({}, defaultState, state);
    };

    describe('mapStateToProps', () => {
        beforeEach(() => {
            setLedetekster(ledetekster);
        });

        it('Skal returnere sykmelding', () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123,
            });
            expect(props.sykmelding).to.deep.equal({
                id: 123,
                navn: 'Olsen',
                mulighetForArbeid: {
                    perioder: [],
                },
            });
        });

        it('Skal returnere sykmeldingId selv om sykmeldinger ikke er hentet', () => {
            const state = getState({
                arbeidsgiversSykmeldinger: {
                    hentet: false,
                    henter: false,
                    data: [],
                },
            });
            const props = mapStateToProps(state, {
                sykmeldingId: 123,
            });
            expect(props.sykmeldingId).to.equal(123);
        });

        it('Skal returnere hentingFeilet === true dersom arbeidsgivere feiler', () => {
            const state = getState();
            state.arbeidsgivere.hentingFeilet = true;
            const props = mapStateToProps(state, {
                sykmeldingId: 123,
            });
            expect(props.hentingFeilet).to.equal(true);
        });

        it('Skal returnere hentingFeilet === false dersom arbeidsgivere ikke feiler', () => {
            const state = getState();
            state.arbeidsgivere.hentingFeilet = false;
            const props = mapStateToProps(state, {
                sykmeldingId: 123,
            });
            expect(props.hentingFeilet).to.equal(false);
        });

        it('Skal returnere henter dersom det hentes vedlikehold men ikke brukerinfo', () => {
            const state = getState();
            state.vedlikehold.henter = true;
            state.brukerinfo.bruker.henter = false;
            const res = mapStateToProps(state, {
                sykmeldingId: 123,
            });
            expect(res.henter).to.equal(true);
        });

        it('Skal returnere henter dersom det hentes brukerinfo men ikke vedlikehold', () => {
            const state = getState();
            state.vedlikehold.henter = false;
            state.brukerinfo.bruker.henter = true;
            const res = mapStateToProps(state, {
                sykmeldingId: 123,
            });
            expect(res.henter).to.equal(true);
        });

        it('Skal returnere henter dersom det ikke hentes brukerinfo og ikke vedlikehold og ikke arbeidsgivers sykmeldinger', () => {
            const state = getState();
            state.arbeidsgiversSykmeldinger.henter = false;
            state.arbeidsgiversSykmeldinger.hentet = true;
            state.brukerinfo.bruker.hentet = true;
            state.arbeidsgivere.hentet = true;
            state.sykeforloep.hentet = true;
            state.sykeforloep.henter = false;
            state.arbeidsgivere.sykmeldingId = 123;
            state.arbeidsgiversSykmeldinger.data = [{
                id: 123,
                erUtenforVentetid: true,
            }, {
                id: 1234,
                navn: 'Hansen',
            }];
            state.sykmeldingMeta = {
                123: {
                    ventetidHentet: true,
                },
            };
            const res = mapStateToProps(state, {
                sykmeldingId: 123,
            });
            expect(res.henter).to.equal(false);
        });

        it('Skal returnere henter === true dersom det hentes arbeidsgiversSykmeldinger', () => {
            const state = getState();
            state.arbeidsgiversSykmeldinger.henter = true;
            state.arbeidsgiversSykmeldinger.hentet = false;
            state.brukerinfo.bruker.hentet = true;
            state.arbeidsgivere.hentet = true;
            state.arbeidsgivere.sykmeldingId = 123;
            const res = mapStateToProps(state, {
                sykmeldingId: 123,
            });
            expect(res.henter).to.equal(true);
        });

        it('Skal returnere henter === true dersom arbeidsgiversSykmeldinger ikke er hentet', () => {
            const state = getState();
            state.arbeidsgiversSykmeldinger.hentet = false;
            state.arbeidsgiversSykmeldinger.henter = false;
            const res = mapStateToProps(state, {
                sykmeldingId: 123,
            });
            expect(res.henter).to.equal(true);
            expect(res.skalHenteArbeidsgiversSykmeldinger).to.equal(true);
        });

        describe('skalHenteArbeidsgivere', () => {
            let ownProps;

            beforeEach(() => {
                ownProps = {
                    sykmeldingId: 123,
                };
            });

            it('Skal være false dersom arbeidsgivere er hentet for den aktuelle sykmeldingen', () => {
                const props = mapStateToProps(getState({
                    arbeidsgivere: {
                        sykmeldingId: 123,
                    },
                }), ownProps);
                expect(props.skalHenteArbeidsgivere).to.equal(false);
            });

            it('Skal være true dersom arbeidsgivere ikke er hentet for den aktuelle sykmeldingen og brukeren ikke har strengt fortrolig adresse', () => {
                const props = mapStateToProps(getState({
                    arbeidsgivere: {
                        sykmeldingId: 456,
                    },
                    brukerinfo: {
                        bruker: {
                            hentet: true,
                            data: {
                                strengtFortroligAdresse: false,
                            },
                        },
                    },
                }), ownProps);
                expect(props.skalHenteArbeidsgivere).to.equal(true);
            });

            it('Skal være false dersom arbeidsgivere ikke er hentet for den aktuelle sykmeldingen og brukeren har strengt fortrolig adresse', () => {
                const props = mapStateToProps(getState({
                    brukerinfo: {
                        bruker: {
                            data: {
                                strengtFortroligAdresse: true,
                            },
                        },
                    },
                }), ownProps);
                expect(props.skalHenteArbeidsgivere).to.equal(false);
            });

            it('Skal være false dersom info om strengt fortrolig adresse ikke er hentet', () => {
                const props = mapStateToProps(getState({
                    brukerinfo: {
                        bruker: {},
                    },
                }), ownProps);
                expect(props.skalHenteArbeidsgivere).to.equal(false);
            });
        });

        describe('skalHenteVentetid', () => {
            let ownProps;

            beforeEach(() => {
                ownProps = {
                    sykmeldingId: '123',
                };
            });

            it('Skal være true dersom ventetid ikke er hentet', () => {
                const props = mapStateToProps(getState(), ownProps);
                expect(props.skalHenteVentetid).to.equal(true);
            });

            it('Skal være false dersom ventetid hentes', () => {
                const props = mapStateToProps(getState({
                    sykmeldingMeta: {
                        123: {
                            henterVentetid: true,
                        },
                    },
                }), ownProps);
                expect(props.skalHenteVentetid).to.equal(false);
            });

            it('Skal være false dersom henting av ventetid feilet', () => {
                const props = mapStateToProps(getState({
                    sykmeldingMeta: {
                        123: {
                            hentVentetidFeilet: true,
                        },
                    },
                }), ownProps);
                expect(props.skalHenteVentetid).to.equal(false);
            });

            it('Skal være false dersom ventetid er hentet for denne sykmeldingen', () => {
                const props = mapStateToProps(getState({
                    sykmeldingMeta: {
                        123: {
                            erUtenforVentetid: true,
                            ventetidHentet: true,
                        },
                    },
                }), ownProps);
                expect(props.skalHenteVentetid).to.equal(false);
            });

            it('Skal være false dersom ventetid er hentet for denne sykmeldingen', () => {
                const props = mapStateToProps(getState({
                    sykmeldingMeta: {
                        123: {
                            erUtenforVentetid: false,
                            ventetidHentet: true,
                        },
                    },
                }), ownProps);
                expect(props.skalHenteVentetid).to.equal(false);
            });
        });
    });

    describe('Render', () => {
        let actions;
        let hentAktuelleArbeidsgivere;
        let hentArbeidsgiversSykmeldinger;
        let hentBrukerinfo;
        let hentVentetid;
        let hentSykeforloep;

        beforeEach(() => {
            hentBrukerinfo = sinon.spy();
            hentAktuelleArbeidsgivere = sinon.spy();
            hentArbeidsgiversSykmeldinger = sinon.spy();
            hentVentetid = sinon.spy();
            hentSykeforloep = sinon.spy();
            actions = { hentBrukerinfo, hentAktuelleArbeidsgivere, hentArbeidsgiversSykmeldinger, hentVentetid, hentSykeforloep };
        });

        it('Skal vise planlagt-vedlikehold ved vedlikehold', () => {
            const comp = shallow(<Skjemalaster {...actions} vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b' } }} />);
            expect(comp.find(Feilmelding)).to.have.length(1);
        });

        it('Skal hente brukerinfo', () => {
            shallow(<Skjemalaster skalHenteBrukerinfo {...actions} vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b' } }} />);
            expect(hentBrukerinfo.calledOnce).to.equal(true);
        });

        it('Skal hente sykeforløp', () => {
            shallow(<Skjemalaster skalHenteBrukerinfo {...actions} vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b' } }} />);
            expect(hentSykeforloep.calledOnce).to.equal(true);
        });

        it('Skal hente ventetid hvis skalHenteVentetid er true', () => {
            shallow(<Skjemalaster skalHenteVentetid {...actions} sykmeldingId="1" vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b' } }} />);
            expect(hentVentetid.calledWith('1')).to.equal(true);
        });

        it('Skal ikke hente ventetid hvis skalHenteVentetid er false', () => {
            shallow(<Skjemalaster {...actions} sykmeldingId="1" vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b' } }} />);
            expect(hentVentetid.called).to.equal(false);
        });
    });
});
