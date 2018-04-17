import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autofill, touch, formValueSelector } from 'redux-form';
import { toDatePrettyPrint, fraInputdatoTilJSDato, scrollTo } from 'digisyfo-npm';
import { connect } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT, localeUtils } from './datovelgerLocale';
import Caption from './DayPickerCaption';
import NavBar from './DayPickerNavBar';

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

const pad = (nr) => {
    return nr > 9 || nr.length > 1 ? nr : `0${nr}`;
};

Datoer.propTypes = {
    fom: PropTypes.instanceOf(Date),
    tom: PropTypes.instanceOf(Date),
};

const velgerStartdato = (from, to, day) => {
    const erForForsteDag = from && DateUtils.isDayBefore(day, from);
    const periodeErValgt = from && to;
    return !from || erForForsteDag || periodeErValgt;
};

class DayPickerPeriode extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
        this.erDeaktivertDag = this.erDeaktivertDag.bind(this);
        this.state = {
            enteredTo: props.to || null,
        };
    }

    componentDidMount() {
        this.kalender.focus();
    }

    componentWillReceiveProps(props) {
        this.setState({
            enteredTo: props.to,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.erApen && this.state.erApen) {
            scrollTo(this.kalender);
            this.kalender.focus();
        }
    }

    getTittel() {
        const { from, to } = this.props;
        return from && to
            ? 'Velg periode'
            : from
                ? 'Velg sluttdato'
                : 'Velg startdato';
    }

    getModus() {
        const { from, to } = this.props;
        return from && !to ? 'velgSluttdato' : 'velgStartdato';
    }

    getInitialMonth() {
        const { from, to, tidligsteFom, senesteTom } = this.props;
        return to || from || senesteTom || tidligsteFom;
    }

    handleDayClick(day) {
        const { from, to, names } = this.props;
        if (velgerStartdato(from, to, day)) {
            this.lagreTilReduxState(names[0], toDatePrettyPrint(day));
            this.lagreTilReduxState(names[1], undefined);
        } else {
            this.lagreTilReduxState(names[1], toDatePrettyPrint(day));
            this.setState({
                enteredTo: day,
            });
        }
    }

    handleDayMouseEnter(day) {
        const { from, to } = this.props;
        if (!velgerStartdato(from, to, day)) {
            this.setState({
                enteredTo: day,
            });
        }
    }

    lagreTilReduxState(fieldName, value) {
        this.props.autofill(this.props.skjemanavn, fieldName, value);
        if (value) {
            this.props.touch(this.props.skjemanavn, fieldName);
        }
    }

    erDeaktivertDag(day) {
        const { tidligsteFom, senesteTom } = this.props;
        const _day = new Date(`${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`);
        return _day < tidligsteFom || _day > senesteTom;
    }

    render() {
        const { from, to } = this.props;
        const fromOrTo = from || to;
        const modifiers = { start: fromOrTo, end: this.state.enteredTo };
        const selectedDays = [fromOrTo, { from: fromOrTo, to: this.state.enteredTo }];

        return (
            <div
                className={`periodekalender periodekalender--${this.getModus()} js-periodekalender`}
                ref={(c) => {
                    this.kalender = c;
                }}
                tabIndex="-1"
                role="application">
                <this.props.Overskrift id="periodekalender-tittel" className="periodekalender__tittel">{this.getTittel()}</this.props.Overskrift>
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
                    <Datoer fom={from} tom={to} />
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

    const from = fomValue ? fraInputdatoTilJSDato(fomValue) : undefined;
    const to = tomValue ? fraInputdatoTilJSDato(tomValue) : undefined;

    return {
        from, to,
    };
};

export default connect(mapStateToProps, { autofill, touch })(DayPickerPeriode);
