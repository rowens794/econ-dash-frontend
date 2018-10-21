import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, HorizontalGridLines, LineSeries, makeVisFlexible } from 'react-vis';
import {timeFormatDefaultLocale} from 'd3-time-format';
import Moment from 'moment';


class LineChart extends Component {
    
    state = {

    }
    
    
    render(){

        const FlexibleXYPlot = makeVisFlexible(XYPlot);

        let dataPoints = [];

        //build leading chart data
        if(this.props.data != null){
            dataPoints = this.props.data.map((point) => {
                return {
                    x: new Date(point.date), y: point.value,
                }
            })
            dataPoints = dataPoints.slice(0,100).reverse();
            console.log(dataPoints[0])
            
        }

        return (
            <FlexibleXYPlot
                height={300}>
                <HorizontalGridLines />
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