import React from 'react';
import cn from 'classnames';
import { getLedetekst } from '@navikt/digisyfo-npm';
import BekreftLestAvvistSykmeldingSkjema from './BekreftLestAvvistSykmeldingSkjema';
import SykmeldingContext from '../contexts/SykmeldingContext';
import Sidetopp from '../../components/Sidetopp';
import { AvvistSykmeldingPanel } from './AvvistSykmeldingPanel';
import { AvvistSykmeldingStatuspanel } from './AvvistSykmeldingStatuspanel';

const AvvistSykmelding = () => {
    return (<SykmeldingContext.Consumer>
        {
            ({ smSykmelding }) => {
                return (<React.Fragment>
                    <Sidetopp className={cn({ 'blokk--xl': !smSykmelding.bekreftetDato })} tittel={getLedetekst('din-sykmelding.tittel')} />
                    <AvvistSykmeldingStatuspanel smSykmelding={smSykmelding} />
                    <AvvistSykmeldingPanel smSykmelding={smSykmelding} />
                    <BekreftLestAvvistSykmeldingSkjema smSykmelding={smSykmelding} />
                </React.Fragment>);
            }
        }
    </SykmeldingContext.Consumer>);
};

export default AvvistSykmelding;
