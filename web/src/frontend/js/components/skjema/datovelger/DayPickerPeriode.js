import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autofill, touch, formValueSelector } from 'redux-form';
import { toDatePrettyPrint, fraInputdatoTilJSDato, scrollTo } from 'digisyfo-npm';
import { connect } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT, localeUtils } from './datovelgerLocale';
import Caption from './DayPickerCaption';
import NavBar from './DayPickerNavBar';
import { leggTilNullForan } from './DayPicker';

const Style = () => {
    return (<style dangerouslySetInnerHTML={{ __html:
        '@media (max-width: 30em) { body { overflow: hidden!important; } }',
    }} />);
};

const Datoer = ({ fom, tom }) => {
    const tekst = fom && tom
        ? `Fra <strong>${toDatePrettyPrint(fom)}</strong> til <strong>${toDatePrettyPrint(tom)}</strong>`
        : fom
            ? `Fra <strong>${toDatePrettyPrint(fom)}</strong>`
            : '&nbsp;';
    return <p className="periodekalender__datoer" aria-live="polite" dangerouslySetInnerHTML={{ __html: tekst }} />;
};

Datoer.propTypes = {
    fom: PropTypes.instanceOf(Date),
    tom: PropTypes.instanceOf(Date),
};

const velgerStartdato = (fra, til, dato) => {
    const erForForsteDag = fra && DateUtils.isDayBefore(dato, fra);
    const periodeErValgt = fra && til;
    return !fra || erForForsteDag || periodeErValgt;
};

class DayPickerPeriode extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
        this.erDeaktivertDag = this.erDeaktivertDag.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.kalender.focus();
    }

    componentWillReceiveProps(props) {
        this.setState({
            valgtTil: props.valgtTil,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.erApen && this.state.erApen) {
            scrollTo(this.kalender);
            this.kalender.focus();
        }
    }

    getTittel() {
        const { valgtFra, valgtTil } = this.props;
        return valgtFra && valgtTil
            ? 'Velg periode'
            : valgtFra
                ? 'Velg sluttdato'
                : 'Velg startdato';
    }

    getModus() {
        const { valgtFra, valgtTil } = this.props;
        return valgtFra && !valgtTil ? 'velgSluttdato' : 'velgStartdato';
    }

    getInitialMonth() {
        const { valgtFra, valgtTil, tidligsteFom, senesteTom } = this.props;
        return valgtTil || valgtFra || senesteTom || tidligsteFom;
    }

    handleDayClick(dato) {
        const { valgtFra, valgtTil, names } = this.props;
        if (velgerStartdato(valgtFra, valgtTil, dato)) {
            this.lagreTilReduxState(names[0], toDatePrettyPrint(dato));
            this.lagreTilReduxState(names[1], undefined);
        } else {
            this.lagreTilReduxState(names[1], toDatePrettyPrint(dato));
            this.setState({
                valgtTil: dato,
            });
        }
    }

    handleDayMouseEnter(dato) {
        const { valgtFra, valgtTil } = this.props;
        if (!velgerStartdato(valgtFra, valgtTil, dato)) {
            this.setState({
                valgtTil: dato,
            });
        }
    }

    lagreTilReduxState(fieldName, value) {
        this.props.autofill(this.props.skjemanavn, fieldName, value);
        if (value) {
            this.props.touch(this.props.skjemanavn, fieldName);
        }
    }

    erDeaktivertDag(dato) {
        const { tidligsteFom, senesteTom } = this.props;
        const _dato = new Date(`${dato.getFullYear()}-${leggTilNullForan(dato.getMonth() + 1)}-${leggTilNullForan(dato.getDate())}`);
        return _dato < tidligsteFom || _dato > senesteTom;
    }

    render() {
        const { valgtFra, valgtTil } = this.props;
        const fraEllerTil = valgtFra || valgtTil;
        const modifiers = { start: fraEllerTil, end: valgtTil };
        const selectedDays = [fraEllerTil, { from: fraEllerTil, to: valgtTil }];

        return (
            <div
                className={`periodekalender periodekalender--${this.getModus()} js-periodekalender`}
                ref={(c) => {
                    this.kalender = c;
                }}
                tabIndex="-1"
                role="application">
                <this.props.Overskrift id="periodekalender-tittel" className="periodekalender__tittel" aria-live="polite">{this.getTittel()}</this.props.Overskrift>
                <div className="periodekalender__kalender">
                    <DayPicker
                        locale="no"
                        months={MONTHS}
                        weekdaysLong={WEEKDAYS_LONG}
                        weekdaysShort={WEEKDAYS_SHORT}
                        localeUtils={localeUtils}
                        firstDayOfWeek={1}
                        initialMonth={this.getInitialMonth()}
                        captionElement={<Caption />}
                        navbarElement={<NavBar />}
                        modifiers={modifiers}
                        selectedDays={selectedDays}
                        disabledDays={this.erDeaktivertDag}
                        onDayClick={this.handleDayClick}
                        onDayMouseEnter={this.handleDayMouseEnter} />
                </div>
                <div className="periodekalender__kontroller">
                    <Datoer fom={valgtFra} tom={valgtTil} />
                    <button
                        type="button"
                        className="rammeknapp"
                        onClick={this.props.lukk}>Lagre periode</button>
                </div>
                <Style />
            </div>);
    }
}

DayPickerPeriode.defaultProps = {
    Overskrift: 'h3',
};

DayPickerPeriode.propTypes = {
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
    autofill: PropTypes.func,
    touch: PropTypes.func,
    skjemanavn: PropTypes.string,
    lukk: PropTypes.func,
    names: PropTypes.arrayOf(PropTypes.string),
    Overskrift: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
    const fomValue = formValueSelector(ownProps.skjemanavn)(state, ownProps.names[0]);
    const tomValue = formValueSelector(ownProps.skjemanavn)(state, ownProps.names[1]);

    const valgtFra = fomValue ? fraInputdatoTilJSDato(fomValue) : undefined;
    const valgtTil = tomValue ? fraInputdatoTilJSDato(tomValue) : undefined;

    return {
        valgtFra, valgtTil,
    };
};

export default connect(mapStateToProps, { autofill, touch })(DayPickerPeriode);
