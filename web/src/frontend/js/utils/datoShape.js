import { PropTypes as pt } from 'react';

export default pt.shape({
    monthValue: pt.number.isRequired,
    dayOfMonth: pt.number.isRequired,
    year: pt.number.isRequired,
});
