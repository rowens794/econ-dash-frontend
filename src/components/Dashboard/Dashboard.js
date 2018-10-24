import React, { Component } from 'react';
import Card from '../DataCards/DataCards';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import Loader from 'react-loader-spinner'
import LineChart from '../Charts/Chart';
import PointChart from '../Charts/SummaryChart';
import Moment from 'moment';
import Navigation from '../Navigation/Navigation';
import ChartExplainer from '../Text/ChartExplainer';
import Footer from '../Footer/Footer';
import { Link } from "react-router-dom";


const LEADING_IND = ['AWHMAN','ICSA','ACDGNO','AMTMNO','UNXANO','PERMIT','WILL5000INDFC','T10Y3M']
const COINCIDENT_IND = ['UMCSENT','PAYEMS','DSPIC96','INDPRO','CMRMTSPL']
const LAGGING_IND = ['UEMPMEAN','ISRATIO','ULCNFB','MPRIME','TOTCI','TDSP']


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartData: null,
            indicators: null,
            lastUpdate: null,
            activeIndicator: 'leading',
        }

        this.handleIndicatorButton = this.handleIndicatorButton.bind(this);
    }
    
    componentDidMount() {
        axios.get('https://serene-spire-98738.herokuapp.com/')
        .then(response => {
            this.setState({
                chartData: response.data.chartData,
                indicators: response.data.indicators,
                lastUpdate: response.data.lastUpdate,
                leadingStyle: {'backgroundColor': '#388659', 'color':'#F9F0DB'},
                coincidentStyle: {},
                laggingStyle: {}
            })
        })
    };
    
    handleIndicatorButton(type) {
        let leadingStyle = {};
        let coincidentStyle = {};
        let laggingStyle = {};

        if (type === 'leading') leadingStyle = {'backgroundColor': '#388659', 'color':'#F9F0DB'}
        if (type === 'coincident') coincidentStyle = {'backgroundColor': '#3F88C5', 'color':'#F9F0DB'}
        if (type === 'lagging') laggingStyle = {'backgroundColor': '#C6C013', 'color':'#F9F0DB'}

        this.setState({
            activeIndicator: type,
            leadingStyle: leadingStyle,
            coincidentStyle: coincidentStyle,
            laggingStyle: laggingStyle
        });
    }
    
    render () {
        
        const leadingIndicators = LEADING_IND.map(indicator => {
            if (this.state.indicators != null){
                const key = this.state.indicators[indicator].key;
                console.log(key);
                const dataPoint = this.state.indicators[indicator].oneMonthChange;
                const reading = this.state.indicators[indicator].lastReading;
                const name = this.state.indicators[indicator].shortName;
                const value = this.state.indicators[indicator].value;
                const date = Moment(this.state.indicators[indicator].lastUpdate).format("MMMM Do, YYYY");
                return  <Link to={"/"+key} key={key} style={{ textDecoration: 'none' }}><Card metric={name} dataPoint={dataPoint} reading={reading} value={value} date={date} /></Link>
            }
            return null
        })

        const conincidentIndicators = COINCIDENT_IND.map(indicator => {
            if (this.state.indicators != null){
                const key = this.state.indicators[indicator].key;
                const dataPoint = this.state.indicators[indicator].oneMonthChange;
                const reading = this.state.indicators[indicator].lastReading;
                const name = this.state.indicators[indicator].shortName;
                const value = this.state.indicators[indicator].value;
                const date = Moment(this.state.indicators[indicator].lastUpdate).format("MMMM Do, YYYY");
                return  <Link to={"/"+key} key={key} style={{ textDecoration: 'none' }}><Card metric={name} dataPoint={dataPoint} reading={reading} value={value} date={date} /></Link>
            }
            return null
        })

        const laggingIndicators = LAGGING_IND.map(indicator => {
            if (this.state.indicators != null){
                const key = this.state.indicators[indicator].key;
                const dataPoint = this.state.indicators[indicator].oneMonthChange;
                const reading = this.state.indicators[indicator].lastReading;
                const name = this.state.indicators[indicator].shortName;
                const value = this.state.indicators[indicator].value;
                const date = Moment(this.state.indicators[indicator].lastUpdate).format("MMMM Do, YYYY");
                return  <Link to={"/"+key} key={key} style={{ textDecoration: 'none' }}><Card metric={name} dataPoint={dataPoint} reading={reading} value={value} date={date} /></Link>
            }
            return null
        })

        return(
            <div>
                <Container fluid={true} className='headerSection'>
                    <Navigation />

                    <Container>
                        <br/>
                        <h2 className='dashboardHeading'>US Economic Dashboard</h2>
                        <br/>
                        <h4 className='dateHeading'>as of {Moment(this.state.lastUpdate || (new Date())).format("MMMM Do, YYYY")}</h4>
                        <Row className='chartRow'>
                            <Col md="8">
                                <Row>
                                    <Col>
                                        {this.state.chartData ? <LineChart data={this.state.chartData} active={this.state.activeIndicator}/> : <div className="loader"><Loader type="Puff" color="#E3DBC8" height="20vh" /></div>}
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="4">
                                <Row>
                                    <Col className='d-none d-md-block'>
                                        {this.state.chartData ? <PointChart pcdata={this.state.chartData} active={this.state.activeIndicator}/> : <div className="loader"><Loader type="Puff" color="#E3DBC8" height="20vh" /></div>}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className='buttonContainer'>
                            <ChartExplainer />

                            <Container >
                                <button className='laggingButton' style={this.state.laggingStyle} onClick={() => this.handleIndicatorButton('lagging')}>lagging</button>
                                <button className='coincidentButton' style={this.state.coincidentStyle} onClick={() => this.handleIndicatorButton('coincident')}>coincident</button>
                                <button className='leadingButton' style={this.state.leadingStyle} onClick={() => this.handleIndicatorButton('leading')}>leading</button>
                            </Container>

                        </Row>
                    </Container>
                </Container>

                <Container>
                    <Row>
                        <Col md="12">
                            <Row><h3 className='dashboardSeriesHeadings'>Leading Indicators</h3></Row>
                            <Row>{leadingIndicators}</Row>

                            <Row><h3 className='dashboardSeriesHeadings'>Coincident Indicators</h3></Row>
                            <Row>{conincidentIndicators}</Row>

                            <Row><h3 className='dashboardSeriesHeadings'>Lagging Indicators</h3></Row>
                            <Row>{laggingIndicators}</Row>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }

}

export default Dashboard;