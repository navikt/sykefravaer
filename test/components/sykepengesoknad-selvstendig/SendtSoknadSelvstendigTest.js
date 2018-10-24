import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import chai from 'chai';

import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import SendtSoknadSelvstendig, { SendtSoknadSelvstendigStatuspanel } from '../../../js/components/sykepengesoknad-selvstendig/SendtSoknadSelvstendig';
import RelaterteSoknaderContainer from '../../../js/containers/sykepengesoknad-selvstendig/RelaterteSoknaderContainer';
import getSykmelding from '../../mock/mockSykmeldinger';
import { SELVSTENDIGE_OG_FRILANSERE } from '../../../js/enums/soknadtyper';
import { getSendtSoknadSelvstendig } from '../../mock/mockSoknadSelvstendig';
import { KORRIGERT, SENDT } from '../../../js/enums/soknadstatuser';
import SykmeldingUtdragForSelvstendige
    from '../../../js/components/sykepengesoknad-selvstendig/SykmeldingUtdragForSelvstendige';
import Soknadtopp from '../../../js/components/soknad-felles/Soknadtopp';
import EndreSoknadContainer from '../../../js/containers/sykepengesoknad-selvstendig/EndreSoknadContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SendtSoknadSelvstendigTest', () => {
    const sendtSoknad = getSendtSoknadSelvstendig({ id: 'soknad1', sykmeldingId: 'sykmelding1' });
    const tilhorendeSykmelding = getSykmelding({
        id: 'sykmelding1',
        valgtArbeidssituasjon: SELVSTENDIGE_OG_FRILANSERE,
    });

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const mockStore = configureMockStore(middlewares);

    let state;

    beforeEach(() => {
        state = {
            dineSykmeldinger: {
                data: [tilhorendeSykmelding],
            },
            soknader: {
                data: [sendtSoknad],
            },
            unleashToggles: {
                data: [],
                hentingFeilet: false,
            },
        };
    });

    it('Skal ha en soknadstopp', () => {
        const component = mount(<Provider store={mockStore(state)}>
            <SendtSoknadSelvstendig
                sykmelding={getSykmelding({ id: 'sykmelding1' })}
                soknad={getSendtSoknadSelvstendig({ id: 'soknad1', sykmeldingId: 'sykmelding1' })}
                kanViseKorrigering={false}
                params={{ sykepengesoknadId: 'soknad1' }} />
        </Provider>);
        expect(component.find(Soknadtopp)).to.be.length(1);
    });

    it('Skal ha et statuspanel', () => {
        const component = mount(<Provider store={mockStore(state)}>
            <SendtSoknadSelvstendig
                sykmelding={getSykmelding({ id: 'sykmelding1' })}
                soknad={getSendtSoknadSelvstendig({ id: 'soknad1', sykmeldingId: 'sykmelding1' })}
                kanViseKorrigering={false}
                params={{ sykepengesoknadId: 'soknad1' }} />
        </Provider>);
        expect(component.find(SendtSoknadSelvstendigStatuspanel)).to.be.length(1);
    });

    it('Skal ha et utdrag av sykmeldingen', () => {
        const component = mount(<Provider store={mockStore(state)}>
            <SendtSoknadSelvstendig
                sykmelding={getSykmelding({ id: 'sykmelding1' })}
                soknad={getSendtSoknadSelvstendig({ id: 'soknad1', sykmeldingId: 'sykmelding1' })}
                kanViseKorrigering={false}
                params={{ sykepengesoknadId: 'soknad1' }} />
        </Provider>);
        expect(component.find(SykmeldingUtdragForSelvstendige)).to.be.length(1);
    });

    it('Skal ha to oppsummeringsblokker', () => {
        const component = mount(<Provider store={mockStore(state)}>
            <SendtSoknadSelvstendig
                sykmelding={getSykmelding({ id: 'sykmelding1' })}
                soknad={getSendtSoknadSelvstendig({ id: 'soknad1', sykmeldingId: 'sykmelding1' })}
                kanViseKorrigering={false}
                params={{ sykepengesoknadId: 'soknad1' }} />
        </Provider>);
        expect(component.find('.js-soknad-oppsummering')).to.be.length(2);
    });

    it('Skal ikke vise tilhørende søknader om søknaden er korrigert', () => {
        const korrigertSoknad = getSendtSoknadSelvstendig({ id: 'korrigert1', status: KORRIGERT, korrigertAv: 'soknad1' });
        state.soknader.data = [...state.soknader.data, korrigertSoknad];

        const component = mount(<Provider store={mockStore(state)}>
            <SendtSoknadSelvstendig
                sykmelding={getSykmelding({ id: 'sykmelding1' })}
                soknad={korrigertSoknad}
                kanViseKorrigering={false}
                params={{ sykepengesoknadId: 'korrigert1' }} />
        </Provider>);
        expect(component.find(RelaterteSoknaderContainer)).to.be.length(0);
    });

    it('Skal vise lenke til korrigering tilhørende søknader om søknaden er korrigert', () => {
        const korrigertSoknad = getSendtSoknadSelvstendig({ id: 'korrigert1', status: KORRIGERT, korrigertAv: 'soknad1' });
        state.soknader.data = [...state.soknader.data, korrigertSoknad];

        const component = mount(<Provider store={mockStore(state)}>
            <SendtSoknadSelvstendig
                sykmelding={getSykmelding({ id: 'sykmelding1' })}
                soknad={korrigertSoknad}
                kanViseKorrigering={false}
                params={{ sykepengesoknadId: 'korrigert1' }} />
        </Provider>);
        expect(component.find(RelaterteSoknaderContainer)).to.be.length(0);
    });
});

describe('SendtSoknadSelvstendigStatuspanel', () => {
    const sendtSoknad = getSendtSoknadSelvstendig({ id: 'soknad1', sykmeldingId: 'sykmelding1', status: SENDT });

    it('Viser endreknapp om soknad har status sendt og toggle på', () => {
        const component = shallow(<SendtSoknadSelvstendigStatuspanel soknad={sendtSoknad} kanViseKorrigering />);
        expect(component.find(EndreSoknadContainer)).to.be.length(1);
    });

    it('Viser ikke endreknapp om soknad har status sendt og toggle av', () => {
        const component = shallow(<SendtSoknadSelvstendigStatuspanel soknad={sendtSoknad} kanViseKorrigering={false} />);
        expect(component.find(EndreSoknadContainer)).to.be.length(0);
    });

    it('Viser ikke endreknapp om soknad er ikke har status sendt og toggle av', () => {
        const component = shallow(<SendtSoknadSelvstendigStatuspanel
            soknad={Object.assign({}, sendtSoknad, { status: KORRIGERT })}
            kanViseKorrigering={false} />);
        expect(component.find(EndreSoknadContainer)).to.be.length(0);
    });
});
