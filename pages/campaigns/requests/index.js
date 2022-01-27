import React, { Component } from 'react'
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import Campaign from '../../../smart_contract/campaign'
import { Button, Divider, Table } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'
// import web3 from '../../smart_contract/web3.js';
// import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../../router'
import Head from 'next/head';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.requestCount().call();
        const approversCount = await campaign.methods.approverCount().call();


        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call()
                })

        );
        return { address, requests, requestCount, approversCount}
    }
    renderRow() {
        return this.props.requests.map((ele, index) => {
            return <RequestRow
                key={index}
                id= {index}
                request={ele}
                address={this.props.address}
                approversCount = {this.props.approversCount}
            />
        });
    }
    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`} address={this.props.address}>
                    <a>
                        <Button primary floated='right' style={{marginBottom:'10px'}}>Add request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell> ID </HeaderCell>
                            <HeaderCell> Description </HeaderCell>
                            <HeaderCell> Amount </HeaderCell>
                            <HeaderCell> Recipient </HeaderCell>
                            <HeaderCell> Approval Count </HeaderCell>
                            <HeaderCell> Approve </HeaderCell>
                            <HeaderCell> Finalize </HeaderCell>
                        </Row>

                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>

            <div>Found {this.props.requestCount} request. </div>

            </Layout>
        );
    }
}
export default RequestIndex;