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
            <div id="pieChart">
                <Chart
                    width={'500px'}
                    height={'300px'}
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
                        backgroundColor: '#3ba3c2'

                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        )
    }
}
export default CaloriePieChart


