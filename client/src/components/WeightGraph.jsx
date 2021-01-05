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
            var date= date.slice(0, 10)
            var weight = this.props.currentUserWeight[i].weight
            data.push([date, weight])
        }
        return data
    }

    render() {
        return (
            <div id ="graph">
                {this.props.currentUserWeight !== undefined &&
                    <Chart
                    id="graph"
                    width={'480px'}
                    height={'280px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={this.populateData()}
                        options={{
                            title: `${this.props.currentUser.username}'s weight history`,

                            hAxis: {
                                title: 'Weigh-ins',
                            },
                            vAxis: {
                                title: 'Weight in lbs',
                            },
                            backgroundColor: 'none',
                            strokeWidth: 1,
                            
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                }
            </div>
        )
    }
}

export default WeightGraph;