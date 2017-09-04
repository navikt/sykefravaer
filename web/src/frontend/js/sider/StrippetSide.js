import React, { PropTypes } from 'react';
const DocumentTitle = require('react-document-title');
import InnloggingContainer from '../containers/InnloggingContainer';

const StrippetSide = ({ children, tittel }) => {
    return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
        <InnloggingContainer visSmuler>
            {children}
        </InnloggingContainer>
    </DocumentTitle>);
};

StrippetSide.propTypes = {
    children: PropTypes.object,
    tittel: PropTypes.string,
};

export default StrippetSide;
