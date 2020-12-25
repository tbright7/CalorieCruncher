import React from 'react'
import Chart from "react-google-charts";

class WeightGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.populateData = this.populateData.bind(this)
    }
    populateData() {
        var data = [['x', 'weight']]
        for (var i = 0; i < this.props.currentUserWeight.length; i++) {
            var date = this.props.currentUserWeight[i].date
            var weight = this.props.currentUserWeight[i].weight
            data.push([date, weight])
        }
        return data
    }

    render() {
        return (
            <div>
            {this.props.currentUserWeight !== undefined &&
                    <Chart
                        width={'600px'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={this.populateData()}
                        options={{
                            hAxis: {
                                title: 'Weigh-ins',
                            },
                            vAxis: {
                                title: 'Weight in lbs',
                            },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
            }
            </div>
        )
    }
}

export default WeightGraph;