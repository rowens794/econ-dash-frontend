import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, makeVisFlexible } from 'react-vis';
import Moment from 'moment';


class LineChart extends Component {
    
    render(){

        const FlexibleXYPlot = makeVisFlexible(XYPlot);

        let dataPoints = [];

        //build leading chart data
        if(this.props.data != null){
            dataPoints = this.props.data.map((point) => {
                return {
                    x: new Date(point.date), y: parseFloat(point.value),
                }
            })
            
            //determine how many data points need to be selected
            const years = 10;
            let periods = years * 12;
            if (this.props.freq === 'Q'){
                console.log('quarterly')
                periods = years * 4;
            }
            else if (this.props.freq === 'Y'){
                console.log('yearly')
                periods = years;
            }else if (this.props.freq === 'W'){
                console.log('yearly')
                periods = years * 52;
            }else if (this.props.freq === 'D'){
                console.log('yearly')
                periods = years * 365;
            }

            dataPoints = dataPoints.slice(0,periods).reverse();
            
        }

        //clean NAN's
        for (let i=0; i<dataPoints.length; i++){
            if (isNaN(dataPoints[i].y)){
                if(i===0 || isNaN(dataPoints[i-1].y)){
                    dataPoints[i].y = dataPoints[i+1].y
                }else{
                    dataPoints[i].y = dataPoints[i-1].y;
                }
            }
        }
        console.log(dataPoints)

        return (
            <FlexibleXYPlot
                height={300}>
                <HorizontalGridLines />
                <YAxis left={50} title={this.props.units}/>
                <XAxis tickLabelAngle={-30}
                tickFormat={(d => formatDate(d))} />
                <LineSeries data={dataPoints} color="#388659" opacity={1} strokeStyle={"solid"} tickTotal={5}/>
            </FlexibleXYPlot>
        );
    }
}
  
  export default LineChart;

  function formatDate(date){
      let newDate = Moment(date);
      let formattedDate = newDate.format('MMM YY');
      return formattedDate;
  }