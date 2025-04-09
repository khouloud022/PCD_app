// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Government {
    address public government;
    uint public tenderCounter;
    
    struct Tender {
        uint id;
        string location;
        string description;
        uint deadline;
        bool isOpen;
        address winningBidder;
        uint winningBidAmount;
    }
    
    mapping(uint => Tender) public tenders;
    mapping(uint => mapping(address => uint)) public bids; 
    
    event TenderCreated(uint indexed id, string location, uint deadline);
    event TenderClosed(uint indexed id);
    event BidPlaced(uint indexed tenderId, address indexed bidder, uint amount);
    event BidAccepted(uint indexed tenderId, address indexed winner, uint amount);
    
    modifier onlyGovernment() {
        require(msg.sender == government, "Only government can perform this action");
        _;
    }
    
    constructor() {
        government = msg.sender;
    }
    
    function createTender(
        string memory _location,
        string memory _description,
        uint _deadline
    ) public onlyGovernment {
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        tenderCounter++;
        tenders[tenderCounter] = Tender({
            id: tenderCounter,
            location: _location,
            description: _description,
            deadline: _deadline,
            isOpen: true,
            winningBidder: address(0),
            winningBidAmount: 0
        });
        
        emit TenderCreated(tenderCounter, _location, _deadline);
    }
    
    function closeTender(uint _id) public onlyGovernment {
        require(tenders[_id].isOpen, "Tender already closed");
        require(block.timestamp >= tenders[_id].deadline, "Deadline not reached yet");
        
        tenders[_id].isOpen = false;
        emit TenderClosed(_id);
    }
    
    function placeBid(uint _tenderId, uint _amount) public {
    require(tenders[_tenderId].isOpen, "L'appel d'offre est ferme");
    require(block.timestamp < tenders[_tenderId].deadline, "La date limite est passee");
    require(_amount > 0, "Le montant doit etre positif");
    require(bids[_tenderId][msg.sender] == 0, "Vous avez deja soumissionne");

    bids[_tenderId][msg.sender] = _amount;
    emit BidPlaced(_tenderId, msg.sender, _amount);
}
    
    function acceptBid(uint _tenderId, address _winner, uint _amount) public onlyGovernment {
        require(!tenders[_tenderId].isOpen, "Tender must be closed first");
        require(bids[_tenderId][_winner] == _amount, "Invalid bid amount");
        
        tenders[_tenderId].winningBidder = _winner;
        tenders[_tenderId].winningBidAmount = _amount;
        emit BidAccepted(_tenderId, _winner, _amount);
    }
    
    function getActiveTenders() public view returns (Tender[] memory) {
        uint count = 0;
        for (uint i = 1; i <= tenderCounter; i++) {
            if (tenders[i].isOpen) {
                count++;
            }
        }
        
        Tender[] memory activeTenders = new Tender[](count);
        uint index = 0;
        for (uint i = 1; i <= tenderCounter; i++) {
            if (tenders[i].isOpen) {
                activeTenders[index] = tenders[i];
                index++;
            }
        }
        
        return activeTenders;
    }
    
    function getBidAmount(uint _tenderId, address _bidder) public view returns (uint) {
        return bids[_tenderId][_bidder];
    }
}