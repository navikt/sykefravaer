import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, toDatePrettyPrint, sykepengesoknadstatuser, tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from 'digisyfo-npm';
import getContextRoot from '../../utils/getContextRoot';
import { sykepengesoknad as sykepengesoknadPt, soknad as soknadPt } from '../../propTypes';
import { getSendtTilSuffix, erSendtTilBeggeMenIkkeSamtidig } from '../../utils/sykepengesoknadUtils';
import { ARBEIDSTAKERE, OPPHOLD_UTLAND, SELVSTENDIGE_OG_FRILANSERE } from '../../enums/soknadtyper';
import { FREMTIDIG } from '../../enums/soknadstatuser';

const { NY, SENDT, TIL_SENDING, UTKAST_TIL_KORRIGERING, AVBRUTT } = sykepengesoknadstatuser;

export const SendtUlikt = ({ soknad }) => {
    return (<span>
        {
            getLedetekst('soknad.teaser.status.SENDT.til-arbeidsgiver', {
                '%DATO%': toDatePrettyPrint(soknad.sendtTilArbeidsgiverDato),
                '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
            })
        }
        <br />
        {
            getLedetekst('soknad.teaser.status.SENDT.til-nav', {
                '%DATO%': toDatePrettyPrint(soknad.sendtTilNAVDato),
            })
        }
    </span>);
};

SendtUlikt.propTypes = {
    soknad: sykepengesoknadPt.isRequired,
};

const visIkon = (soknadstype) => {
    return soknadstype === OPPHOLD_UTLAND
        ? (<img alt="" className="js-ikon" src="/sykefravaer/img/svg/globe.svg" />)
        : <img alt="" className="js-ikon" src="/sykefravaer/img/svg/soknader.svg" />;
};

const visIkonHover = (soknadstype) => {
    return soknadstype === OPPHOLD_UTLAND
        ? (<img alt="" className="js-ikon" src="/sykefravaer/img/svg/globe-hover.svg" />)
        : <img alt="" className="js-ikon" src="/sykefravaer/img/svg/soknader_hover-blue.svg" />;
};

const beregnUndertekst = (soknad) => {
    const sendtTilBeggeMenIkkeSamtidig = erSendtTilBeggeMenIkkeSamtidig(soknad);

    if (soknad.status === AVBRUTT) {
        return getLedetekst('soknad.teaser.status.AVBRUTT', {
            '%DATO%': tilLesbarDatoMedArstall(soknad.avbruttDato),
        });
    }

    if (soknad.status === FREMTIDIG) {
        return getLedetekst(`soknad.teaser.status.${FREMTIDIG}`);
    }

    switch (soknad.soknadstype) {
        case OPPHOLD_UTLAND: {
            switch (soknad.status) {
                case SENDT: {
                    return getLedetekst('soknad.teaser.status.SENDT.til-nav', {
                        '%DATO%': tilLesbarDatoMedArstall(soknad.innsendtDato),
                    });
                }
                default: {
                    return null;
                }
            }
        }
        case SELVSTENDIGE_OG_FRILANSERE: {
            switch (soknad.status) {
                case SENDT: {
                    return getLedetekst('soknad.teaser.status.SENDT.til-nav', {
                        '%DATO%': tilLesbarDatoMedArstall(soknad.innsendtDato),
                    });
                }
                default: {
                    return null;
                }
            }
        }
        case ARBEIDSTAKERE: {
            switch (soknad.status) {
                case UTKAST_TIL_KORRIGERING:
                case NY: {
                    const arbeidsgiver = soknad.arbeidsgiver
                        ? soknad.arbeidsgiver.navn
                        : soknad.sykmelding
                            ? soknad.sykmelding.innsendtArbeidsgivernavn
                            : null;
                    return arbeidsgiver
                        ? getLedetekst('soknad.teaser.undertekst', {
                            '%ARBEIDSGIVER%': arbeidsgiver,
                        })
                        : null;
                }
                default: {
                    return null;
                }
            }
        }
        default: {
            switch (soknad.status) {
                case SENDT:
                case TIL_SENDING: {
                    return sendtTilBeggeMenIkkeSamtidig
                        ? <SendtUlikt soknad={soknad} />
                        : getLedetekst(`soknad.teaser.status.${soknad.status}${getSendtTilSuffix(soknad)}`, {
                            '%DATO%': tilLesbarDatoMedArstall(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato),
                            '%ARBEIDSGIVER%': soknad.arbeidsgiver ? soknad.arbeidsgiver.navn : null,
                        });
                }
                case NY:
                case UTKAST_TIL_KORRIGERING: {
                    return getLedetekst('soknad.teaser.undertekst', {
                        '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
                    });
                }
                default: {
                    return null;
                }
            }
        }
    }
};

