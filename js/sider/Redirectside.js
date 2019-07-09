import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Side from './Side';
import { getSykepengesoknaderUrl } from '../utils/urlUtils';

class RedirectsideComponent extends Component {
    componentDidMount() {
        window.location.href = this.props.redirectPath;
    }

    render() {
        return (<Side tittel="Sender videre...">
            <div className="panel">
                <h1 className="panel__tittel">Du blir sendt videre...</h1>
                <p className="sist"><a href={this.props.redirectPath} className="lenke">Gå videre!</a></p>
            </div>
        </Side>);
    }
}

RedirectsideComponent.propTypes = {
    redirectPath: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
    const redirectPath = ownProps.location.pathname.replace(process.env.REACT_APP_CONTEXT_ROOT, getSykepengesoknaderUrl());
    return {
        redirectPath,
    };
};

const Redirectside = connect(mapStateToProps)(RedirectsideComponent);

export default Redirectside;
