import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import Loader from 'react-loader-spinner'
import LineChart from '../Charts/MetricChart';
import Moment from 'moment';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
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
            FiveYearChange: null,
            Frequency: null,
            FrequencyShort: null
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
                FiveYearChange: response.data.FiveYearChange,
                Frequency: response.data.Frequency,
                FrequencyShort: response.data.FrequencyShort
            })
        })
        
    };
    
    render () {

        const CARDS = ['ThreeMonthChange', 'OneYearChange', 'ThreeYearChange', 'FiveYearChange'];
        const CARDS_TITLE = ['Three Month Change', 'One Year Change', 'Three Year Change', 'Five Year Change'];

        const changeCards = CARDS.map((period, i) => {
            //check if metrics are null - I check ThreeMonth only to see if api has been accessed
            if (this.state.ThreeMonthChange != null){
                const key = period;
                const name = CARDS_TITLE[i];
                const value = this.state[period];
                console.log("---------value-----------")
                console.log(value);
                let style = '';

                //color indicators for easy interpretation
                console.log(this.state.PositiveIndicatorDirection);
                if(this.state.PositiveIndicatorDirection === "negative"){
                    
                    if (value > 0) {
                        style = {'color' : 'red'}
                    }else{
                        style = {'color' : 'green'}
                    }
                }else{
                    if (value > 0) {
                        style = {'color' : 'green'}
                    }else{
                        style = {'color' : 'red'}
                    }
                }
                
                return  <Col md='3' key={key} className="metricCard"><h4>{name}</h4><p style={style} >{value.toFixed(2) + '%'}</p></Col>
            }
            return <Col md='3' className="cardLoader"><Loader type="Puff" color="#E8E8E8" height="20vh" /></Col>
        })

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
                        {this.state.ActualsData ? <LineChart data={this.state.ActualsData} freq={this.state.FrequencyShort} units={this.state.Units}/> : <div className="loader"><Loader type="Puff" color="#E3DBC8" height="20vh" /></div>}
                    </Container>

                </Container>

                <Container>
                    <Row>
                        {changeCards}
                    </Row>

                    <Row>
                        <Col md='8'>
                            <h2>Interpreting This Datapoint</h2><br />
                            <p>{this.state.FREDDescription}</p>
                        </Col>

                        <Col md='4'>
                            <p className='metricDataHeadings'>Full Indicator Name: <span className='metricData'>{this.state.IndicatorName}</span></p><br />
                            <p className='metricDataHeadings'>FRED Symbol: <span className='metricData'>{this.state.IndicatorSymbol}</span></p><br />
                            <p className='metricDataHeadings'>Indicator Type: <span className='metricData'>{this.state.IndicatorType}</span></p><br />
                            <p className='metricDataHeadings'>Units: <span className='metricData'>{this.state.Units}</span></p><br />
                            <p className='metricDataHeadings'>Update Frequency: <span className='metricData'>{this.state.Frequency}</span></p><br />
                            <p className='metricDataHeadings'>Notes About This Series (FRED)</p>
                            <p className='metricData' style={{'font-size': '.8rem'}}>{this.state.FREDDescription}</p>
                        </Col>
                    </Row>
                </Container>

                <Footer />
            </div>
        )
    }

}

export default MetricPage;