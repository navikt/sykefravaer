import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import BekreftLestAvvistSykmeldingSkjema from './BekreftLestAvvistSykmeldingSkjema';
import SykmeldingContext from '../contexts/SykmeldingContext';
import Sidetopp from '../../components/Sidetopp';
import IllustrertInnhold from '../../components/IllustrertInnhold';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

export const hentHandlingsstreng = (smSykmelding) => {
    // midlertidig, skal flyttes til sm-register senere
    const ikkeRettTilASykmeldeRegelnavn = [
        'BEHANDLER_NOT_VALID_IN_HPR',
        'BEHANDLER_NOT_VALID_AUTHORIZATION_IN_HPR',
        'BEHANDLER_NOT_LE_KI_MT_TL_IN_HPR',
        'BEHANDLER_SUSPENDED',
    ];

    const regelnavnliste = smSykmelding.behandlingsutfall.ruleHits
        .map((ruleHit) => {
            return ruleHit.ruleName;
        });

    const brukerErOver70 = regelnavnliste.find((regelnavn) => {
        return regelnavn === 'PATIENT_OVER_70_YEARS';
    });
    const ugyldigVersjon = regelnavnliste.find((regelnavn) => {
        return regelnavn === 'INVALID_RULESET_VERSION';
    });
    const ikkeRettTilASykmelde = regelnavnliste.reduce((acc, regelnavn) => {
        return acc || ikkeRettTilASykmeldeRegelnavn.indexOf(regelnavn) > -1;
    }, false);

    if (brukerErOver70) {
        return ' Du kan i stedet be om en bekreftelse hvis du trenger dokumentasjon på at du er syk.';
    }

    if (ugyldigVersjon) {
        return ' Du må sykmeldes av en som bruker riktig versjon av sykmeldingen.';
    }

    if (ikkeRettTilASykmelde) {
        return ' Du må oppsøke en som har rett til å sykmelde.';
    }

    return ' Du må be om ny sykmelding.';
};

const Begrunnelse = ({ smSykmelding }) => {
    return smSykmelding
        && smSykmelding.behandlingsutfall
        && smSykmelding.behandlingsutfall.ruleHits
        ? (<React.Fragment>
            <p>NAV har avvist sykmeldingen, fordi</p>
            <ul>
                {
                    smSykmelding.behandlingsutfall.ruleHits.map((ruleHit) => {
                        return <li key={ruleHit.ruleName}>{ruleHit.messageForUser}</li>;
                    })
                }
            </ul>
        </React.Fragment>)
        : null;
};

Begrunnelse.propTypes = {
    smSykmelding: smSykmeldingPt,
};

const AvvistSykmelding = () => {
    return (<SykmeldingContext.Consumer>
        {
            ({ smSykmelding }) => {
                const handling = hentHandlingsstreng(smSykmelding);
                return (<React.Fragment>
                    <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
                    <div className="panel blokk">
                        <div className="avvistSykmelding">
                            <IllustrertInnhold ikon="/sykefravaer/img/svg/avvist-sykmelding.svg" ikonAlt="Advarsel/utropstegn">
                                <h2 className="panel__tittel">
                                    Sykmeldingen er avvist av NAV
                                </h2>
                                <p>
                                    Du har fått en sykmelding, men den kan ikke brukes.
                                    {handling}
                                </p>
                                <Begrunnelse smSykmelding={smSykmelding} />
                            </IllustrertInnhold>
                        </div>
                    </div>
                    <BekreftLestAvvistSykmeldingSkjema smSykmelding={smSykmelding} />
                </React.Fragment>);
            }
        }
    </SykmeldingContext.Consumer>);
};

export default AvvistSykmelding;
