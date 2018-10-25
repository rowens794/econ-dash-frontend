import React from 'react';
import {
    Navbar,
    NavbarBrand,
    } from 'reactstrap';


export default class Example extends React.Component {
    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen: false
    };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        return (
            <div>
                <Navbar color="#F9F0DB" light expand="md">
                    <NavbarBrand href="/" className="brand">indikators</NavbarBrand>
                </Navbar>
            </div>
        );
    }
}
