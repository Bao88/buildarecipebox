import React from 'react';
import ReactDOM from 'react-dom';
import "../css/recipe.css";

class Ingredient extends React.Component {
    
    addIngredients(name){

    }

    render(){
        return (
            <p>{this.props.name}</p>
        );
    }
}
class Recipe extends React.Component {
    state = {list: []};

    addIngredients(name){
        this.setState({list: []});
    }

    render() {
        console.log("Recipe ");

        return (
            <div className="recipe">
                <div className="titleS">{this.props.data.name}</div>
                <h3 className="hideI">Ingredients
                    {/* <Ingredient name="Carrot"/> */}
                </h3>
                {
                    this.props.data.ingr.map((i) => (
                        <p>{i}</p>
                    ))
                }
            </div>
        );
    }
}

export default Recipe;