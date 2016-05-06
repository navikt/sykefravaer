import React, { PropTypes } from 'react';
import Brodsmuler from '../components/Brodsmuler.js';
const DocumentTitle = require('react-document-title');

const Side = ({ children, tittel, brodsmuler = [] }) => {
    return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
        <div className="begrensning side-syfofront">
            <Brodsmuler brodsmuler={brodsmuler} />
            {children}
        </div>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.object,
    tittel: PropTypes.string,
    brodsmuler: PropTypes.array,
};

export default Side;
