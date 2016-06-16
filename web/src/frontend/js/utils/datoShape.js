import { PropTypes as pt } from 'react';

export default pt.shape({
    monthValue: pt.number.isRequired,
    dayOfMonth: pt.number.isRequired,
    year: pt.number.isRequired,
    hour: pt.number.isRequired,
    minute: pt.number.isRequired,
    second: pt.number.isRequired
});
