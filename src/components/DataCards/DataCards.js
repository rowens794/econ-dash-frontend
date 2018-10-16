import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import Numeral from 'numeral';

class DataCard extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render () {

        let style = {'backgroundColor': '#f9eec7', 'color': '#4E4E4E'};

        if (this.props.reading === 2) {
            style = {'backgroundColor': '#6e853f', 'color': '#FFFCF9'};
        }else if(this.props.reading === 1) {
            style = {'backgroundColor': '#c4cdb1', 'color': '#4E4E4E'};
        }else if(this.props.reading === -1) {
            style = {'backgroundColor': '#f5cabc', 'color': '#4E4E4E'};
        }else if(this.props.reading === -2) {
            style = {'backgroundColor': '#ec6f46', 'color': '#FFFCF9'};
        }

        // format the metrics value 
        let formattedValue = "";
        if (this.props.value > 100000){
            formattedValue = Numeral(this.props.value).format('0,0')
        } else if (this.props.value > 1000){
            formattedValue = Numeral(this.props.value).format('0,0')
        }else {
            formattedValue = Numeral(this.props.value).format('0.0')
        }

        return (
            <Card className="dataCard" style={style}>
                <CardText className="dataCardName">{this.props.metric}</CardText>
                <CardText className="dataCardValue">Last Reading:</CardText>
                <CardText className="dataCardValue">{formattedValue}</CardText>
                <CardTitle className="dataCardMetric">{this.props.dataPoint+'%'}</CardTitle>
                <CardText className="dataCardValue">Last Updated:</CardText>
                <CardText className="dataCardDate">{this.props.date}</CardText>
            </Card>
        );
    }
};

export default DataCard;