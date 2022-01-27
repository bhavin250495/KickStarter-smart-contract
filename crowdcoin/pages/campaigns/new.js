import React, { Component } from 'react'
import '../../components/Layout.js'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout.js';
import factory from '../../smart_contract/factory.js';
import web3 from '../../smart_contract/web3.js';
import { Router } from '../../router'


class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    createCampaign = async () => {
        this.setState({ errorMessage: "" })
        this.setState({ loading: true });
        try {
            const accounts = await web3.eth.getAccounts();
            const contribution = this.state.minimumContribution;
            await factory.methods
                .createCampaign(web3.utils.toWei(contribution,'ether') )
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.createCampaign();
    };

    render() {
        return (
            <Layout>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <h3>Create a Campaign</h3>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;