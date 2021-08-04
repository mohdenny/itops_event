import React, { Fragment, useState } from 'react';
import { Button, Dropdown, Menu, Segment } from 'semantic-ui-react'

const Navbar = () => {
    const { activeItem, setActiveItem } = useState('home');

    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Fragment>
            <Menu size='small'>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='messages'
                    active={activeItem === 'messages'}
                    onClick={handleItemClick}
                />

                <Menu.Menu position='right'>
                    <Dropdown item text='Language'>
                        <Dropdown.Menu>
                        <Dropdown.Item>English</Dropdown.Item>
                        <Dropdown.Item>Russian</Dropdown.Item>
                        <Dropdown.Item>Spanish</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Item>
                        <Button primary>Sign Up</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Fragment>
    )
}

export default Navbar;
