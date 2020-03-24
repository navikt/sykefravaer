import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { skalViseAktivitetskravInformasjon } from '../../data/unleash-toggles/unleashTogglesSelectors';
import { getAktivitetskravvisning, NYTT_AKTIVITETSKRAVVARSEL } from '../sider/AktivitetskravvarselSide';

const tekster = {
    tittel: 'Aktivitetskrav i sykefraværet',
    innhold: 'Vanligvis vurderer NAV om du oppfyller aktivitetskravet når du har vært sykmeldt i 8 uker. Under korona-epidemien går hensynet'
             + 'til smittevern foran kravet til aktivitet. Derfor vilvi ikke kreve at du skal være i aktivitet utenfor hjemmet ditt. Kan du utføre'
             + 'noe arbeid hjemmefra, bør du holde kontakt med arbeidsgiveren din. Hvis du ikke har arbeidsgiver, og du ikke kan utføre aktiviteter'
             + 'som du har avtalt med NAV hjemmefra, vil du også få unntak fra aktivitetskravet. Du trenger ikke ta kontakt med NAV nå.',
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
                    { tekster.innhold }
                </Utvidbar>
            ) }
        </div>
    );
};

InfoboksAktivitetskravComponent.propTypes = {
    skalVise: PropTypes.bool,
};

const mapStateToProps = (state) => {
    const skalViseAktitvetskravInfoboks = getAktivitetskravvisning(state.hendelser.data) === NYTT_AKTIVITETSKRAVVARSEL && skalViseAktivitetskravInformasjon(state) === false;
    return {
        skalVise: skalViseAktitvetskravInfoboks,
    };
};

const InfoboksAktivitetskrav = connect(mapStateToProps)(InfoboksAktivitetskravComponent);

export default InfoboksAktivitetskrav;
