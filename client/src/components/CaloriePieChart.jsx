import React from 'react'
import Chart from "react-google-charts";

class CaloriePieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.calculateGramsOfProtien = this.calculateGramsOfProtien.bind(this);
        this.calculateCaloriesFromFat = this.calculateCaloriesFromFat.bind(this);
        this.calculateCaloriesFromCarbs = this.calculateCaloriesFromCarbs.bind(this)
    }
    calculateGramsOfProtien() {
        var gramsOfProtein = this.props.currentUser.weight
        if (this.props.currentUser.weight > this.props.currentUser.goalweight) {
            gramsOfProtein = this.props.currentUser.weight*1.2
        }
        if (this.props.currentUser.weight === this.props.currentUser.goalweight) {
            gramsOfProtein = this.props.currentUser.weight*.75
        }
        return gramsOfProtein;
    }
    calculateCaloriesFromFat() {
        var gramsOfFat = (this.props.calculateCalories(this.props.currentUser))*.3
        if (this.props.currentUser.weight > this.props.currentUser.goalweight) {
            gramsOfFat = (this.props.calculateCalories(this.props.currentUser))*.2
        }
        return gramsOfFat;
    }
    calculateCaloriesFromCarbs() {
        var caloriesInOneGramOfProtein = 4;
        var totalCalories = this.props.calculateCalories(this.props.currentUser)
        var carbs = totalCalories - (this.calculateGramsOfProtien()*caloriesInOneGramOfProtein) - this.calculateCaloriesFromFat()
        return carbs;
    }

    render() {
        var caloriesInOneGramOfCarbs = 4;
        var caloriesInOneGramOfFat = 9
        return (
            <div>
                <div>
                    <div>
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['MacroNutrients', 'Grams per Day'],
                                ['Grams of Protein', Math.round(this.calculateGramsOfProtien())],
                                ['Grams of Carbs', Math.round(this.calculateCaloriesFromCarbs()/caloriesInOneGramOfCarbs)],
                                ['Grams of Fats', Math.round(this.calculateCaloriesFromFat()/caloriesInOneGramOfFat)],
                            ]}
                            options={{
                                title: 'Goal Caloric Breakdown',
                                pieSliceText: 'value',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </div>
                    
                </div>
               
            </div>

        )
    }
}
export default CaloriePieChart