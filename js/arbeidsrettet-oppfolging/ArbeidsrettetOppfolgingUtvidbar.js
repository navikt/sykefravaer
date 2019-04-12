import React from 'react';
import PropTypes from 'prop-types';
import { Utvidbar } from '@navikt/digisyfo-npm';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const ArbeidsrettetOppfolgingUtvidbar = ({ tittel, introTekst, utvidbarTittel, utvidbarInnhold, onClick }) => {
    return (<ArbeidsrettetOppfolgingRad tittel={tittel}>
        <div className="blokk" dangerouslySetInnerHTML={introTekst} />
        <Utvidbar tittel={utvidbarTittel} className="blokk--s" onClick={onClick}>
            <div
                className="redaksjonelt-innhold arbeidsrettetOppfolgingUtvidbar"
                dangerouslySetInnerHTML={utvidbarInnhold} />
        </Utvidbar>
    </ArbeidsrettetOppfolgingRad>);
};

ArbeidsrettetOppfolgingUtvidbar.propTypes = {
    tittel: PropTypes.string,
    introTekst: PropTypes.shape({
        __html: PropTypes.string,
    }),
    utvidbarTittel: PropTypes.string,
    utvidbarInnhold: PropTypes.shape({
        __html: PropTypes.string,
    }),
    onClick: PropTypes.func,
};

export default ArbeidsrettetOppfolgingUtvidbar;
