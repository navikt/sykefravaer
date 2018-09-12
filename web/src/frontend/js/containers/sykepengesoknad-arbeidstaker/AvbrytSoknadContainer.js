import { connect } from 'react-redux';
import { avbrytSoknad } from '../../actions/sykepengesoknader_actions';
import AvbrytSoknad from '../../components/sykepengesoknad-felles/AvbrytSoknad';

const mapStateToProps = (state) => {
    return {
        sender: state.sykepengesoknader.sender,
        avbryter: state.sykepengesoknader.avbryter,
        avbrytFeilet: state.sykepengesoknader.avbrytFeilet,
    };
};

const Container = connect(mapStateToProps, { avbrytSoknad })(AvbrytSoknad);

export default Container;
