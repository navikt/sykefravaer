import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, scrollTo } from '@navikt/digisyfo-npm';
import { Vis } from '../../../../utils/index';

export const AvbrytSykmeldingDialog = ({ avbryter, avbrytHandler, bekreftHandler }) => {
    return (
        <div
            className="pekeboble">
            <p className="blokk--s" dangerouslySetInnerHTML={{ __html: 'Er du sikker på at du vil avbryte denne egenerklæringen' }} />
            <div className="blokk--xs">
                <button
                    disabled={avbryter}
                    className="js-bekreft knapp knapp--fare"
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        bekreftHandler();
                    }}>
                    {getLedetekst('din-sykmelding.avbryt.ja')}
                    <Vis
                        hvis={avbryter}
                        render={() => {
                            return <span className="knapp__spinner" />;
                        }} />
                </button>
            </div>
            <p className="sist">
                <button
                    type="button"
                    className="lenke js-avbryt"
                    onClick={(e) => {
                        e.preventDefault();
                        avbrytHandler();
                    }}>
                    {getLedetekst('din-sykmelding.avbryt.angre')}
                </button>
            </p>
        </div>
    );
};

AvbrytSykmeldingDialog.propTypes = {
    avbryter: PropTypes.bool,
    avbrytHandler: PropTypes.func,
    bekreftHandler: PropTypes.func,
};

class AvbrytDialog extends Component {
    componentDidUpdate(prevProps) {
        const { vis } = this.props;
        if (!prevProps.vis && vis) {
            scrollTo(this.dialog);
        }
    }

    render() {
        const { vis } = this.props;
        return (
            <div
                ref={(c) => {
                    this.dialog = c;
                }}>
                <Vis
                    hvis={vis}
                    render={() => {
                        return <AvbrytSykmeldingDialog {...this.props} />;
                    }} />
            </div>
        );
    }
}

AvbrytDialog.propTypes = {
    vis: PropTypes.bool,
};

export default AvbrytDialog;
