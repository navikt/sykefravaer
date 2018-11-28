import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Soknadsdatoliste, { soknadsdatoremse, soknadsdatoremseUtenForsteDato } from '../../../js/components/sykmeldingkvittering/Soknadsdatoliste';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe.only('Soknadsdatoliste', () => {
    let comp;

    const soknad1 = {
        tom: new Date('2017-10-14'),
    };

    const soknad2 = {
        tom: new Date('2017-10-12'),
    };

    const soknad3 = {
        tom: new Date('2017-10-13'),
    };

    const soknad4 = {
        tom: new Date('2017-10-11'),
    };

    beforeEach(() => {

    });

    it('Skal sortere etter tom', () => {
        comp = shallow(<Soknadsdatoliste sykepengesoknader={[soknad1, soknad2, soknad3]} />);
        expect(comp.find('li').at(0).text()).to.equal('12. oktober 2017');
        expect(comp.find('li').at(1).text()).to.equal('13. oktober 2017');
        expect(comp.find('li').at(2).text()).to.equal('14. oktober 2017');
    });

    describe('soknadsdatoremse', () => {
        it('Skal gi én dato hvis det bare finnes én søknad', () => {
            expect(soknadsdatoremse([soknad1])).to.equal('<strong>14. oktober 2017</strong>');
        });

        it("Skal gi to datoer separert av 'og' hvis det finnes to søknader", () => {
            expect(soknadsdatoremse([soknad1, soknad2])).to.equal('<strong>12. oktober 2017</strong> og <strong>14. oktober 2017</strong>');
        });

        it("Skal gi tre datoer separert av komma og 'og' hvis det finnes tre søknader", () => {
            expect(soknadsdatoremse([soknad1, soknad2, soknad3]))
                .to.equal('<strong>12. oktober 2017</strong>, <strong>13. oktober 2017</strong> og <strong>14. oktober 2017</strong>');
        });
    });

    describe('soknadsdatoremseUtenForsteDato', () => {
        it('Skal gi null dato hvis det bare finnes én søknad', () => {
            expect(soknadsdatoremseUtenForsteDato([soknad1])).to.equal(null);
        });

        it('Skal gi den siste datoen hvis det finnes to søknader', () => {
            expect(soknadsdatoremseUtenForsteDato([soknad1, soknad2])).to.equal('<strong>14. oktober 2017</strong>');
        });

        it("Skal gi to datoer separert av 'og' hvis det finnes tre søknader", () => {
            expect(soknadsdatoremseUtenForsteDato([soknad1, soknad2, soknad3]))
                .to.equal('<strong>13. oktober 2017</strong> og <strong>14. oktober 2017</strong>');
        });

        it("Skal gi tre datoer separert av komma og 'og' hvis det finnes fire søknader", () => {
            expect(soknadsdatoremseUtenForsteDato([soknad1, soknad2, soknad3, soknad4]))
                .to.equal('<strong>12. oktober 2017</strong>, <strong>13. oktober 2017</strong> og <strong>14. oktober 2017</strong>');
        });
    });
});