export const TeaserUndertekst = ({ soknad }) => {
    const tekst = beregnUndertekst(soknad);
    return tekst ? (<p className="inngangspanel__undertekst js-undertekst mute">
        {tekst}
    </p>) : null;
};

TeaserUndertekst.propTypes = {
    soknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]).isRequired,
};

export const TeaserStatus = ({ soknad }) => {
    const visStatus = [NY, SENDT, AVBRUTT].indexOf(soknad.status) === -1;
    return visStatus ? (<p className="inngangspanel__status js-status">
        {
            getLedetekst(`soknad.teaser.status.${soknad.status}`, {
                '%DATO%': tilLesbarDatoMedArstall(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato),
            })
        }
    </p>) : null;
};

TeaserStatus.propTypes = {
    soknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]).isRequired,
};

export const TeaserTittel = ({ soknad }) => {
    return (<h3 className="js-title" id={`soknad-header-${soknad.id}`}>
        <small className="inngangspanel__meta js-meta">
            {
                getLedetekst('soknad.teaser.dato', {
                    '%DATO%':
                        tilLesbarDatoMedArstall(
                            soknad.soknadstype === OPPHOLD_UTLAND || soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE
                                ? soknad.opprettetDato
                                : soknad.tom,
                        ),
                })
            }
        </small>
        <span className="inngangspanel__tittel">
            {
                getLedetekst(soknad.soknadstype === OPPHOLD_UTLAND
                    ? 'soknad.utland.teaser.tittel'
                    : 'soknad.teaser.tittel')
            }
        </span>
    </h3>);
};

TeaserTittel.propTypes = {
    soknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]).isRequired,
};

export const TeaserPeriode = ({ soknad }) => {
    return soknad.soknadstype !== OPPHOLD_UTLAND
        ? (<p className="inngangspanel__tekst js-tekst">
            {
                getLedetekst('soknad.teaser.tekst', {
                    '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                })
            }
        </p>)
        : null;
};

TeaserPeriode.propTypes = {
    soknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]).isRequired,
};

const SykepengesoknadTeaser = ({ soknad }) => {
    const status = soknad.status ? soknad.status.toLowerCase() : '';
    return (<article aria-labelledby={`soknader-header-${soknad.id}`}>
        <Link
            className={`inngangspanel js-panel js-soknad-${status}`}
            to={`${getContextRoot()}/soknader/${soknad.id}`}>
            <span className="inngangspanel__ikon inngangspanel__ikon--normal">
                {visIkon(soknad.soknadstype)}
            </span>
            <span className="inngangspanel__ikon inngangspanel__ikon--hover">
                {visIkonHover(soknad.soknadstype)}
            </span>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <TeaserTittel soknad={soknad} />
                    <TeaserStatus soknad={soknad} />
                </header>
                <TeaserPeriode soknad={soknad} />
                <TeaserUndertekst soknad={soknad} />
            </div>
        </Link>
    </article>);
};

SykepengesoknadTeaser.propTypes = {
    soknad: PropTypes.oneOfType([sykepengesoknadPt, soknadPt]).isRequired,
};

export default SykepengesoknadTeaser;
