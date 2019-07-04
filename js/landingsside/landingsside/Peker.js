import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Peker = ({
    ekstern, to, tittel, undertittel, ikon, ikonAlt,
}) => {
    const Tag = ekstern ? 'a' : Link;
    return (
        <Tag
            className="peker"
            href={ekstern ? to : null}
            to={ekstern ? null : to}>
            <div className="peker__ikon">
                <img
                    className="peker__ikonBilde peker__ikonBilde--standard"
                    src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/${ikon}.svg`}
                    alt={ikonAlt}
                />
                <img
                    className="peker__ikonBilde peker__ikonBilde--hover"
                    src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/${ikon}_hover.svg`}
                    alt={ikonAlt}
                />
            </div>
            <div className="peker__innhold">
                <h2 className="peker__tittel">{tittel}</h2>
                {undertittel && <p className="peker__undertittel">{undertittel}</p>}
            </div>
        </Tag>
    );
};

Peker.propTypes = {
    ikon: PropTypes.string.isRequired,
    ikonAlt: PropTypes.string.isRequired,
    tittel: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    ekstern: PropTypes.bool,
    undertittel: PropTypes.string,
};

export default Peker;
