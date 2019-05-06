import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Veilederpanel from 'nav-frontend-veilederpanel';
import BekreftLestAvvistSykmeldingSkjema from './BekreftLestAvvistSykmeldingSkjema';
import SykmeldingContext from '../contexts/SykmeldingContext';
import Sidetopp from '../../components/Sidetopp';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';
import {
    BEHANDLER_NOT_LE_KI_MT_TL_IN_HPR,
    BEHANDLER_NOT_VALID_AUTHORIZATION_IN_HPR,
    BEHANDLER_NOT_VALID_IN_HPR, BEHANDLER_SUSPENDED,
    INVALID_RULESET_VERSION,
    PATIENT_OVER_70_YEARS,
} from '../../enums/avvisningsregelnavn';
import Mann from '../../components/svg/Mann';

const REGELNAVN_INGEN_RETT_TIL_A_SYKMELDE = [
    BEHANDLER_NOT_VALID_IN_HPR,
    BEHANDLER_NOT_VALID_AUTHORIZATION_IN_HPR,
    BEHANDLER_NOT_LE_KI_MT_TL_IN_HPR,
    BEHANDLER_SUSPENDED,
];

const hentRegelnavnListe = (smSykmelding) => {
    return smSykmelding.behandlingsutfall.ruleHits
        .map((ruleHit) => {
            return ruleHit.ruleName;
        });
};

const hentHarIkkeRettTilASykmelde = (smSykmelding) => {
    return hentRegelnavnListe(smSykmelding)
        .reduce((acc, regelnavn) => {
            return acc || REGELNAVN_INGEN_RETT_TIL_A_SYKMELDE.includes(regelnavn);
        }, false);
};

export const hentHandlingsstreng = (smSykmelding) => {
    const regelnavnliste = hentRegelnavnListe(smSykmelding);

    const brukerErOver70 = regelnavnliste.find((regelnavn) => {
        return regelnavn === PATIENT_OVER_70_YEARS;
    });
    const ugyldigVersjon = regelnavnliste.find((regelnavn) => {
        return regelnavn === INVALID_RULESET_VERSION;
    });
    const ikkeRettTilASykmelde = hentHarIkkeRettTilASykmelde(smSykmelding);

    if (brukerErOver70) {
        return ' Du kan i stedet be om en skriftlig bekreftelse på at du er syk. ';
    }

    if (ugyldigVersjon) {
        return ' Du bør kontakte den som har sykmeldt deg eller få sykmelding fra en annen behandler. ';
    }

    if (ikkeRettTilASykmelde) {
        return ' Du må oppsøke en som har rett til å sykmelde. ';
    }

    return ' Du må derfor be om ny sykmelding. ';
};

const hentIntrotekst = (smSykmelding) => {
    const intro = `Du har fått en sykmelding${smSykmelding.legeNavn ? ` fra ${smSykmelding.legeNavn}` : ''}, men den kan ikke brukes fordi`;
    const standardtekst = `${intro} det er gjort en feil i utfyllingen. `;
    const overSyttitekst = `${intro} du er over 70 år. `;
    const ugyldigSykmeldingversjonTekst = `${intro} det er brukt en ugyldig versjon av sykmeldingen. `;
    const ingenAutorisasjonTekst = `${intro} den som skrev sykmeldingen manglet autorisasjon.`;
    const regelnavnliste = hentRegelnavnListe(smSykmelding);
    if (regelnavnliste.includes(PATIENT_OVER_70_YEARS)) {
        return overSyttitekst;
    }

    if (regelnavnliste.includes(INVALID_RULESET_VERSION)) {
        return ugyldigSykmeldingversjonTekst;
    }

    if (hentHarIkkeRettTilASykmelde(smSykmelding)) {
        return ingenAutorisasjonTekst;
    }
    return standardtekst;
};

const BegrunnelseTekst = ({ smSykmelding }) => {
    const overskrift = 'Grunnen til at sykmeldingen er avvist:';
    return (<React.Fragment>
        <h3 className="typo-normal" style={{ marginBottom: '1em' }}>{overskrift}</h3>
        {
            smSykmelding.behandlingsutfall.ruleHits.length === 1
                ? (<p>{smSykmelding.behandlingsutfall.ruleHits[0].messageForUser}</p>)
                : (<ul>
                    {
                        smSykmelding.behandlingsutfall.ruleHits.map((ruleHit) => {
                            return <li key={ruleHit.ruleName}>{ruleHit.messageForUser}</li>;
                        })
                    }
                </ul>)
        }
    </React.Fragment>);
};

BegrunnelseTekst.propTypes = {
    smSykmelding: smSykmeldingPt,
};

const Begrunnelse = ({ smSykmelding }) => {
    const reglerUtenBegrunnelse = [
        PATIENT_OVER_70_YEARS,
        INVALID_RULESET_VERSION,
        BEHANDLER_NOT_VALID_IN_HPR,
        BEHANDLER_NOT_VALID_AUTHORIZATION_IN_HPR,
        BEHANDLER_NOT_LE_KI_MT_TL_IN_HPR,
        BEHANDLER_SUSPENDED,
    ];
    const visBegrunnelse = smSykmelding
        && smSykmelding.behandlingsutfall
        && smSykmelding.behandlingsutfall.ruleHits
        && !smSykmelding.behandlingsutfall.ruleHits.reduce((acc, ruleHit) => {
            return acc || reglerUtenBegrunnelse.includes(ruleHit.ruleName);
        }, false);

    return visBegrunnelse
        ? <BegrunnelseTekst smSykmelding={smSykmelding} />
        : null;
};

Begrunnelse.propTypes = {
    smSykmelding: smSykmeldingPt,
};

export const AvvistSykmeldingPanel = ({ smSykmelding }) => {
    const handlingstreng = hentHandlingsstreng(smSykmelding);
    const introtekststreng = hentIntrotekst(smSykmelding);
    return (<div className="blokk">
        <Veilederpanel
            fargetema="feilmelding"
            type="plakat"
            center
            kompakt
            svg={<Mann />}
            veilederProps={{ center: true, storrelse: 'S' }}>
            <h2 className="veilederpanel__tittel">
                Sykmeldingen er avvist av NAV
            </h2>
            <p>
                {introtekststreng}
                {handlingstreng}
            </p>
            <Begrunnelse smSykmelding={smSykmelding} />
        </Veilederpanel>
    </div>);
};

AvvistSykmeldingPanel.propTypes = {
    smSykmelding: smSykmeldingPt,
};

const AvvistSykmelding = () => {
    return (<SykmeldingContext.Consumer>
        {
            ({ smSykmelding }) => {
                return (<React.Fragment>
                    <Sidetopp className="blokk--xl" tittel={getLedetekst('din-sykmelding.tittel')} />
                    <AvvistSykmeldingPanel smSykmelding={smSykmelding} />
                    <BekreftLestAvvistSykmeldingSkjema smSykmelding={smSykmelding} />
                </React.Fragment>);
            }
        }
    </SykmeldingContext.Consumer>);
};

export default AvvistSykmelding;
