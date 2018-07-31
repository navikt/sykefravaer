import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mapStateToProps } from '../../js/utils/connectGjenopptattArbeidFulltUtDato';
import { getSykepengesoknadArbeidstakerSkjemanavn } from '../../js/enums/skjemanavn';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('mapStateToProps', () => {
    let state
    const sykepengesoknad = {
        id: 'soknad-id',
    };
    let ownProps;

    beforeEach(() => {
        state = {
            form: {
                [getSykepengesoknadArbeidstakerSkjemanavn('soknad-id')]: {
                    values: {
                        harGjenopptattArbeidFulltUt: true,
                    },
                },
            },
        };
        ownProps = {
            sykepengesoknad,
        };
    });

    it('Skal returnere null hvis harGjenopptattArbeidFulltUt er false og gjenopptattArbeidFulltUtDato er riktig fylt ut', () => {
        state.form[getSykepengesoknadArbeidstakerSkjemanavn('soknad-id')].values.harGjenopptattArbeidFulltUt = false;
        state.form[getSykepengesoknadArbeidstakerSkjemanavn('soknad-id')].values.gjenopptattArbeidFulltUtDato = '20.02.2017';
        const props = mapStateToProps(state, ownProps);
        expect(props.gjenopptattArbeidFulltUtDato).to.equal(null);
    });

    it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato ikke er fylt ut', () => {
        const props = mapStateToProps(state, ownProps);
        expect(props.gjenopptattArbeidFulltUtDato).to.equal(null);
    });

    it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er noe ugyldig (1)', () => {
        state.form[getSykepengesoknadArbeidstakerSkjemanavn('soknad-id')].values.gjenopptattArbeidFulltUtDato = '02.02';
        const props = mapStateToProps(state, ownProps);
        expect(props.gjenopptattArbeidFulltUtDato).to.equal(null);
    });

    it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng (1)', () => {
        state.form[getSykepengesoknadArbeidstakerSkjemanavn('soknad-id')].values.gjenopptattArbeidFulltUtDato = '0_.__.____';
        const props = mapStateToProps(state, ownProps);
        expect(props.gjenopptattArbeidFulltUtDato).to.equal(null);
    });

    it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng (2)', () => {
        state.form[getSykepengesoknadArbeidstakerSkjemanavn('soknad-id')].values.gjenopptattArbeidFulltUtDato = '10.__.____';
        const props = mapStateToProps(state, ownProps);
        expect(props.gjenopptattArbeidFulltUtDato).to.equal(null);
    });

    it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er en ugyldig streng (3)', () => {
        state.form[getSykepengesoknadArbeidstakerSkjemanavn('soknad-id')].values.gjenopptattArbeidFulltUtDato = '10.05.____';
        const props = mapStateToProps(state, ownProps);
        expect(props.gjenopptattArbeidFulltUtDato).to.equal(null);
    });


    it('Skal returnere gjenopptattArbeidFulltUtDato = null hvis gjenopptattArbeidFulltUtDato er noe gyldig', () => {
        state.form[getSykepengesoknadArbeidstakerSkjemanavn('soknad-id')].values.gjenopptattArbeidFulltUtDato = '23.12.2017';
        const props = mapStateToProps(state, ownProps);
        expect(props.gjenopptattArbeidFulltUtDato).to.deep.equal(new Date('2017-12-23'));
    });
});
