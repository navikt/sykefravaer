import React from 'react';
import PropTypes from 'prop-types';

const Sidetopp = ({ tittel, htmlTekst }) => {
    return (<header className="sidetopp">
        <h1 className="sidetopp__tittel">
            {tittel}
        </h1>
        {
            htmlTekst && <div className="sidetopp__intro js-intro">
                <p dangerouslySetInnerHTML={htmlTekst} />
            </div>
        }
    </header>);
};

Sidetopp.propTypes = {
    tittel: PropTypes.string.isRequired,
    htmlTekst: PropTypes.shape({
        __html: PropTypes.string,
    }),
};

export default Sidetopp;
