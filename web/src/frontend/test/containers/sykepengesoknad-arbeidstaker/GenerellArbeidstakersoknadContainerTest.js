import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import deepFreeze from 'deep-freeze';
import { mapStateToProps } from '../../../js/containers/sykepengesoknad-arbeidstaker/GenerellArbeidstakersoknadContainer';
import { SYKEPENGER_SKJEMANAVN } from '../../../js/utils/sykepengesoknadUtils';

chai.use(chaiEnzyme());

const expect = chai.expect;

describe('GenerellArbeidstakersoknadContainer', () => {
    let state;
    let ownProps;
    let forrigeSykeforloepTom;
    const identdato1 = new Date('1984-08-02');
    const identdato3 = new Date('1985-01-01');

    beforeEach(() => {
        state = {};
        forrigeSykeforloepTom = new Date('1984-08-02');

        state.form = {
            [SYKEPENGER_SKJEMANAVN]: {
                values: {
                    id: 'skjemasoknad-id',
                },
            },
        };
        state.sykepengesoknader = {
            data: [{
                id: 'soknad-id',
                sykmeldingId: 'sykmelding-id-0',
                forrigeSykeforloepTom,
                identdato: identdato3,
                egenmeldingsperioder: [],
                status: 'NY',
            }, {
                id: 'soknad-id-3',
                sykmeldingId: 'lang-sykmelding-id',
                identdato: identdato1,
                egenmeldingsperioder: [],
                status: 'NY',
            }, {
                id: 'soknad-id-2',
                sykmeldingId: 'lang-sykmelding-id',
                identdato: identdato1,
                sendtTilArbeidsgiverDato: new Date('2018-01-12'),
                egenmeldingsperioder: [],
                status: 'SENDT',
            }, {
                id: 'soknad-id-korrigerer',
                sykmeldingId: 'lang-sykmelding-id',
                identdato: identdato1,
                korrigerer: 'soknad-id-2',
                status: 'UTKAST_TIL_KORRIGERING',
                sendtTilArbeidsgiverDato: new Date('2018-01-15'),
                egenmeldingsperioder: [],
            }],
        };

        state.ledetekster = {};

        state.soknader = {};

        ownProps = {
            params: {
                sykepengesoknadId: 'soknad-id',
            },
        };
    });

    it('Skal ikke tryne hvis skjemasoknad er undefined', () => {
        delete state.form;
        const props = mapStateToProps(deepFreeze(state), ownProps);
        expect(props.skjemasoknad).to.equal(undefined);
    });

    it('Skal ikke tryne hvis sykepengesoknader er []', () => {
        state.sykepengesoknader.data = [];
        const props = mapStateToProps(deepFreeze(state), ownProps);
        expect(props.skjemasoknad).to.deep.equal({
            id: 'skjemasoknad-id',
        });
    });

    it('Skal dekorere skjemasoknad med forrigeSykeforloepTom dersom den finnes', () => {
        const props = mapStateToProps(deepFreeze(state), ownProps);
        expect(props.skjemasoknad.forrigeSykeforloepTom).to.deep.equal(forrigeSykeforloepTom);
    });

    it('Skal ikke dekorere skjemasoknad med forrigeSykeforloepTom dersom den ikke finnes', () => {
        delete state.sykepengesoknader.data[0].forrigeSykeforloepTom;
        const props = mapStateToProps(deepFreeze(state), ownProps);
        expect(props.skjemasoknad.forrigeSykeforloepTom).to.equal(undefined);
    });
});
