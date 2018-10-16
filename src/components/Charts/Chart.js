import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, HorizontalGridLines, LineSeries, makeVisFlexible } from 'react-vis';
import Moment from 'moment';


class LineChart extends Component {
    
    state = {
        activeIndicator: 'leading',
        leadingOpac: 1,
        coincidentOpac: .25,
        laggingOpac: .25,
        leadingStrokeStyle: "solid",
        coincidentStrokeStyle: "dashed",
        laggingStrokeStyle: "dashed"
    }

    //determine if selected indicator is active indicator

    
    render(){

        const FlexibleXYPlot = makeVisFlexible(XYPlot);
        
        let leadingPlotData = []
        let coincidentPlotData = []
        let laggingPlotData = []

        if(this.state.activeIndicator !== this.props.active){
            if(this.props.active === 'leading'){
                this.setState({
                    activeIndicator: 'leading',
                    leadingOpac: 1,
                    coincidentOpac: .25,
                    laggingOpac: .25,
                    leadingStrokeStyle: "solid",
                    coincidentStrokeStyle: "dashed",
                    laggingStrokeStyle: "dashed"
                })
            }else if(this.props.active === 'coincident'){
                this.setState({
                    activeIndicator: 'coincident',
                    leadingOpac: .25,
                    coincidentOpac: 1,
                    laggingOpac: .25,
                    leadingStrokeStyle: "dashed",
                    coincidentStrokeStyle: "solid",
                    laggingStrokeStyle: "dashed"
                })
            }else{
                this.setState({
                    activeIndicator: 'lagging',
                    leadingOpac: .25,
                    coincidentOpac: .25,
                    laggingOpac: 1,
                    leadingStrokeStyle: "dashed",
                    coincidentStrokeStyle: "dashed",
                    laggingStrokeStyle: "solid"
                })
            }
        }

        //build leading chart data
        if(this.props.data != null){
            leadingPlotData = this.props.data.map(point => {
                let dateString = Moment(point.date);
                dateString = dateString.format("M/YY");
                return {
                    x: dateString, y: point.leading,
                }
            })
            leadingPlotData = leadingPlotData.slice(0,36).reverse();
        }

        //build coincident chart data
        if(this.props.data != null){
            coincidentPlotData = this.props.data.map(point => {
                let dateString = Moment(point.date);
                dateString = dateString.format("M/YY");
                return {
                    x: dateString, y: point.coincident,
                }
            })
            coincidentPlotData = coincidentPlotData.slice(0,36).reverse();
        }

        //build lagging chart data
        if(this.props.data != null){
            laggingPlotData = this.props.data.map(point => {
                let dateString = Moment(point.date);
                dateString = dateString.format("M/YY");
                return {
                    x: dateString, y: point.lagging,
                }
            })
            laggingPlotData = laggingPlotData.slice(0,36).reverse();
        }

        let midLine = [];
        for(let i=0; i<laggingPlotData.length; i++){
            midLine.push({x: leadingPlotData[i].x, y: 0})
        }

        return (
            <FlexibleXYPlot
                yDomain={[-15, 15]}
                xType="ordinal"
                height={300}>
                <HorizontalGridLines />
                <XAxis tickLabelAngle={-60}/>
                <LineSeries data={leadingPlotData} color="#388659" opacity={this.state.leadingOpac} strokeStyle={this.state.leadingStrokeStyle}/>
                <LineSeries data={coincidentPlotData} color="#3F88C5" opacity={this.state.coincidentOpac} strokeStyle={this.state.coincidentStrokeStyle}/>
                <LineSeries data={laggingPlotData} color="#C6C013" opacity={this.state.laggingOpac} strokeStyle={this.state.laggingStrokeStyle}/>
                <LineSeries data={midLine} color="#4E4E4E" style={{strokeWidth: 3}}/>
            </FlexibleXYPlot>
        );
    }
}
  
  export default LineChart;