import React, { Component } from 'react'
import factory from '/smart_contract/factory.js'
import { Card, Button, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../components/Layout.js'
import Layout from '../components/Layout.js'
import { Link } from '../router'




class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }
    async componentDidMount() {

    }
    renderComponents() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <Link route={`/campaigns/${address}`}>
                    <a>View Campaign</a>
                    </Link>,
                fluid: true
            };
        });
        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>

                    <Link route="/campaigns/new">
                        <a>
                            <Button floated="right" content='Create Campaign' icon='add' primary />
                        </a>
                    </Link>
                    {this.renderComponents()}
                </div>
            </Layout>
        );
    }
}
export default CampaignIndex; 