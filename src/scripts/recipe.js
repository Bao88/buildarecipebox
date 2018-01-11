import React from 'react';
import ReactDOM from 'react-dom';
import "../css/recipe.css";
import RecipeForm from "./recipeform.js";
class Recipe extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.rID,
            name: props.data.name, 
            list: props.data.ingr, 
            recipeForm: false,
            showStore: true,
            showIngr: true
        };
    }

    removeRecipe = (event) => {
        this.setState({showStore: false});
    }

    editRecipe = (event) => {
        event.preventDefault();
        this.setState({
            name: event.target.elements[0].value,
            list: event.target.elements[1].value.split(",")
        });
        this.props.rmPar(event, this.state.id);
    }

    showRecipeForm = (event) => {
        this.setState({recipeForm: true});
        document.getElementById("overlay").style.display = "block";
    }

    closeForm = () => {
        this.setState({recipeForm: false});
        document.getElementById("overlay").style.display = "none";
    }

    open = () => {
        var tmp = this.state.showIngr;
        this.setState({showIngr: !tmp});
    }
    render() {
        return (
            <div className="recipe" style={{display: this.state.showStore ? 'block' : 'none',
                                            height: this.state.showIngr ? "35px": "auto"}} onClick={this.open} >
                <div className="titleS">{this.state.name}</div>
                <h3 className="hideI">Ingredients
                    {/* <Ingredient name="Carrot"/> */}
                </h3>
                {
                    this.state.list.map((i, index) => (
                        <p key={index}>{i}</p>
                    ))
                }
                <button className="recipeButton" onClick={this.props.rm}>Delete</button>
                <button className="recipeButton" onClick={this.showRecipeForm}>Edit</button>
                {
                    this.state.recipeForm ? <RecipeForm className="form2" val="Edit" id={this.props.rID} name="Edit Recipe" rName={this.state.name} list={this.state.list} onSubmit={this.editRecipe} closeM = {this.closeForm}/> : null
                }
            </div>
        );
    }
}

export default Recipe;