import React, { Component } from 'react';
import { Input } from 'nav-frontend-skjema';

class Tagvelger extends Component {
    render() {
        return (<div>
            <Input
                onChange={(a) => {
                    console.log(a);
                }}
                name={this.props.name} />
        </div>);
    }
}

export default Tagvelger;
