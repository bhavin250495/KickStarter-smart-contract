import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Campaign from '../smart_contract/campaign'
import web3 from '../smart_contract/web3.js';
import { Router } from '../router'


class ContributeForm extends Component {
    state = {
        value: '',
        loading: false,
        errorMessage: ''
    };

     contribute = async () => {
        this.setState({ loading: true })
        this.setState({ errorMessage: "" })
        const campaign = Campaign(this.props.address);
        try {
            const accounts = await web3.eth.getAccounts();
            const amount = web3.utils.toWei(this.state.value, 'ether')
            await campaign.methods.contribute().send({ from: accounts[0], value: amount })
            Router.replaceRoute(`/campaigns/${this.props.address}`)
        }
        catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false, value: '' })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.contribute()
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        value={this.state.value}
                        label="ether"
                        labelPosition="right"
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading} >Contibute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;