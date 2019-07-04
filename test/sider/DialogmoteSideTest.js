import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import ledetekster from '../mock/mockLedetekster';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import Kvittering from '../../js/components/moter/moteplanlegger/Kvittering';
import Svarside from '../../js/components/moter/moteplanlegger/Svarside';
import getMote, { moteBesvartAlleAlternativer } from '../mock/mockMote';
import { Container, mapStateToProps } from '../../js/sider/DialogmoteSide';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('DialogmoteSide', () => {
    describe('Container', () => {
        let doSendSvar;
        let doHentMote;
        let mote;
        let clock;

        beforeEach(() => {
            mote = getMote();
            doHentMote = sinon.spy();
            doSendSvar = sinon.spy();
            clock = sinon.useFakeTimers(1485524800000); // in a distant future in a galaxy far, far away
        });
        afterEach(() => {
            clock.restore();
        });

        it('Skal vise AppSpinner hvis henter = true', () => {
            const comp = shallow(<Container doHentMote={doHentMote} doSendSvar={doSendSvar} henter />);
            expect(comp.find(AppSpinner)).to.have.length(1);
        });

        it('Skal vise en feilmelding hvis hentingFeilet = true', () => {
            const comp = shallow(<Container doHentMote={doHentMote} doSendSvar={doSendSvar} hentingFeilet />);
            expect(comp.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal sende alle props videre til Svarside', () => {
            const comp = shallow(<Container mote={mote} doHentMote={doHentMote} doSendSvar={doSendSvar} banan="banan" eple="eple" />);
            const s = comp.find(Svarside);
            expect(s.prop('banan')).to.equal('banan');
            expect(s.prop('eple')).to.equal('eple');
            expect(s.prop('mote')).to.deep.equal(mote);
        });

        it('Skal sende sendSvar videre til Svarside', () => {
            const comp = shallow(<Container mote={mote} doHentMote={doHentMote} doSendSvar={doSendSvar} />);
            expect(comp.find(Svarside).prop('sendSvar')).to.deep.equal(doSendSvar);
        });

        describe('Hvis alle alternativer er besvart', () => {
            it('Skal vise Kvittering', () => {
                mote = moteBesvartAlleAlternativer;
                const component = shallow(<Container doHentMote={doHentMote} doSendSvar={doSendSvar} mote={mote} />);
                expect(component.find(Kvittering)).to.have.length(1);
            });
        });
    });

    describe('mapStateToProps', () => {
        let state;

        beforeEach(() => {
            state = {
                ledetekster: {
                    data: ledetekster,
                },
                mote: {
                    data: null,
                },
                svar: {
                    sendt: false,
                },
            };
        });

        it('Skal returnere henter dersom det hentes møte', () => {
            state.mote.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.equal(true);
        });

        it('Skal returnere henter === false dersom det ikke hentes møte', () => {
            state.mote.henter = false;
            const props = mapStateToProps(state);
            expect(props.henter).to.equal(false);
        });

        it('Skal returnere hentingFeilet dersom henting av møte feiler', () => {
            state.mote.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.equal(true);
        });

        it('Skal returnere hentingFeilet === false dersom henting av møte ikke feiler', () => {
            state.mote.hentingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.equal(false);
        });

        it('Skal returnere hentingFeilet dersom henting av ledetekster feiler', () => {
            state.ledetekster.hentingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.equal(true);
        });

        it('Skal returnere hentingFeilet === false dersom henting av ledetekster ikke feiler', () => {
            state.ledetekster.hentingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.hentingFeilet).to.equal(false);
        });

        it('Skal returnere moteIkkeFunnet dersom møte ikke finnes', () => {
            state.mote.moteIkkeFunnet = true;
            const props = mapStateToProps(state);
            expect(props.moteIkkeFunnet).to.equal(true);
        });

        it('Skal returnere moteIkkeFunnet === false hvis møte finnes', () => {
            // state.mote.moteIkkeFunnet er nå undefined, så vi setter den ikke
            const props = mapStateToProps(state);
            expect(props.moteIkkeFunnet).to.equal(false);
        });

        it('Skal returnere mote dersom mote finnes', () => {
            state.mote.data = getMote();
            const props = mapStateToProps(state);
            expect(props.mote).to.deep.equal(state.mote.data);
        });

        it('Skal returnere sender === true dersom svar sendes', () => {
            state.svar.sender = true;
            const props = mapStateToProps(state);
            expect(props.sender).to.equal(true);
        });

        it('Skal returnere sender === false dersom svar ikke sendes', () => {
            state.svar.sender = false;
            const props = mapStateToProps(state);
            expect(props.sender).to.equal(false);
        });

        it('Skal returnere sendingFeilet === true dersom sending av svar feiler', () => {
            state.svar.sendingFeilet = true;
            const props = mapStateToProps(state);
            expect(props.sendingFeilet).to.equal(true);
        });

        it('Skal returnere sendingFeiløet === false dersom sendiung av svar ikke har feilet', () => {
            state.svar.sendingFeilet = false;
            const props = mapStateToProps(state);
            expect(props.sendingFeilet).to.equal(false);
        });
    });
});
