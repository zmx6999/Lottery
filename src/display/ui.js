import React from 'react'
import {Card, Icon, Image, Statistic, Button} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='/images/logo.png'/>
        <Card.Content>
            <Card.Header>黑马福利彩票（航头站）</Card.Header>
            <Card.Meta>
                <p>管理员地址: {props.manager}</p>
                <p>当前地址: {props.currentAccount}</p>
            </Card.Meta>
            <Card.Description>每晚八点准时开奖, 不见不散!</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user'/>
                {props.playerCount}人参与
            </a>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.amount}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <a href='https://ropsten.etherscan.io/address/0xa1a4d4000d3c9312af310af1b38a10ba969b051c'>点击我查看交易历史</a>
            </Statistic>
        </Card.Content>

        <Button animated='fade' color='orange' onClick={props.play} loading={props.isPlaying} disabled={props.isDisabled()} style={{display:props.showPlay}}>
            <Button.Content visible>投注</Button.Content>
        </Button>
        <Button inverted color='red' onClick={props.draw} loading={props.isDrawing} disabled={props.isDisabled()} style={{display:props.showDraw}}>开奖</Button>
        <Button inverted color='green' onClick={props.drawback} loading={props.isDrawingback} disabled={props.isDisabled()} style={{display:props.showDraw}}>退奖</Button>
    </Card>
)

export default CardExampleCard
//import  es6