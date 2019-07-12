import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import { erGyldigDatoformat, scrollTo } from '@navikt/digisyfo-npm';
import { fieldPropTypes } from '../../../propTypes';
import { erGyldigDato } from '../../../utils/datoUtils';
import NavBar from '../daypicker/DayPickerNavBar';
import Caption from '../daypicker/DayPickerCaption';
import {
    localeUtils, MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT,
} from '../daypicker/daypickerLocale';

export const leggTilNullForan = nr => (nr > 9 || nr.length > 1 ? nr : `0${nr}`);

class DayPickerComponent extends Component {
    componentDidMount() {
        const { lukk } = this.props;
        document.addEventListener('click', () => lukk());
        if (this.kalender) {
            this.kalender.focus();
        }
    }

    componentDidUpdate(prevProps) {
        const { erApen } = this.props;
        if (!prevProps.erApen && erApen) {
            scrollTo(this.kalender);
            this.kalender.focus();
        }
    }

    componentWillUnmount() {
        const { lukk } = this.props;
        document.removeEventListener('click', () => lukk());
    }

    getDateFromValue() {
        const { input } = this.props;
        const v = input.value;
        if (!erGyldigDatoformat(v) || !erGyldigDato(v)) {
            return undefined;
        }
        const d = input.value.split('.');
        return new Date(`${d[2]}-${d[1]}-${d[0]}`);
    }

    getInitialMonth() {
        const { senesteTom } = this.props;
        const s = this.getDateFromValue();
        if (s) {
            return s;
        }
        return senesteTom || new Date();
    }

    selectedDays(day) {
        if (!this.getDateFromValue()) {
            return false;
        }
        return DateUtils.isSameDay(this.getDateFromValue(), day);
    }

    erDeaktivertDag(day) {
        const { tidligsteFom, senesteTom } = this.props;
        const _day = new Date(`${day.getFullYear()}-${leggTilNullForan(day.getMonth() + 1)}-${leggTilNullForan(day.getDate())}`);
        return _day < tidligsteFom || _day > senesteTom;
    }

    render() {
        const { onKeyUp, onDayClick } = this.props;
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        return (
            <div
                className="datokalender"
                role="application"
                tabIndex="-1"
                ref={(c) => {
                    this.kalender = c;
                }}
                onKeyDown={(e) => {
                    const OPP = 40;
                    const NED = 38;
                    if ([OPP, NED].indexOf(e.keyCode) > -1) {
                        e.preventDefault();
                    }
                }}
                onKeyUp={(e) => {
                    onKeyUp(e);
                }}
            >
                <DayPicker
                    locale="no"
                    months={MONTHS}
                    weekdaysLong={WEEKDAYS_LONG}
                    weekdaysShort={WEEKDAYS_SHORT}
                    initialMonth={this.getInitialMonth()}
                    localeUtils={localeUtils}
                    firstDayOfWeek={1}
                    captionElement={<Caption />}
                    navbarElement={<NavBar />}
                    disabledDays={day => this.erDeaktivertDag(day)}
                    selectedDays={day => this.selectedDays(day)}
                    onDayClick={(jsDato, modifiers, event) => {
                        if (!this.erDeaktivertDag(jsDato)) {
                            onDayClick(event, jsDato);
                        }
                    }}
                />
            </div>
        );
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    }
}

DayPickerComponent.propTypes = {
    input: fieldPropTypes.input,
    onKeyUp: PropTypes.func.isRequired,
    lukk: PropTypes.func.isRequired,
    onDayClick: PropTypes.func.isRequired,
    senesteTom: PropTypes.instanceOf(Date),
    tidligsteFom: PropTypes.instanceOf(Date),
    erApen: PropTypes.bool,
};

export default DayPickerComponent;
