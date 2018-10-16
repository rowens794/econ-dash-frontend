import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';


const IndicatorModal = (props) => {

    if (1){
        return (
            <div>
                <ModalHeader>{props.series}</ModalHeader>
                <ModalBody>
                    {props.series}
                </ModalBody>
            </div>
        )
    }else{
        return null;
    }
};

export default IndicatorModal;