import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import Loader from 'react-loader-spinner'
import LineChart from '../Charts/MetricChart';
import Moment from 'moment';
import Navigation from '../Navigation/Navigation';
import { Link } from "react-router-dom";


class MetricPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            IndicatorSymbol: null,
            IndicatorType: null,
            PositiveIndicatorDirection: null,
            IndicatorName: null, 
            IndicatorShortName: null,
            PositiveIndicatorDirection: null,
            LastUpdated: null,
            FREDDescription: null,
            SummaryDescription: null,
            ActualsData: null,
            Units: null,
            ThreeMonthChange: null,
            OneYearChange: null,
            ThreeYearChange: null,
            FiveYearChange: null
        }

    }
    
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get('https://serene-spire-98738.herokuapp.com/'+id)
        .then(response => {
            this.setState({
                IndicatorSymbol: response.data.IndicatorSymbol,
                IndicatorType: response.data.IndicatorType,
                PositiveIndicatorDirection: response.data.PositiveIndicatorDirection,
                IndicatorName: response.data.IndicatorName, 
                IndicatorShortName: response.data.IndicatorShortName,
                PositiveIndicatorDirection: response.data.PositiveIndicatorDirection,
                LastUpdated: response.data.LastUpdated,
                FREDDescription: response.data.FREDDescription,
                SummaryDescription: response.data.SummaryDescription,
                ActualsData: response.data.ActualsData,
                Units: response.data.Units,
                ThreeMonthChange: response.data.ThreeMonthChange,
                OneYearChange: response.data.OneYearChange,
                ThreeYearChange: response.data.ThreeYearChange,
                FiveYearChange: response.data.FiveYearChange
            })
        })
    };
    
    render () {

        return(
            <div>
                <Container fluid={true} className='headerSection'>
                    <Navigation />

                    <Container>
                        <br/>
                        <h2 className='dashboardHeading'>{this.state.IndicatorShortName}</h2>
                        <br />
                        <p className='dateHeading'>{'Last Reading: ' + Moment(this.state.LastUpdated).format("MMMM Do, YYYY")}</p>
                        <br/>
                        {this.state.ActualsData ? <LineChart data={this.state.ActualsData}/> : <div className="loader"><Loader type="Puff" color="#E3DBC8" height="20vh" /></div>}
                    </Container>

                </Container>

                <Container>
                    <Row>

                    </Row>
                </Container>
            </div>
        )
    }

}

export default MetricPage;