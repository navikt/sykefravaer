import React, { PropTypes } from 'react';
import Brodsmuler from '../components/Brodsmuler';
const DocumentTitle = require('react-document-title');
import InnloggingContainer from '../containers/InnloggingContainer';
import { brodsmule as brodsmulePt } from '../propTypes';

const Side = ({ children, tittel, brodsmuler = [] }) => {
    return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
        <div className="begrensning side js-begrensning">
            <Brodsmuler brodsmuler={brodsmuler} />
            <InnloggingContainer>
                {children}
            </InnloggingContainer>
        </div>
    </DocumentTitle>);
};

Side.propTypes = {
    children: PropTypes.object,
    tittel: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
};

export default Side;
