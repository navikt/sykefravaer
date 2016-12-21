import React, { PropTypes, Component } from 'react';

class Lightbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: true,
        };
    }

    componentDidMount() {
        this.refs.lukk.focus();
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
        if (!this.state.erApen) {
            return null;
        }
        return (<div className="lightbox">
            <div className="lightbox__innhold">
                <button onClick={() => {
                    this.lukk();
                }} className="lightbox__lukk js-lukk" ref="lukk">Lukk</button>
                {children}
            </div>
        </div>);
    }
}

Lightbox.propTypes = {
    children: PropTypes.object,
    onClose: PropTypes.func,
};

export default Lightbox;
