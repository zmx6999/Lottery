pragma solidity ^0.4.4;


contract Lottery {
    address manager;
    address[] players;

    function Lottery() {
        manager=msg.sender;
    }
    
    function enter() payable public {
        require(msg.sender!=manager);
        require(msg.value==1 ether);
        players.push(msg.sender);
    }
    
    function random() view private returns (uint x) {
        x=uint(keccak256(block.difficulty,now,players));
    }
    
    function pickWinner() public onlyManager returns (address winner) {
        if(players.length > 0) {
            uint i=random()%players.length;
            if(this.balance > 0) players[i].transfer(this.balance);
            winner=players[i];
            players.length=0;
        }
        winner=0;
    }
    
    modifier onlyManager() {
        require(msg.sender==manager);
        _;
    }
    
    function returnMoney() public onlyManager {
        for(uint i=0; i<players.length; i++) {
            players[i].transfer(1 ether);
        }
    }
    
    function getPlayers() view public returns (address[] _players) {
        _players=players;
    }
    
    function getBalance() view public returns (uint bal) {
        bal=this.balance;
    }
}
