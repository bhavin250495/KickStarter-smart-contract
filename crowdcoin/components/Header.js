import React from "react";
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from '../router.js'

const Header = (props) => {
    const items = [
        { key: 'crowdcoin', name: 'Crowdcoin', position: 'left' },
        { key: 'campaign', name: 'Campaigns' },
        { key: 'add', name: '+' },
    ]
    const MenuExampleProps = () => <Menu items={items} />
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link route="/">
                <a className="item">
                    Crowdcoin
                </a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">
                        Campaigns
                    </a>
                </Link><Link route="/campaigns/new">
                    <a className="item">
                        +
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}
export default Header;