import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import SykmeldingContext from '../contexts/SykmeldingContext';
import Sidetopp from '../../components/Sidetopp';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

const Begrunnelse = ({ smSykmelding }) => {
    return smSykmelding && smSykmelding.behandlingsutfall && smSykmelding.behandlingsutfall.ruleHits
        ? (
            smSykmelding.behandlingsutfall.ruleHits.length === 1
                ? <p>{smSykmelding.behandlingsutfall.ruleHits[0].messageForUser}</p>
                : (<ul>
                    {
                        smSykmelding.behandlingsutfall.ruleHits.map((ruleHit) => {
                            return <li>{ruleHit.messageForUser}</li>;
                        })
                    }
                </ul>)
        )
        : null;
};

Begrunnelse.propTypes = {
    smSykmelding: smSykmeldingPt,
};

const AvvistSykmelding = () => {
    return (<SykmeldingContext.Consumer>
        {
            ({ smSykmelding }) => {
                return (<React.Fragment>
                    <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
                    <div className="panel">
                        <IllustrertInnhold ikon="/sykefravaer/img/svg/forstorrelsesglass.svg" ikonAlt="Advarsel/utropstegn">
                            <h2 className="panel__tittel">
                                Denne sykmeldingen er avvist. Du bør kontakte den som har sykmeldt deg for å få en ny
                            </h2>
                            <Begrunnelse smSykmelding={smSykmelding} />
                        </IllustrertInnhold>
                    </div>
                </React.Fragment>);
            }
        }
    </SykmeldingContext.Consumer>);
};

export default AvvistSykmelding;
