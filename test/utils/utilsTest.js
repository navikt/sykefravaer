import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { hentFornavn, lagDesimaltall, lagHeltall, Vis } from '../../js/utils';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('utils', () => {
    describe('lagDesimaltall', () => {
        it('Skal fjerne bokstaver', () => {
            const n = lagDesimaltall('12f');
            expect(n).to.equal('12');
        });

        it('Skal fjerne bindestrek', () => {
            const n = lagDesimaltall('12f-');
            expect(n).to.equal('12');
        });

        it('Skal erstatte . med komma når . er midt i argumentet', () => {
            const n = lagDesimaltall('12.4');
            expect(n).to.equal('12,4');
        });

        it('Skal erstatte . med komma når . er på slutten av argumentet', () => {
            const n = lagDesimaltall('12.');
            expect(n).to.equal('12,');
        });

        it('Skal ikke fjerne komma når komma er midt i argumentet', () => {
            const n = lagDesimaltall('12,4');
            expect(n).to.equal('12,4');
        });

        it('Skal ikke fjerne komma når komma er på slutten av argumentet', () => {
            const n = lagDesimaltall('12,');
            expect(n).to.equal('12,');
        });

        it('Skal returnere tom streng', () => {
            const n = lagDesimaltall('');
            expect(n).to.equal('');
        });

        it('Skal fjerne komma hvis det står først', () => {
            const n = lagDesimaltall(',');
            expect(n).to.equal('');
        });

        it('Skal fjerne komma hvis det står først', () => {
            const n = lagDesimaltall(',,');
            expect(n).to.equal('');
        });

        it('Skal kun godta to desimaler for tall under 10', () => {
            const n = lagDesimaltall('1,145');
            expect(n).to.equal('1,14');
        });

        it('Skal kun godta to desimaler for tall over 10', () => {
            const n = lagDesimaltall('11,1451');
            expect(n).to.equal('11,14');
        });

        it('Skal kun godta to desimaler for tall over 100', () => {
            const n = lagDesimaltall('456,1451');
            expect(n).to.equal('456,14');
        });
    });

    describe('lagHeltall', () => {
        it('Skal fjerne bokstaver', () => {
            const n = lagHeltall('12f');
            expect(n).to.equal('12');
        });

        it('Skal fjerne bindestrek', () => {
            const n = lagHeltall('12f-');
            expect(n).to.equal('12');
        });

        it('Skal fjerne .', () => {
            const n = lagHeltall('12.4');
            expect(n).to.equal('12');
        });

        it('Skal fjene . når . er på slutten av argumentet', () => {
            const n = lagHeltall('12.');
            expect(n).to.equal('12');
        });

        it('Skal returnere tom streng', () => {
            const n = lagHeltall('');
            expect(n).to.equal('');
        });

        it('Skal fjerne komma hvis det står først', () => {
            const n = lagHeltall(',');
            expect(n).to.equal('');
        });

        it('Skal fjerne komma hvis det står først', () => {
            const n = lagHeltall(',,');
            expect(n).to.equal('');
        });

        it('Skal fjerne , for tall under 10', () => {
            const n = lagHeltall('1,145');
            expect(n).to.equal('1');
        });

        it('Skal fjerne desimaler for tall over 10', () => {
            const n = lagHeltall('11,1451');
            expect(n).to.equal('11');
        });

        it('Skal fjerne desimaler for tall over 100', () => {
            const n = lagHeltall('456,1451');
            expect(n).to.equal('456');
        });
    });

    describe('Vis', () => {
        it('Skal vise children hvis det er children og hvis = true', () => {
            const toMount = (<Vis hvis>
                <p>Olsen</p>
            </Vis>);
            const component = mount(toMount);
            expect(component.html()).to.equal('<p>Olsen</p>');
        });

        it('Skal ikke vise children hvis det er children og hvis = false', () => {
            const toMount = (<Vis hvis={false}>
                <p>Olsen</p>
            </Vis>);
            const component = mount(toMount);
            expect(component.html()).to.equal(null);
        });

        it('Skal vise render-funksjonens returverdi hvis det er render-funkksjon og hvis = true', () => {
            const toMount = (<Vis
                hvis
                render={() => {
                    return <p>Olsen</p>;
                }} />);
            const component = mount(toMount);
            expect(component.html()).to.equal('<p>Olsen</p>');
        });

        it('Skal ikke vise render-funksjonens returverdi hvis det er render-funkksjon og hvis = false', () => {
            const toMount = (<Vis
                hvis={false}
                render={() => {
                    return <p>Olsen</p>;
                }} />);
            const component = mount(toMount);
            expect(component.html()).to.equal(null);
        });
    });

    describe('hentFornavn', () => {
        it('Skal returnere tom streng hvis fornavn er udefinert', () => {
            expect(hentFornavn(undefined)).to.equal('');
        });

        it('Skal returnere fornavn med stor forbokstav hvis navn er lowercase', () => {
            expect(hentFornavn('test testesen')).to.equal('Test');
        });

        it('Skal returnere fornavn med stor forbokstav hvis navn allerede har stor forbokstav', () => {
            expect(hentFornavn('Test testesen')).to.equal('Test');
        });

        it('Skal returnere fornavn hvis navn ikke har etternavn', () => {
            expect(hentFornavn('Test')).to.equal('Test');
        });
    });
});
