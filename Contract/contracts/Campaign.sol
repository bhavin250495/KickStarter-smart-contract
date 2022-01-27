// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {

Campaign[] public deployedCamapaign;

function createCampaign(uint minimum) public {
     Campaign newCampaign = new Campaign(minimum,msg.sender);
    deployedCamapaign.push(newCampaign);
}

function getDeployedCampaigns() public view returns (Campaign[] memory) {
    return deployedCamapaign;
}

}
contract Campaign {

struct Request {
    string description;
    uint value;
    address payable recipient;
    bool complete;
    uint approvalCount;
    mapping(address=>bool) approvals;
}

Request[] public requests;
address public manager;
uint public minContribution;
mapping(address=>bool) public approvers;
uint public approverCount = 0;

modifier restricted() {
    require(msg.sender == manager);
    _;
}
constructor(uint _minContribution, address creator)  {
    manager = creator;
    minContribution = _minContribution;
}

function contribute() public payable {
    require(msg.value > minContribution);
    approvers[msg.sender] = true;
    approverCount++;

}

function createRequest(string memory description,uint value, address payable recipient ) public restricted {
    Request storage newRequest =  requests.push();
    newRequest.description = description;
    newRequest.value = value;
    newRequest.recipient = recipient;
    newRequest.complete = false;
    newRequest.approvalCount = 0;
}

function approveRequest(uint index) public {
    Request storage request = requests[index];
    require(approvers[msg.sender]);
    require(!request.approvals[msg.sender]);
    request.approvals[msg.sender] = true;
    request.approvalCount++;
}


function finalizeRequest(uint index) public restricted{
    Request storage request = requests[index];
    require(request.approvalCount > (approverCount/2));
    require(!request.complete);
    request.recipient.transfer(request.value);

    request.complete = true;
}

function getSummary() public view returns(uint,uint,uint,uint,address){
return (
    minContribution,
    address(this).balance,
    requests.length,
    approverCount,
    manager
);
}

function requestCount() public view returns(uint) {
    return requests.length;
}

}