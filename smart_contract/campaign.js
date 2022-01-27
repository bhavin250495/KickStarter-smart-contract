import web3 from './web3';
const campaign = require('../../Contract/build/contracts/Campaign.json');

export default (address) => {
    return new web3.eth.Contract(
        campaign.abi,
        address
    );
};