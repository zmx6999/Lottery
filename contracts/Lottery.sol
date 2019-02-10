pragma solidity ^0.4.0;

contract Lottery {
    address public manager;
    address[] public players;
    uint public round;
    address public winner;
    uint public betMoney;

    constructor(uint _betMoney) {
        manager=msg.sender;
        betMoney=_betMoney;
    }

    modifier onlyManager() {
        require(msg.sender==manager);
        _;
    }

    function play() payable public {
        require(msg.sender!=manager);
        require(msg.value==betMoney);
        players.push(msg.sender);
    }

    function draw() public onlyManager {
        require(players.length>0);
        uint i=uint(sha256(abi.encodePacked(block.difficulty,now,players.length)));
        i=i%players.length;
        winner=players[i];
        winner.transfer(address(this).balance);
        delete players;
        round+=1;
    }

    function drawback() public onlyManager {
        require(players.length>0);
        for(uint i=0;i<players.length;i++) players[i].transfer(betMoney);
        delete players;
        round+=1;
    }

    function getPlayersCount() public view returns (uint) {
        return players.length;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
