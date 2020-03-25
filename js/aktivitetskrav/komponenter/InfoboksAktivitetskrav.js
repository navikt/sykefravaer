import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { skalViseAktivitetskravInformasjon } from '../../data/unleash-toggles/unleashTogglesSelectors';
import { MED_ARBEIDSGIVER } from '../../landingsside/tidslinje-utdrag/TidslinjeUtdrag';
import { getVisning, getSykefravaerVarighet } from '../../landingsside/tidslinje-utdrag/TidslinjeutdragContainer';

const tekster = {
    tittel: 'Aktivitetskrav i sykefraværet',
    aktivitetskravParagraf1: 'Vanligvis vurderer NAV om du oppfyller aktivitetskravet når du har vært sykmeldt i 8 uker.',
    aktivitetskravParagraf2: 'Under korona-epidemien går hensynet til smittevern foran kravet til aktivitet. Derfor vil '
                           + 'vi ikke kreve at du skal være i aktivitet utenfor hjemmet ditt.',
    aktivitetskravParagraf3: 'Kan du utføre noe arbeid hjemmefra, bør du holde kontakt med arbeidsgiveren din.',
    aktivitetskravParagraf4: 'Hvis du ikke har arbeidsgiver, og du ikke kan utføre aktiviteter som du har avtalt med NAV '
                           + 'hjemmefra, vil du også få unntak fra aktivitetskravet.',
    aktivitetskravParagraf5: 'Du trenger ikke ta kontakt med NAV nå.',
};

const sykeforlopHarPassertAktivitetsvarsel = (state) => {
    const { startdato } = state.sykeforloep;
    if (!startdato) {
        return false;
    }

    const antallDagerIForlopet = getSykefravaerVarighet(state);
    if (getVisning(state) === MED_ARBEIDSGIVER) {
        return (antallDagerIForlopet >= 43 && antallDagerIForlopet <= 56);
    }
    return (antallDagerIForlopet >= 17 && antallDagerIForlopet <= 56);
};

const InfoboksTekst = () => {
    return (
        <React.Fragment>
            <p>
                {tekster.aktivitetskravParagraf1}
                <br />
                {tekster.aktivitetskravParagraf2}
                <br />
                {tekster.aktivitetskravParagraf3}
            </p>
            <p>{tekster.aktivitetskravParagraf4}</p>
            <p>{tekster.aktivitetskravParagraf5}</p>
        </React.Fragment>
    );
};

const InfoboksAktivitetskravComponent = (props) => {
    const { skalVise } = props;
    return (
        <div>
            { skalVise && (
                <Utvidbar
                    tittel={tekster.tittel}
                    className="blokk"
                    variant="lyserod"
                    Overskrift="h2">
                    <InfoboksTekst />
                </Utvidbar>
            ) }
        </div>
    );
};

InfoboksAktivitetskravComponent.propTypes = {
    skalVise: PropTypes.bool,
};

const mapStateToProps = (state) => {
    const skalViseAktivitetskravInfoboks = skalViseAktivitetskravInformasjon(state) === false && sykeforlopHarPassertAktivitetsvarsel(state);
    return {
        skalVise: skalViseAktivitetskravInfoboks,
    };
};

const InfoboksAktivitetskrav = connect(mapStateToProps)(InfoboksAktivitetskravComponent);

export default InfoboksAktivitetskrav;
