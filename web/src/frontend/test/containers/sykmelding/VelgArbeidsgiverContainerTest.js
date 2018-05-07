import chai from 'chai';
import { setLedetekster } from 'digisyfo-npm';
import ledetekster from '../../mockLedetekster';
import { mapStateToProps } from '../../../js/containers/sykmelding/VelgArbeidsgiverContainer';

const expect = chai.expect;

describe('VelgArbeidsgiverContainer', () => {
    describe('mapStateToProps', () => {
        const state = {};

        beforeEach(() => {
            state.arbeidsgiversSykmeldinger = {
                data: [{
                    id: '123',
                    valgtArbeidsgiver: {
                        orgnummer: '99',
                    },
                }, {
                    id: '888',
                }],
            };
            state.arbeidsgivere = {
                data: [],
            };
            state.ledetekster = {
                data: ledetekster,
            };
            state.brukerinfo = {
                bruker: {
                    data: {},
                },
            };
            setLedetekster({
                'send-til-arbeidsgiver.annen-arbeidsgiver.label': 'Annen arbeidsgiver',
            });
        });

        it('Skal returnere henter === true hvis det hentes', () => {
            state.arbeidsgivere.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.equal(true);
        });

        it('Skal returnere henter === false hvis det ikke hentes', () => {
            state.arbeidsgivere.henter = false;
            const props = mapStateToProps(state);
            expect(props.henter).to.equal(false);
        });

        it('Skal returnere arbeidsgivere når det ikke finnes arbeidsgivere', () => {
            const props = mapStateToProps(state);
            expect(props.arbeidsgivere).to.deep.equal([{
                navn: 'Annen arbeidsgiver',
                orgnummer: '0',
            }]);
        });

        it('Skal returnere arbeidsgivere når det finnes arbeidsgivere', () => {
            state.arbeidsgivere.data = [{
                orgnummer: '1234',
                navn: 'Oles sykkelservice',
            }];
            const props = mapStateToProps(state);
            expect(props.arbeidsgivere).to.deep.equal([{
                orgnummer: '1234',
                navn: 'Oles sykkelservice',
            }, {
                navn: 'Annen arbeidsgiver',
                orgnummer: '0',
            }]);
        });

        it('Skal returnere vis === false dersom bruker har strengt fortrolig adresse', () => {
            state.brukerinfo.bruker.data.strengtFortroligAdresse = true;
            const props = mapStateToProps(state);
            expect(props.vis).to.equal(false);
        });

        it('Skal returnere vis === false dersom bruker ikke har strengt fortrolig adresse', () => {
            state.brukerinfo.bruker.data.strengtFortroligAdresse = false;
            const props = mapStateToProps(state);
            expect(props.vis).to.equal(true);
        });
    });
});
