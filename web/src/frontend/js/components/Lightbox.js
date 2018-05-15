import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Vis } from '../utils';

class Lightbox extends Component {
    constructor(props) {
        super(props);
        this.lukk = this.lukk.bind(this);
        this.fjernTabIndex = this.fjernTabIndex.bind(this);
        this.state = {
            erApen: true,
            tabIndex: '-1',
        };
    }

    componentDidMount() {
        this.lightbox.focus();
    }

    fjernTabIndex() {
        this.setState({
            tabIndex: null,
        });
    }

    lukk() {
        const { onClose } = this.props;
        if (onClose) {
            onClose();
        }
        this.setState({
            erApen: false,
        });
    }

    render() {
        const { children } = this.props;
        return (<Vis hvis={this.state.erApen}>
            <div className="lightbox">
                <div
                    onBlur={this.fjernTabIndex}
                    tabIndex={this.state.tabIndex}
                    className="lightbox__innhold"
                    ref={(c) => {
                        this.lightbox = c;
                    }}>
                    <button
                        onClick={this.lukk}
                        className="lightbox__lukk js-lukk">Lukk</button>
                    {children}
                </div>
            </div>
        </Vis>);
    }
}

Lightbox.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onClose: PropTypes.func,
    lukkbar: PropTypes.bool,
};

export default Lightbox;
