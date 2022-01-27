import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react'
import Campaign from '../smart_contract/campaign'
import web3 from '../smart_contract/web3.js';
import config from '../config'

class RequestRow extends Component {
    approveRequest = async () => { const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({from:accounts[0]})}

    onApprove = () => {
        this.approveRequest()

    };
    finalizeRequest = async () => { const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({from:accounts[0]})}
    onFinalize = () => {
        this.finalizeRequest()

    };
    render() {
        const { Row,Cell } = Table
        const {id,request, address,approversCount} = this.props
        const readyToFinalize = request.approvalCount > approversCount/2;
        return <Row disabled= {request.complete} positive={readyToFinalize && !request.complete}>
            <Cell> {id} </Cell>
            <Cell> {request.description} </Cell>
            <Cell> {web3.utils.fromWei(request.value,'ether')} {config.token}</Cell>
            <Cell> {request.recipient} </Cell>
            <Cell> {request.approvalCount}/{approversCount} </Cell>
            <Cell>{request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>Approve</Button>)}
            </Cell>
            <Cell>{request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>Finalize</Button>)}
            </Cell>
        </Row>
    }
}

export default RequestRow;