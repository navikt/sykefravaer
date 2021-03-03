import React from 'react';
import cn from 'classnames';
import { getLedetekst } from '../../digisyfoNpm';
import BekreftLestAvvistSykmeldingSkjema from './BekreftLestAvvistSykmeldingSkjema';
import SykmeldingContext from '../contexts/SykmeldingContext';
import Sidetopp from '../../components/Sidetopp';
import { AvvistSykmeldingPanel } from './AvvistSykmeldingPanel';
import { AvvistSykmeldingStatuspanel } from './AvvistSykmeldingStatuspanel';
import { SykmeldingOpplysninger } from './SykmeldingOpplysninger';
import { AvvistSykmeldingTrigger } from '../../components/HotjarTrigger';

const AvvistSykmelding = () => {
    return (
        <SykmeldingContext.Consumer>
            {
                ({ smSykmelding }) => {
                    return (
                        <AvvistSykmeldingTrigger>
                            <Sidetopp className={cn({ 'blokk--xl': !smSykmelding.bekreftetDato })} tittel={getLedetekst('din-sykmelding.tittel')} />
                            <AvvistSykmeldingStatuspanel smSykmelding={smSykmelding} />
                            <AvvistSykmeldingPanel smSykmelding={smSykmelding} />
                            <SykmeldingOpplysninger smSykmelding={smSykmelding} />
                            <BekreftLestAvvistSykmeldingSkjema smSykmelding={smSykmelding} />
                        </AvvistSykmeldingTrigger>
                    );
                }
            }
        </SykmeldingContext.Consumer>
    );
};

export default AvvistSykmelding;
