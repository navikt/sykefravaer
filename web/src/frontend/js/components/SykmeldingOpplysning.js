import React, { PropTypes, Component } from 'react';

class SykmeldingOpplysning extends Component {

    render() {
        return <div className="sykmelding-opplysning">
            <h3>{this.props.tittel}</h3>
            <div>
                {this.props.children}
            </div>
        </div>        
    }

}

export default SykmeldingOpplysning; 