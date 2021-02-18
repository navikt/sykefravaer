import React from 'react';
import smSykmeldinger from '../data/sm-sykmeldinger/smSykmeldinger';
import mockSmSykmelding from '../../../test/mock/mockSmSykmelding';
import mountWithStore from '../../../test/mountWithStore';
import BekreftLestAvvistSykmeldingSkjema from './BekreftLestAvvistSykmeldingSkjema';
import expect from '../../../test/expect';

describe('BekreftLestAvvistSykmeldingSkjema', () => {
    let state;

    beforeEach(() => {
        state = {
            smSykmeldinger: smSykmeldinger(),
        };
    });

    it('Skal vise skjema når sykmelding ikke er bekreftet', () => {
        const smSykmelding = mockSmSykmelding();
        const component = mountWithStore(<BekreftLestAvvistSykmeldingSkjema smSykmelding={smSykmelding} />, state);
        expect(component.find('form')).to.have.length(1);
    });

    it('Skal ikke vise skjema når sykmelding er bekreftet', () => {
        const smSykmelding = mockSmSykmelding({
            sykmeldingStatus: {
                timestamp: new Date(),
                statusEvent: 'BEKREFTET',
            },
        });
        const component = mountWithStore(<BekreftLestAvvistSykmeldingSkjema smSykmelding={smSykmelding} />, state);
        expect(component.find('form')).to.have.length(0);
    });
});
