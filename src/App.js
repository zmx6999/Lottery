import React, { Component } from 'react'
import CardExampleCard from "./display/ui"
import Lottery from './eth/Lottery'
import web3 from './utils/initweb3'

class App extends Component {
    constructor() {
        super()
        this.state={}
    }

    async componentWillMount() {
        let accounts = await web3.eth.getAccounts()
        let currentAccount = accounts[0]
        let manager = await Lottery.methods.manager().call()
        let playerCount = await Lottery.methods.getPlayersCount().call()
        let round = await Lottery.methods.round().call()
        round = parseInt(round)+1
        let amount = await Lottery.methods.getBalance().call()
        amount = web3.utils.fromWei(amount,'ether')
        let showPlay = currentAccount == manager? 'none': 'inline'
        let showDraw = currentAccount == manager? 'inline': 'none'
        this.setState({
            currentAccount,
            manager,
            playerCount,
            round,
            amount,
            showDraw,
            showPlay
        })
    }

    play = async () => {
        this.setState({isPlaying:true})
        try {
            let accounts = await web3.eth.getAccounts()
            let currentAccount = accounts[2]
            await Lottery.methods.play().send({from:currentAccount,gas:3000000,value:web3.utils.toWei('1','ether')})
            alert('success')
            this.setState({isPlaying:false})
            window.location.reload(true)
        } catch (e) {
            this.setState({isPlaying:false})
            console.log(e)
        }
    }

    draw = async () => {
        this.setState({isDrawing:true})
        try {
            let accounts = await web3.eth.getAccounts()
            let currentAccount = accounts[0]
            await Lottery.methods.draw().send({from:currentAccount,gas:3000000})
            let winner = await Lottery.methods.winner().call()
            alert('Success!Winner is '+winner)
            this.setState({isDrawing:false})
            window.location.reload(true)
        } catch (e) {
            this.setState({isDrawing:false})
            console.log(e)
        }
    }

    drawback = async () => {
        this.setState({isDrawingback:true})
        try {
            let accounts = await web3.eth.getAccounts()
            let currentAccount = accounts[0]
            await Lottery.methods.drawback().send({from:currentAccount,gas:3000000})
            alert('success')
            this.setState({isDrawingback:false})
            window.location.reload(true)
        } catch (e) {
            this.setState({isDrawingback:false})
            console.log(e)
        }
    }

    isDisabled = () => {
      return this.state.isPlaying || this.state.isDrawing || this.state.isDrawingback
    }

  render() {
    return (
        <CardExampleCard currentAccount={this.state.currentAccount} manager={this.state.manager} playerCount={this.state.playerCount} amount={this.state.amount} round={this.state.round} play={this.play} isPlaying={this.state.isPlaying} draw={this.draw} isDrawing={this.state.isDrawing} drawback={this.drawback} isDrawingback={this.state.isDrawingback} isDisabled={this.isDisabled} showPlay={this.state.showPlay} showDraw={this.state.showDraw}/>
    );
  }
}

export default App;
