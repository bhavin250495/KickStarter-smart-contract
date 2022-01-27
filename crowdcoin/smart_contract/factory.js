import web3 from './web3';
const CampaignFactory =  require('../../Contract/build/contracts/CampaignFactory.json');
const maticAddress = '0x88DB67772d05b37e5B0A1e9Ba044E21bfcD0eb81'
const ropstanAddress = '0xA9547144e9B517198401C84B8Adc07b2020a818C'
const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    maticAddress
);

export default instance;