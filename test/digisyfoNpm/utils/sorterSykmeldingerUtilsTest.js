import { expect } from 'chai';
import { sorterSykmeldinger, sorterPerioderEldsteFoerst, sorterSykmeldingerEldsteFoerst } from '../../../js/digisyfoNpm/utils';
import getSykmelding from '../mock/mockSykmeldinger';
import mockSmSykmelding from '../mock/mockSmSykmelding';

describe('sorterSykmeldinger', () => {
    const sykmeldinger = [{
        id: 1,
        arbeidsgiver: 'Drammen Frisør',
        mulighetForArbeid: {
            perioder: [{
                fom: '2014-01-24',
                tom: '2014-02-09',
                grad: '80',
            }],
        },
    }, {
        id: 2,
        arbeidsgiver: 'Ålesund Frisør',
        mulighetForArbeid: {
            perioder: [{
                fom: '2014-12-31',
                tom: '2015-01-30',
                grad: '25',
            }],
        },
    }, {
        id: 3,
        arbeidsgiver: 'Alnabru Frisør',
        mulighetForArbeid: {
            perioder: [{
                fom: '2015-04-08',
                tom: '2015-04-15',
                grad: '100',
            }],
        },
    }, {
        id: 4,
        arbeidsgiver: 'Alnabru Frisør',
        mulighetForArbeid: {
            perioder: [{
                fom: '2015-05-17',
                tom: '2015-05-31',
                grad: '100',
            }],
        },
    }, {
        id: 5,
        arbeidsgiver: 'Alnabru Frisør',
        mulighetForArbeid: {
            perioder: [{
                fom: '2015-08-31',
                tom: '2015-09-13',
                grad: '100',
            }],
        },
    }, {
        id: 6,
        arbeidsgiver: 'Bærum Idrettslag',
        mulighetForArbeid: {
            perioder: [{
                fom: '2016-03-31',
                tom: '2016-08-13',
                grad: '29',
            }],
        },
    }];

    it('Skal sortere etter startdato for første periode som standard', () => {
        const s = sorterSykmeldinger(sykmeldinger);
        expect(s).to.deep.equal([{
            id: 6,
            arbeidsgiver: 'Bærum Idrettslag',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-03-31',
                    tom: '2016-08-13',
                    grad: '29',
                }],
            },
        }, {
            id: 5,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-08-31',
                    tom: '2015-09-13',
                    grad: '100',
                }],
            },
        }, {
            id: 4,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-05-17',
                    tom: '2015-05-31',
                    grad: '100',
                }],
            },
        }, {
            id: 3,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-15',
                    grad: '100',
                }],
            },
        }, {
            id: 2,
            arbeidsgiver: 'Ålesund Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-12-31',
                    tom: '2015-01-30',
                    grad: '25',
                }],
            },
        }, {
            id: 1,
            arbeidsgiver: 'Drammen Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-01-24',
                    tom: '2014-02-09',
                    grad: '80',
                }],
            },
        }]);
    });


    it('Skal sortere periodene etter sluttdato dersom to perioder har samme startdato', () => {
        const s = sorterSykmeldinger([{
            id: 6,
            arbeidsgiver: 'Bærum Idrettslag',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-08-31',
                    tom: '2016-09-13',
                    grad: '100',
                }, {
                    fom: '2016-08-31',
                    tom: '2016-12-13',
                    grad: '29',
                }, {
                    fom: '2015-07-09',
                    tom: '2015-07-13',
                    grad: '60',
                }],
            },
        }]);
        expect(s).to.deep.equal([{
            id: 6,
            arbeidsgiver: 'Bærum Idrettslag',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-07-09',
                    tom: '2015-07-13',
                    grad: '60',
                }, {
                    fom: '2016-08-31',
                    tom: '2016-09-13',
                    grad: '100',
                }, {
                    fom: '2016-08-31',
                    tom: '2016-12-13',
                    grad: '29',
                }],
            },
        }]);
    });

    it('Skal sortere periodene slik at første periode kommer først', () => {
        const s = sorterSykmeldinger([{
            id: 6,
            arbeidsgiver: 'Bærum Idrettslag',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-08-31',
                    tom: '2016-12-22',
                    grad: '100',
                }, {
                    fom: '2016-03-31',
                    tom: '2016-08-13',
                    grad: '29',
                }, {
                    fom: '2015-07-09',
                    tom: '2015-07-13',
                    grad: '60',
                }],
            },
        }]);
        expect(s).to.deep.equal([{
            id: 6,
            arbeidsgiver: 'Bærum Idrettslag',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-07-09',
                    tom: '2015-07-13',
                    grad: '60',
                }, {
                    fom: '2016-03-31',
                    tom: '2016-08-13',
                    grad: '29',
                }, {
                    fom: '2016-08-31',
                    tom: '2016-12-22',
                    grad: '100',
                }],
            },
        }]);
    });

    it('Skal sortere periodene etter sluttdato dersom to perioder har samme startdato', () => {
        const s = sorterSykmeldinger([{
            id: 6,
            arbeidsgiver: 'Bærum Idrettslag',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-08-31',
                    tom: '2016-09-13',
                    grad: '100',
                }, {
                    fom: '2016-08-31',
                    tom: '2016-12-13',
                    grad: '29',
                }, {
                    fom: '2015-07-09',
                    tom: '2015-07-13',
                    grad: '60',
                }],
            },
        }]);
        expect(s).to.deep.equal([{
            id: 6,
            arbeidsgiver: 'Bærum Idrettslag',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-07-09',
                    tom: '2015-07-13',
                    grad: '60',
                }, {
                    fom: '2016-08-31',
                    tom: '2016-09-13',
                    grad: '100',
                }, {
                    fom: '2016-08-31',
                    tom: '2016-12-13',
                    grad: '29',
                }],
            },
        }]);
    });

    it('Skal sortere etter innsendt kriterium uansett hva det er (arbeidsgiver)', () => {
        const sykmeldinger_ = [{
            id: 3,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-15',
                    grad: '100',
                }],
            },
        }, {
            id: 2,
            arbeidsgiver: 'Ålesund Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-12-31',
                    tom: '2015-01-30',
                    grad: '25',
                }],
            },
        }, {
            id: 1,
            arbeidsgiver: 'Drammen Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-01-24',
                    tom: '2014-02-09',
                    grad: '80',
                }],
            },
        }];
        const s = sorterSykmeldinger(sykmeldinger_, 'arbeidsgiver');
        expect(s).to.deep.equal([{
            id: 3,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-15',
                    grad: '100',
                }],
            },
        }, {
            id: 1,
            arbeidsgiver: 'Drammen Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-01-24',
                    tom: '2014-02-09',
                    grad: '80',
                }],
            },
        }, {
            id: 2,
            arbeidsgiver: 'Ålesund Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-12-31',
                    tom: '2015-01-30',
                    grad: '25',
                }],
            },
        }]);
    });

    it('Skal sortere etter innsendt kriterium uansett hva det er (sykmelder)', () => {
        const sykmeldinger_ = [{
            id: 3,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-15',
                    grad: '100',
                }],
            },
            bekreftelse: {
                sykmelder: 'Aslak Aslaksen',
            },
        }, {
            id: 2,
            arbeidsgiver: 'Ålesund Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-12-31',
                    tom: '2015-01-30',
                    grad: '25',
                }],
            },
            bekreftelse: {
                sykmelder: 'Åse Åsnes',
            },
        }, {
            id: 1,
            arbeidsgiver: 'Drammen Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-01-24',
                    tom: '2014-02-09',
                    grad: '80',
                }],
            },
            bekreftelse: {
                sykmelder: 'Dirk Derrick',
            },
        }];
        const s = sorterSykmeldinger(sykmeldinger_, 'bekreftelse.sykmelder');
        expect(s).to.deep.equal([{
            id: 3,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-15',
                    grad: '100',
                }],
            },
            bekreftelse: {
                sykmelder: 'Aslak Aslaksen',
            },
        }, {
            id: 1,
            arbeidsgiver: 'Drammen Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-01-24',
                    tom: '2014-02-09',
                    grad: '80',
                }],
            },
            bekreftelse: {
                sykmelder: 'Dirk Derrick',
            },
        }, {
            id: 2,
            arbeidsgiver: 'Ålesund Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-12-31',
                    tom: '2015-01-30',
                    grad: '25',
                }],
            },
            bekreftelse: {
                sykmelder: 'Åse Åsnes',
            },
        }]);
    });

    it('Skal sekundært sortere etter startdato dersom to sykmeldinger har samme arbeidsgiver', () => {
        const sykmeldinger_ = [{
            id: 3,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-15',
                    grad: '100',
                }],
            },
        }, {
            id: 2,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-11-20',
                    tom: '2015-11-30',
                    grad: '25',
                }],
            },
        }, {
            id: 1,
            arbeidsgiver: 'Drammen Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-01-24',
                    tom: '2014-02-09',
                    grad: '80',
                }],
            },
        }];
        const s = sorterSykmeldinger(sykmeldinger_, 'arbeidsgiver');
        expect(s).to.deep.equal([{
            id: 2,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-11-20',
                    tom: '2015-11-30',
                    grad: '25',
                }],
            },
        }, {
            id: 3,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-15',
                    grad: '100',
                }],
            },
        }, {
            id: 1,
            arbeidsgiver: 'Drammen Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-01-24',
                    tom: '2014-02-09',
                    grad: '80',
                }],
            },
        }]);
    });

    it('Skal sekundært sortere etter sluttdato for siste periode dersom to sykmeldinger har samme startdato', () => {
        const sykmeldinger_ = [{
            id: 3,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-15',
                    grad: '100',
                }, {
                    fom: '2015-05-08',
                    tom: '2015-05-15',
                    grad: '100',
                }, {
                    fom: '2015-08-08',
                    tom: '2015-08-15',
                    grad: '100',
                }],
            },
        }, {
            id: 2,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-22',
                    grad: '100',
                }, {
                    fom: '2015-06-08',
                    tom: '2015-06-15',
                    grad: '100',
                }, {
                    fom: '2015-11-08',
                    tom: '2015-11-15',
                    grad: '100',
                }],
            },
        }, {
            id: 2,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-22',
                    grad: '100',
                }, {
                    fom: '2015-03-08',
                    tom: '2015-03-15',
                    grad: '100',
                }, {
                    fom: '2015-01-08',
                    tom: '2015-01-15',
                    grad: '100',
                }],
            },
        }, {
            id: 1,
            arbeidsgiver: 'Drammen Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-01-24',
                    tom: '2014-02-09',
                    grad: '80',
                }],
            },
        }];
        const s = sorterSykmeldinger(sykmeldinger_);
        expect(s).to.deep.equal([{
            id: 2,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-22',
                    grad: '100',
                }, {
                    fom: '2015-06-08',
                    tom: '2015-06-15',
                    grad: '100',
                }, {
                    fom: '2015-11-08',
                    tom: '2015-11-15',
                    grad: '100',
                }],
            },
        }, {
            id: 3,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-04-08',
                    tom: '2015-04-15',
                    grad: '100',
                }, {
                    fom: '2015-05-08',
                    tom: '2015-05-15',
                    grad: '100',
                }, {
                    fom: '2015-08-08',
                    tom: '2015-08-15',
                    grad: '100',
                }],
            },
        }, {
            id: 2,
            arbeidsgiver: 'Alnabru Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2015-01-08',
                    tom: '2015-01-15',
                    grad: '100',
                }, {
                    fom: '2015-03-08',
                    tom: '2015-03-15',
                    grad: '100',
                }, {
                    fom: '2015-04-08',
                    tom: '2015-04-22',
                    grad: '100',
                }],
            },
        }, {
            id: 1,
            arbeidsgiver: 'Drammen Frisør',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2014-01-24',
                    tom: '2014-02-09',
                    grad: '80',
                }],
            },
        }]);
    });


    it('Skal sortere perioder så eldste perioder fom kommer først og hvis lik fom så kommer eldste tom nederst', () => {
        const perioder = [{
            fom: '2015-04-08',
            tom: '2015-04-15',
            grad: '100',
        }, {
            fom: '2015-04-06',
            tom: '2015-04-16',
            grad: '100',
        }, {
            fom: '2015-04-08',
            tom: '2015-04-14',
            grad: '100',
        }];

        const p = sorterPerioderEldsteFoerst(perioder);
        expect(p).to.deep.equal([{
            fom: '2015-04-06',
            tom: '2015-04-16',
            grad: '100',
        }, {
            fom: '2015-04-08',
            tom: '2015-04-14',
            grad: '100',
        }, {
            fom: '2015-04-08',
            tom: '2015-04-15',
            grad: '100',
        }]);
    });

    it('Skal sortere perioder slik at den korteste perioden kommer først dersom flere perioder har samme startdato', () => {
        const perioder = [{
            fom: '2015-01-01',
            tom: '2015-01-30',
            grad: '100',
        }, {
            fom: '2015-01-01',
            tom: '2015-01-15',
            grad: '100',
        }, {
            fom: '2015-01-01',
            tom: '2015-01-20',
            grad: '100',
        }];

        const p = sorterPerioderEldsteFoerst(perioder);
        expect(p).to.deep.equal([{
            fom: '2015-01-01',
            tom: '2015-01-15',
            grad: '100',
        }, {
            fom: '2015-01-01',
            tom: '2015-01-20',
            grad: '100',
        }, {
            fom: '2015-01-01',
            tom: '2015-01-30',
            grad: '100',
        }]);
    });

    describe('sorterSykmeldingerEldsteFoerst', () => {
        it('Skal sortere etter startdato for første periode med eldste først dersom eldsteForst === true', () => {
            const s = sorterSykmeldingerEldsteFoerst(sykmeldinger);
            expect(s.reverse()).to.deep.equal([{
                id: 6,
                arbeidsgiver: 'Bærum Idrettslag',
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2016-03-31',
                        tom: '2016-08-13',
                        grad: '29',
                    }],
                },
            }, {
                id: 5,
                arbeidsgiver: 'Alnabru Frisør',
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2015-08-31',
                        tom: '2015-09-13',
                        grad: '100',
                    }],
                },
            }, {
                id: 4,
                arbeidsgiver: 'Alnabru Frisør',
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2015-05-17',
                        tom: '2015-05-31',
                        grad: '100',
                    }],
                },
            }, {
                id: 3,
                arbeidsgiver: 'Alnabru Frisør',
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2015-04-08',
                        tom: '2015-04-15',
                        grad: '100',
                    }],
                },
            }, {
                id: 2,
                arbeidsgiver: 'Ålesund Frisør',
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2014-12-31',
                        tom: '2015-01-30',
                        grad: '25',
                    }],
                },
            }, {
                id: 1,
                arbeidsgiver: 'Drammen Frisør',
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2014-01-24',
                        tom: '2014-02-09',
                        grad: '80',
                    }],
                },
            }]);
        });

        it('Skal legge sykmeldingen med kortest periode øverst (den som avsluttes først) når eldsteForst === true dersom flere sykmeldinger har samme startdato', () => {
            const sykmeldinger_ = [
                getSykmelding({
                    id: 1,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: '2014-01-01',
                            tom: '2014-01-10',
                            grad: '80',
                        }],
                    },
                }),
                getSykmelding({
                    id: 2,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: '2014-01-01',
                            tom: '2014-01-09',
                            grad: '80',
                        }],
                    },
                }),
                getSykmelding({
                    id: 3,
                    mulighetForArbeid: {
                        perioder: [{
                            fom: '2014-01-01',
                            tom: '2014-01-11',
                            grad: '80',
                        }],
                    },
                }),
            ];
            const s = sorterSykmeldingerEldsteFoerst(sykmeldinger_);
            expect(s[0].id).to.equal(2);
            expect(s[1].id).to.equal(1);
            expect(s[2].id).to.equal(3);
        });

        it('Skal legge sykmeldingen med kortest total periode øverst (den som avsluttes først) dersom flere sykmeldinger har samme startdato', () => {
            const sykmeldinger_ = [{
                id: 0,
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2014-01-01',
                        tom: '2014-01-10', // 1.1-20.1
                        grad: '80',
                    }, {
                        fom: '2014-01-15',
                        tom: '2014-01-20',
                        grad: '80',
                    }],
                },
            }, {
                id: 1,
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2014-01-01',
                        tom: '2014-01-10', // 1.1-5.2
                        grad: '80',
                    }, {
                        fom: '2014-02-02',
                        tom: '2014-02-05',
                        grad: '80',
                    }],
                },
            }, {
                id: 2,
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2014-01-01', // 1.1-10.3
                        tom: '2014-03-10',
                        grad: '80',
                    }, {
                        fom: '2014-02-02',
                        tom: '2014-02-09',
                        grad: '80',
                    }],
                },
            }, {
                id: 3,
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2014-01-01', // 1.1-11.2
                        tom: '2014-01-11',
                        grad: '80',
                    }, {
                        fom: '2014-02-02',
                        tom: '2014-02-11',
                        grad: '80',
                    }],
                },
            }, {
                id: 4,
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2014-01-01', // 1.1-1.8
                        tom: '2014-01-11',
                        grad: '80',
                    }, {
                        fom: '2014-02-02',
                        tom: '2014-08-01',
                        grad: '80',
                    }],
                },
            }];
            const s = sorterSykmeldingerEldsteFoerst(sykmeldinger_);
            expect(s[0].id).to.equal(0);
            expect(s[1].id).to.equal(1);
            expect(s[2].id).to.equal(3);
            expect(s[3].id).to.equal(2);
            expect(s[4].id).to.equal(4);
        });

        it('Skal håndtere sykmeldinger fra sm-register', () => {
            const sykmelding1 = getSykmelding({
                id: 1,
                mulighetForArbeid: {
                    perioder: [{
                        fom: '2015-01-01',
                        tom: '2015-01-10',
                        grad: '80',
                    }],
                },
            });
            const sykmelding2 = mockSmSykmelding();
            const sykmeldingerOgSmSykmeldinger = [sykmelding1, sykmelding2];
            const sortert = sorterSykmeldinger(sykmeldingerOgSmSykmeldinger);
            expect(sortert).to.deep.equal([sykmelding2, sykmelding1]);
        });
    });
});
