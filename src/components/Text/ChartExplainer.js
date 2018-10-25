import React from 'react';
import { Row, Col } from 'reactstrap';


const ChartExplainer = (props) => {

    return (
        <Row>
            <Col sm={{ size: 10, offset: 1 }}>
                <p className="chartExplainer d-none d-md-block">The two charts above aggregate readings across leading, coincident, and lagging economic data points.  The chart on the left plots the readings historically and the chart on the right plots the most recent readings.  Data points above the black LineChart indicate expansionary readings and data that is below the black line represents contractionary data. </p>
            </Col>

            <Col sm={{ size: 10, offset: 1 }}>
                <p className="chartExplainer d-block d-md-none">The chart above aggregates readings across leading, coincident, and lagging economic data points and plots the readings historically.</p>
            </Col>
        </Row>
    )
};

export default ChartExplainer;