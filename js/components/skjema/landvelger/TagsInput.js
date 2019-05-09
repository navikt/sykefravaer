import { WithContext as ReactTags } from 'react-tag-input';
import React from 'react';
import Feilomrade from '../Feilomrade';
import { fieldPropTypes } from '../../../propTypes';

export const TagsInput = (props) => {
    const classNames = {
        tagInputField: 'ReactTags__input skjemaelement__input',
        tag: 'etikett etikett--info etikett--tag',
    };

    return (<Feilomrade {...props.meta}>
        <ReactTags
            inputFieldPosition="top"
            allowDragDrop={false}
            autofocus={false}
            placeholder=""
            classNames={classNames}
            {...props}
        />
    </Feilomrade>);
};

TagsInput.propTypes = {
    meta: fieldPropTypes.meta,
};

