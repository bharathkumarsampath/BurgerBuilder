import * as actionTypes from '../actions/actionsTypes'
import {updateObject} from '../utility'
const initialState = {
    ingredients:null,
    price:4,
    error:false,
    building:false
}

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

const addIngredient = (state,action) => {
    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName] + 1};
    const ingredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = updateObject(state,{
        ingredients,
        price:state.price + INGREDIENT_PRICES[action.ingredientName],
        building:true
    })
    return updatedState;
}

const removeIngredient = (state,action) => {
    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName] - 1};
    const ingredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = updateObject(state,{
        ingredients,
        price:state.price - INGREDIENT_PRICES[action.ingredientName],
        building:true
    })
    return updatedState;
}

const setIngredient = (state,action) => {
    const ingredients = updateObject(state.ingredients,{
        salad:action.ingredients.salad,
        bacon:action.ingredients.bacon,
        cheese:action.ingredients.cheese,
        meat:action.ingredients.meat
})
    const updatedState = updateObject(state,{
        ingredients,
        error:false,
        price:4,
        building:false
    })
    return updatedState;
}

const fetchIngredientsFailed = (state,action) => {
    return updateObject(state,{error:true});
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENT: return setIngredient(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action);
        default: return state;
    }   
}

export default reducer;