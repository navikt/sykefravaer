import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InnloggingContainer from '../containers/InnloggingContainer';
import AppSpinner from '../components/AppSpinner';
import Brodsmuler from '../components/Brodsmuler';
import { brodsmule as brodsmulePt } from '../propTypes';

const DocumentTitle = require('react-document-title');

export const setAppClass = (laster) => {
    const el = document.getElementById('maincontent');
    if (el) {
        if (laster) {
            el.className = 'app app--laster';
        } else {
            el.className = 'app';
        }
    }
};

export const getClassNames = (laster) => {
    if (laster) {
        return 'side side--laster';
    }
    return 'side side--lastet';
};

class Side extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visSpinnerIDom: props.laster,
        };
    }

    componentDidUpdate(prevProps) {
        if (!this.props.laster && prevProps.laster) {
            window.setTimeout(() => {
                this.setState({
                    visSpinnerIDom: false,
                });
            }, 800);
        }
    }

    render() {
        const { children, tittel, brodsmuler = [], laster, begrenset } = this.props;
        const classNames = getClassNames(laster, begrenset);
        setAppClass(laster);
        return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
            <div className={classNames} aria-busy={laster}>
                { this.state.visSpinnerIDom && <div className="side__spinner">
                    <AppSpinner />
                </div> }
                <div className={begrenset ? 'side__innhold side__innhold--begrenset js-begrensning' : 'side__innhold'}>
                    { begrenset && <Brodsmuler brodsmuler={brodsmuler} /> }
                    <InnloggingContainer>
                        {children}
                    </InnloggingContainer>
                </div>
            </div>
        </DocumentTitle>);
    }
}

Side.defaultProps = {
    brodsmuler: [],
    begrenset: true,
    laster: false,
};

Side.propTypes = {
    children: PropTypes.element,
    tittel: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    laster: PropTypes.bool,
    begrenset: PropTypes.bool,
};

export default Side;
