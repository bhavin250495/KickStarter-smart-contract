import web3 from './web3';
const CampaignFactory =  require('./CampaignFactory.json');

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xA60C061F0FB181d906b60149B8403dC13972345f'
);

export default instance;