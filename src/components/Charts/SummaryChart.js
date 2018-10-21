import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, VerticalGridLines,HorizontalGridLines, LineMarkSeries, makeVisFlexible } from 'react-vis';

class PointChart extends Component {
    
    state = {
        activeIndicator: 'leading',
        leadingOpac: 1,
        coincidentOpac: .5,
        laggingOpac: .5,
    }

    render() {


        const FlexibleXYPlot = makeVisFlexible(XYPlot);
        
        let dataLeading = [];
        let dataCoincident = [];
        let dataLagging = [];
        let midLine = [];

        if(this.props.pcdata != null){
            let leading = this.props.pcdata[0].leading;
            let coincident = this.props.pcdata[0].coincident;
            let lagging = this.props.pcdata[0].lagging;
            dataLagging= [{x: 'lagging', y: lagging, size: 10 }]; 
            dataCoincident = [{x: 'coincident', y: coincident, size: 10}] 
            dataLeading = [{x: 'leading', y: leading, size: 10}]
            midLine = [{x: 'lagging', y: 0}, {x: 'coincident', y: 0}, {x: 'leading', y: 0}]
        }

        if(this.state.activeIndicator !== this.props.active){
            if(this.props.active === 'leading'){
                this.setState({
                    activeIndicator: 'leading',
                    leadingOpac: 1,
                    coincidentOpac: .5,
                    laggingOpac: .5,
                })
            }else if(this.props.active === 'coincident'){
                this.setState({
                    activeIndicator: 'coincident',
                    leadingOpac: .5,
                    coincidentOpac: 1,
                    laggingOpac: .5,
                })
            }else{
                this.setState({
                    activeIndicator: 'lagging',
                    leadingOpac: .5,
                    coincidentOpac: .5,
                    laggingOpac: 1,
                })
            }
        }

        let WORDS = ['', 'Contracting', '', 'Expanding', ''];

        return (
            <FlexibleXYPlot height={300} yDomain={[-2, 2]} xType="ordinal" xDomain={['lagging', 'coincident', 'leading']} >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis tickFormat={v => WORDS[v+2]} tickLabelAngle={-90} top={-15} position='start'/>
                <LineMarkSeries
                    style={{
                        strokeWidth: '0px'
                    }}
                    markStyle={{stroke: 'blue'}}
                    data={dataLeading}
                    color="#388659"
                    opacity={this.state.leadingOpac}
                />
                <LineMarkSeries
                    style={{
                        strokeWidth: '0px'
                    }}
                    markStyle={{stroke: 'blue'}}
                    data={dataCoincident}
                    color="#3F88C5"
                    opacity={this.state.coincidentOpac}
                />
                <LineMarkSeries
                    style={{
                        strokeWidth: '0px'
                    }}
                    markStyle={{stroke: 'blue'}}
                    data={dataLagging}
                    color="#C6C013"
                    opacity={this.state.laggingOpac}
                />
                <LineMarkSeries
                    style={{
                        strokeWidth: '3px'
                    }}
                    markStyle={{stroke: '#4E4E4E'}}
                    data={midLine}
                    color="#4E4E4E"
                />

            </FlexibleXYPlot>
        );
    }
}
  
export default PointChart;