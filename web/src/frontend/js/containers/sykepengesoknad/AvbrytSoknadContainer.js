import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
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
                { this.state.erApen && <AvbrytSoknad
                    avbrytFeilet={this.props.avbrytFeilet}
                    avbryter={this.props.avbryter}
                    avbrytHandler={() => {
                        this.skjulAvbrytdialog();
                        this.knapp.focus();
                    }}
                    bekreftHandler={() => {
                        this.props.avbrytSoknad(this.props.sykepengesoknad.id);
                    }} /> }
            </div>
        </div>);
    }
}

AvbrytSoknadContainer.propTypes = {
    avbrytFeilet: PropTypes.bool,
    avbryter: PropTypes.bool,
    avbrytSoknad: PropTypes.func,
    sykepengesoknad: sykepengesoknadPt,
};

const mapStateToProps = (state) => {
    return {
        avbryter: state.sykepengesoknader.avbryter,
        avbrytFeilet: state.sykepengesoknader.avbrytFeilet,
    };
};

const Container = connect(mapStateToProps, { avbrytSoknad })(AvbrytSoknadContainer);

export default Container;
