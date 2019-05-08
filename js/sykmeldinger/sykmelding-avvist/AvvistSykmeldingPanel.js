import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import {
    BEHANDLER_IKKE_GYLDIG_I_HPR,
    BEHANDLER_IKKE_LE_KI_MT_TL_FT_I_HPR,
    BEHANDLER_MANGLER_AUTORISASJON_I_HPR,
    BEHANDLER_SUSPENDERT,
    PASIENT_ELDRE_ENN_70,
    UGYLDIG_REGELSETTVERSJON,
} from '../../enums/avvisningsregelnavn';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';
import Mann from '../../components/svg/Mann';

const REGELNAVN_INGEN_RETT_TIL_A_SYKMELDE = [
    BEHANDLER_IKKE_GYLDIG_I_HPR,
    BEHANDLER_MANGLER_AUTORISASJON_I_HPR,
    BEHANDLER_IKKE_LE_KI_MT_TL_FT_I_HPR,
    BEHANDLER_SUSPENDERT,
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
        return regelnavn === PASIENT_ELDRE_ENN_70;
    });
    const ugyldigVersjon = regelnavnliste.find((regelnavn) => {
        return regelnavn === UGYLDIG_REGELSETTVERSJON;
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

    return ' Du må derfor be den som har sykmeldt deg om ny sykmelding. ';
};

const hentIntrotekst = (smSykmelding) => {
    const intro = `Du har fått en sykmelding${smSykmelding.legeNavn ? ` fra ${smSykmelding.legeNavn}` : ''}, men den kan ikke brukes fordi`;
    const standardtekst = `${intro} det er gjort en feil i utfyllingen. `;
    const overSyttitekst = `${intro} du er over 70 år. `;
    const ugyldigSykmeldingversjonTekst = `${intro} det er brukt en ugyldig versjon av sykmeldingen. `;
    const ingenAutorisasjonTekst = `${intro} den som skrev sykmeldingen manglet autorisasjon.`;
    const regelnavnliste = hentRegelnavnListe(smSykmelding);
    if (regelnavnliste.includes(PASIENT_ELDRE_ENN_70)) {
        return overSyttitekst;
    }

    if (regelnavnliste.includes(UGYLDIG_REGELSETTVERSJON)) {
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
        <h3 className="typo-element" style={{ marginBottom: '1em' }}>{overskrift}</h3>
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
        PASIENT_ELDRE_ENN_70,
        UGYLDIG_REGELSETTVERSJON,
        BEHANDLER_IKKE_GYLDIG_I_HPR,
        BEHANDLER_MANGLER_AUTORISASJON_I_HPR,
        BEHANDLER_IKKE_LE_KI_MT_TL_FT_I_HPR,
        BEHANDLER_SUSPENDERT,
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
