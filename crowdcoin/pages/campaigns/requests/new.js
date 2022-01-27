import React, { Component } from 'react'
import Layout from '../../../components/Layout';
// import Campaign from '../../smart_contract/campaign'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Campaign from '../../../smart_contract/campaign'
import web3 from '../../../smart_contract/web3.js';
import { Link } from '../../../router'
import config from '../../../config'

class RequestNew extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address }
    }

    state = {
        value: '',
        description: '',
        recipient: '',
        errorMessage: '',
        loading: false
    }

    

    createRequest = async () => {
        this.setState({loading:true}); 
        this.setState({ errorMessage: "" });
        console.log(this.props.address);
        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state

        try {
            const amount = web3.utils.toWei(value, 'ether');
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, amount, recipient).send({ from: accounts[0] });
        } catch (err) { 
            this.setState({ errorMessage: err.message })
        }
        this.setState({loading:false}); 

    }
    onSubmit = (event) => {
        event.preventDefault();
        this.createRequest();
    };
    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}><a>
                   Back
                    </a></Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input onChange={event => this.setState({ description: event.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in ether</label>
                        <Input
                            label={config.token}
                            labelPosition="right"
                            onChange={event => this.setState({ value: event.target.value })} />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input onChange={event => this.setState({ recipient: event.target.value })} />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}
export default RequestNew;