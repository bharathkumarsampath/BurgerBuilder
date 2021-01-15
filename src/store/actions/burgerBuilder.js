import * as actionTypes from './actionsTypes'
import axios from '../../axios-orders'
export const addIngredient = (ingredientName) => {
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingredientName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/Ingredients.json')
        .then(response=>{
            dispatch(setIngredients(response.data));
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed());
        })
    }
}

