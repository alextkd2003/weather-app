import React from 'react';
import { Navbar } from 'react-bootstrap'

const Header = ( { title } ) => {
    return (
        <Navbar expand="lg" className="bg-info">
            <Navbar.Brand href="#home" className="text-white w-100 text-center">{ title }</Navbar.Brand>
        </Navbar>
    )
}

export default Header;