import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst, scrollTo } from 'digisyfo-npm';
import AvbrytSoknad from '../../components/sykepengesoknad/AvbrytSoknad';
import { avbrytSoknad } from '../../actions/sykepengesoknader_actions';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

class AvbrytSoknadContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erApen: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.erApen && this.state.erApen) {
            scrollTo(this.dialog);
        }
    }

    visAvbrytdialog() {
        this.setState({
            erApen: true,
        });
    }

    skjulAvbrytdialog() {
        this.setState({
            erApen: false,
        });
    }

    toggleAvbrytdialog() {
        this.setState({
            erApen: !this.state.erApen,
        });
    }

    render() {
        return (<div>
            <div className="avbrytDialog">
                <p className="avbrytDialog__trigger">
                    <button
                        aria-pressed={this.state.erApen}
                        ref={(c) => {
                            this.knapp = c;
                        }}
                        className="lenke"
                        onClick={(e) => {
                            e.preventDefault();
                            this.toggleAvbrytdialog();
                        }}>{getLedetekst('sykepengesoknad.avbryt.trigger')}</button>
                </p>
                <div
                    ref={(c) => {
                        this.dialog = c;
                    }}>
                    {
                        this.state.erApen && <AvbrytSoknad
                            avbrytFeilet={this.props.avbrytFeilet}
                            avbryter={this.props.avbryter}
                            sender={this.props.sender}
                            avbrytHandler={() => {
                                this.skjulAvbrytdialog();
                                this.knapp.focus();
                            }}
                            bekreftHandler={() => {
                                this.props.avbrytSoknad(this.props.sykepengesoknad.id);
                            }} />
                    }
                </div>
            </div>
        </div>);
    }
}

AvbrytSoknadContainer.propTypes = {
    avbrytFeilet: PropTypes.bool,
    avbryter: PropTypes.bool,
    sender: PropTypes.bool,
    avbrytSoknad: PropTypes.func,
    sykepengesoknad: sykepengesoknadPt,
};

const mapStateToProps = (state) => {
    return {
        sender: state.sykepengesoknader.sender,
        avbryter: state.sykepengesoknader.avbryter,
        avbrytFeilet: state.sykepengesoknader.avbrytFeilet,
    };
};

const Container = connect(mapStateToProps, { avbrytSoknad })(AvbrytSoknadContainer);

export default Container;
