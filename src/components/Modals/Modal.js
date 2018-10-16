import React from 'react';


const Modal = (props) => {

    if(props.visable){
        return (
            <div>
                {props.children}
            </div>
        );
    }else{
        return null;
    }

};

export default Modal;