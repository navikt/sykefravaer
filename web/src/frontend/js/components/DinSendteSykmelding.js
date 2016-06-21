import React from 'react';
import KvitteringPanel from './KvitteringPanel';
import DinSykmelding from './DinSykmelding';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';

const DinSendteSykmelding = (props) => {
    return (<div>
        <KvitteringPanel {...props} />
        <DinSykmelding {...props} />
        <ArbeidsgiversSykmelding {...props} />
    </div>);
};

export default DinSendteSykmelding;
