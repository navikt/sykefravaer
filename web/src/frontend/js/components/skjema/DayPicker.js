import React, { Component, PropTypes } from 'react';
import { erGyldigDato, erGyldigDatoformat } from '../../utils';
import DayPicker, { DateUtils, LocaleUtils } from 'react-day-picker';

export const MONTHS = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
export const WEEKDAYS_LONG = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
export const WEEKDAYS_SHORT = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'];

export const formatDay = (date) => {
    // aria-label på dager
    return `${WEEKDAYS_LONG[date.getDay()]} ${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

const localeUtils = Object.assign({}, LocaleUtils, {
    formatDay,
});

export const Caption = ({ date }) => {
    return (<div className="DayPicker-Caption" role="heading" aria-live="assertive" aria-atomic="true">
        {`${MONTHS[date.getMonth()]} ${date.getFullYear()}`}
    </div>);
};

Caption.propTypes = {
    date: PropTypes.instanceOf(Date),
};

let lukk;

class DayPickerComponent extends Component {
    componentDidMount() {
        lukk = () => {
            this.props.lukk();
        };
        document.addEventListener('click', lukk);
    }

    componentWillUnmount() {
        document.removeEventListener('click', lukk);
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
        const s = this.getDateFromValue();
        if (s) {
            return s;
        }
        return new Date();
    }

    selectedDays(day) {
        if (!this.getDateFromValue()) {
            return false;
        }
        return DateUtils.isSameDay(this.getDateFromValue(), day);
    }

    render() {
        const { ariaControlledBy, onKeyUp } = this.props;
        return (<div className="datovelger__DayPicker"
            aria-controlledby={ariaControlledBy}
            onKeyUp={(e) => {
                onKeyUp(e);
            }}>
            <DayPicker
                locale="no"
                months={MONTHS}
                weekdaysLong={WEEKDAYS_LONG}
                weekdaysShort={WEEKDAYS_SHORT}
                initialMonth={this.getInitialMonth()}
                localeUtils={localeUtils}
                firstDayOfWeek={1}
                captionElement={<Caption />}
                selectedDays={(day) => {
                    return this.selectedDays(day);
                }}
                onDayClick={(event, jsDato) => {
                    this.props.onDayClick(event, jsDato);
                }}
            />
        </div>);
    }
}

DayPickerComponent.propTypes = {
    input: PropTypes.object.isRequired,
    onKeyUp: PropTypes.func.isRequired,
    lukk: PropTypes.func.isRequired,
    ariaControlledBy: PropTypes.string,
    onDayClick: PropTypes.func.isRequired,
};

export default DayPickerComponent;
