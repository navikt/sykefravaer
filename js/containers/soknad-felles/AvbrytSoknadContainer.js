import { connect } from 'react-redux';
import { avbrytSoknad } from '../../actions/soknader_actions';
import AvbrytSoknad from '../../components/sykepengesoknad-felles/AvbrytSoknad';
import { soknad as soknadPt } from '../../propTypes';

const mapStateToProps = (state) => {
    return {
        sender: state.soknader.sender,
        avbryter: state.soknader.avbryter,
        avbrytFeilet: state.soknader.avbrytFeilet,
    };
};

const AvbrytSoknadContainer = connect(mapStateToProps, { avbrytSoknad })(AvbrytSoknad);

AvbrytSoknadContainer.propTypes = {
    sykepengesoknad: soknadPt,
};

export default AvbrytSoknadContainer;
