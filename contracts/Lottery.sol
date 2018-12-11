pragma solidity ^0.4.24;

contract Lottery {
    address public manager;
    address[] public players;
    address public winner;
    uint public round=1;
    uint public unit;

    constructor(uint _unit) public {
        manager=msg.sender;
        unit=_unit;
    }

    modifier onlyManager() {
        require(manager==msg.sender);
        _;
    }

    function play() payable public {
        require(msg.sender!=manager);
        require(msg.value==unit);
        players.push(msg.sender);
    }

    function draw() public onlyManager {
        require(players.length>0);
        uint nonce=uint(sha256(block.difficulty,now,players.length));
        uint i=nonce%players.length;
        winner=players[i];
        winner.transfer(address(this).balance);
        round++;
        delete players;
    }

    function drawback() public onlyManager {
        require(players.length>0);
        for(uint i=0;i<players.length;i++)
            players[i].transfer(unit);
        round++;
        delete players;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayersCount() public view returns (uint) {
        return players.length;
    }
}