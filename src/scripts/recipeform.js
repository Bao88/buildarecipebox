import React from 'react';
import ReactDOM from 'react-dom';

class RecipeForm extends React.Component {
    constructor(props){
        super(props);
        var n = props.rName;
        var r = props.list;
        this.state = {name: n, list: r};
    }
    render() {
        return (
            <form onSubmit={this.props.onSubmit} id="form" className={this.props.className}>
                <h1>{this.props.name}</h1>
                <label>
                    <div>
                        Recipe
                    </div>
                    <input type="text" defaultValue={this.state.name} placeholder="Recipe name" onChange={this.props.addN}/>
                </label>
                <label>
                    <div>
                        Ingredients
                    </div>
                    <textarea type="text" defaultValue={this.state.list} placeholder="Ingredients separated by commas" onChange={this.props.addI}/>                    
                </label>
                <input type="submit" value={this.props.val} />
                <input type="button" value="Close" onClick={this.props.closeM}/>
            </form>
        );
    }
}

export default RecipeForm;