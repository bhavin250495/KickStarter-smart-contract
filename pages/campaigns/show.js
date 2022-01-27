import React, { Component } from 'react'
import Layout from '../../components/Layout';
import Campaign from '../../smart_contract/campaign'
import { Card, Grid, Button, GridRow } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import web3 from '../../smart_contract/web3.js';
import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../router'

class CampaignNew extends Component {

    static async getInitialProps(props) {

        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            minContribution,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [{
            header: manager,
            description: 'The manager created this campaign and can create requests to withdraw money',
            meta: 'Address of manager',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: web3.utils.fromWei(minContribution, 'ether'),
            description: 'You must contribute at least this much wei to become a approver',
            meta: 'Minimum Contribution (eth)',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: requestsCount,
            description: 'A request tries to withdraw money from the contract. Request must be approved by approvers',
            meta: 'Number of Requests',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: approversCount,
            description: 'Number of people who have already donated to this campaign',
            meta: 'Number of Approvers',
            style: { overflowWrap: 'break-word' }
        },
        {
            header: web3.utils.fromWei(balance, 'ether'),
            description: 'The balance is how much money this campaign has left to spend',
            meta: 'Campaign Balance (ether)',
            style: { overflowWrap: 'break-word' }
        }
        ]
        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>Campaign show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6} >
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a><Button primary>View Requests</Button></a>
                        </Link>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}
export default CampaignNew;