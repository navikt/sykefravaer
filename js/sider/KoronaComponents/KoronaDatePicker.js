import './Flatpickr.less';
import './datepicker-extended.less';
import PropTypes from 'prop-types';

import Flatpickr from 'react-flatpickr';
import React from 'react';
import { Element } from 'nav-frontend-typografi';

import { flatpickrLocale } from './flatpickrUtils';

const Calendar = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFk
b2JlIElsbHVzdHJhdG9yIDE5LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246
IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZH
IDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5k
dGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3Lncz
Lm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsi
IHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNr
Z3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9
InRleHQvY3NzIj4KCS5zdDB7ZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS1saW5lY2Fw
OnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9Cjwvc3R5
bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjUsMi41aC00djIxaDIzdi0yMWgtNCIvPgo8cmVj
dCB4PSI0LjUiIHk9IjAuNSIgY2xhc3M9InN0MCIgd2lkdGg9IjMiIGhlaWdodD0iNCIvPgo8cmVj
dCB4PSIxNi41IiB5PSIwLjUiIGNsYXNzPSJzdDAiIHdpZHRoPSIzIiBoZWlnaHQ9IjQiLz4KPGxp
bmUgY2xhc3M9InN0MCIgeDE9IjcuNSIgeTE9IjIuNSIgeDI9IjE2LjUiIHkyPSIyLjUiLz4KPGxp
bmUgY2xhc3M9InN0MCIgeDE9IjAuNSIgeTE9IjcuNSIgeDI9IjIzLjUiIHkyPSI3LjUiLz4KPC9z
dmc+Cg==`;

const DatePicker = ({ label, value, onChange }) => {
    return (
        <div className="datepicker-container">
            <div className="datepicker-label">
                <Element>{label}</Element>
            </div>
            <div className="flatpickr-container">
                <Flatpickr
                    value={value}
                    className="typo-normal flatpickr"
                    placeholder="DD.MM.ÅÅÅÅ"
                    onChange={(newDate) => { return onChange(newDate[0]); }}
                    options={{
                        position: 'below',
                        mode: 'single',
                        enableTime: false,
                        dateFormat: 'd.m.Y',
                        allowInput: true,
                        locale: flatpickrLocale,
                    }}
                />
                <span className="flatpickr-icon">
                    <img aria-hidden="true" alt="Kalender" src={Calendar} />
                </span>
            </div>
        </div>
    );
};

DatePicker.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default DatePicker;
