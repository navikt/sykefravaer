import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import PropTypes from 'prop-types';
import { arbeidssituasjoner, sykmeldingstatuser } from '@navikt/digisyfo-npm';
import { mount, shallow } from 'enzyme';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
import Sinon from 'sinon';
import getSykmelding from '../../../test/mock/mockSykmeldinger';
import NySykmelding from './NySykmelding';
import PapirsykmeldingPanel from './PapirsykmeldingPanel';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('NySykmelding', () => {
    it('Viser bjørn for vanlig sykmelding', () => {
        const sykmelding = getSykmelding({
            id: '1',
            status: sykmeldingstatuser.NY,
            valgtArbeidssituasjon: arbeidssituasjoner.ARBEIDSTAKER,
            erUtenforVentetid: true,
            skalOppretteSoknad: true,
        });

        const SykmeldingContext = React.createContext({ sykmelding });
        Sinon.mock('../contexts/SykmeldingContext', () => {
            return {
                Consumer: ({ sykmelding }) => { sykmelding; },
            };
        });
        // chai.spyOn(SykmeldingContext, 'Consumer').mockImplementation(() => { return { sykmelding }; });

        const component = shallow(

            <NySykmelding />,

        );
        expect(component.find(Bjorn)).to.have.length(1);
    });
});
