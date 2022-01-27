const Campaign = artifacts.require("Campaign");
const Factory = artifacts.require("CampaignFactory");
const assert = require('assert');
const readFileSync = require('fs');
const compiledCampaign = require('../build/contracts/Campaign.json');

contract("CampaignFactory", accounts => {
    let factory;
    let campaigns;
    let campaign;
    before(async () => {
        factory = await Factory.deployed();
        await factory.createCampaign(100);
        campaigns = await factory.getDeployedCampaigns();
        campaign = await new web3.eth.Contract(compiledCampaign.abi, campaigns[0]);
    });
    describe("deployment", () => {
        it('Deploys factory and campaign', async () => {
            
            assert.ok(factory);
            assert.ok(campaign);
        })
        it('Marks caller as campaign manager', async () => {
            const manager = await campaign.methods.manager().call({from:accounts[0]});
            assert.equal(manager, accounts[0]);
        })
        it('Allow people to contirbute and mark them as approver', async () => {
            campaign.methods.contribute().send({
                value: '200',
                from: accounts[1]
            })
            const isContirbuter = campaign.methods.approvers(accounts[1]).call();
            assert(isContirbuter);
        })
        it('Requires minimum contribution', async () => {
            try {
                await campaign.methods.contribute().send({
                    value: '90',
                    from: accounts[1]
                })
            } catch (err) {
                assert(err);
            }
        })
        it('Allows manager to create requests', async () => {
            await campaign.methods.createRequest('Buy Batteries', '100', accounts[1])
                .send({
                    from: accounts[0],
                    gas: '1000000'
                });
            const request = await campaign.methods.requests(0).call()
            assert.equal(accounts[1], request.recipient)
            assert.equal('Buy Batteries', request.description)
        })
        it('Process requests', async () => {
            await campaign.methods.contribute()
                .send({
                    from: accounts[2],
                    value: web3.utils.toWei('10', 'ether')
                })
            await campaign.methods.createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
                .send({
                    from: accounts[0],
                    gas: '1000000'
                });

            await campaign.methods.approveRequest(1)
                .send({
                    from: accounts[2],
                    gas: '1000000'
                });

            await campaign.methods.finalizeRequest(1)
                .send({
                    from: accounts[0],
                    gas: '1000000'
                });

            let balance = await web3.eth.getBalance(accounts[1])
            balance = await web3.utils.fromWei(balance, 'ether')
            balance = parseFloat(balance)
            assert(balance > 104)
        })
    })

}) 