import React from 'react'
import Chart from "react-google-charts";

class CaloriePieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calories: this.props.calories
        }
    }

    render() {
        return (
            <div id="graph" key={this.props.protein}>
                <Chart
                    width={'480px'}
                    height={'280px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['MacroNutrients', 'Grams per Day'],
                        ['Grams of Protein', this.props.protein],
                        ['Grams of Carbs', this.props.carbs],
                        ['Grams of Fats', this.props.fat],
                    ]}
                    options={{
                        title: 'Ideal Macronutrient Breakdown',
                        pieSliceText: 'value',
                        backgroundColor: 'none',
                        borderRadius: "100"

                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        )
    }
}
export default CaloriePieChart


