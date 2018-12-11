import React, { Component } from 'react';
import CardExampleCard from "./display/ui"
import lottery from "./eth/Lottery"
import web3 from "./utils/initweb3"

class App extends Component {
    constructor() {
        super()
        this.state={}
    }

    async componentWillMount() {
        let accounts=await web3.eth.getAccounts()
        let manager=await lottery.methods.manager().call()
        let playerCount=await lottery.methods.getPlayersCount().call()
        let amount=await lottery.methods.getBalance().call()
        let round=await lottery.methods.round().call()
        this.setState({
            currentAccount:accounts[0],
            manager:manager,
            playerCount:playerCount,
            amount:web3.utils.fromWei(amount,"ether"),
            round:round,
            showPlay:accounts[0]===manager?"none":"inline",
            showDraw:accounts[0]===manager?"inline":"none"
        })
    }

    play=async () => {
        this.setState({isPlaying:true})
        try {
            let accounts=await web3.eth.getAccounts()
            await lottery.methods.play().send({from:accounts[0],value:10**18})
            alert("success")
            this.setState({isPlaying:false})
            window.location.reload(true)
        } catch (e) {
            alert("fail")
            this.setState({isPlaying:false})
        }
    }

    draw=async () => {
        this.setState({isDrawing:true})
        try {
            let accounts=await web3.eth.getAccounts()
            await lottery.methods.draw().send({from:accounts[0]})
            let winner=await lottery.methods.winner().call()
            alert("success!winner is "+winner)
            this.setState({isDrawing:false})
            window.location.reload(true)
        } catch (e) {
            alert("fail")
            this.setState({isDrawing:false})
        }
    }

    drawback=async () => {
        this.setState({isDrawingback:true})
        try {
            let accounts=await web3.eth.getAccounts()
            await lottery.methods.drawback().send({from:accounts[0]})
            alert("success")
            this.setState({isDrawingback:false})
            window.location.reload(true)
        } catch (e) {
            alert("fail")
            this.setState({isDrawingback:false})
        }
    }

    isDisabled=() => {
      return this.state.isPlaying || this.state.isDrawing || this.state.isDrawingback
    }

  render() {
    return (
        <CardExampleCard currentAccount={this.state.currentAccount} manager={this.state.manager} playerCount={this.state.playerCount} amount={this.state.amount} round={this.state.round} play={this.play} isPlaying={this.state.isPlaying} draw={this.draw} isDrawing={this.state.isDrawing} drawback={this.drawback} isDrawingback={this.state.isDrawingback} isDisabled={this.isDisabled} showPlay={this.state.showPlay} showDraw={this.state.showDraw}/>
    );
  }
}

export default App;