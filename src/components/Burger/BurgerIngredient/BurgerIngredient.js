import React from 'react';
import './BurgerIngredient.css';
import propTypes from 'prop-types';

const BurgerIngredient = (props) => {

     let ingredient = null;
    switch(props.type){
        case('bread-bottom'):
            ingredient = <div className="BreadBottom"> bread bottom</div>;
            break;
        case('bread-top'):
            ingredient = (
                <div className="BreadTop">
                     <div className="Seeds1"> seed</div>
                     <div className="Seeds2">seed </div>
                     bread top
                </div>
            );
            break;
        case('meat'):
            ingredient = <div className="Meat"> meat</div>;
            break;
        case('cheese'):
            ingredient = <div className="Cheese">cheese</div>;
            break;
        case('salad'):
            ingredient = <div className="Salad">salad </div>;
            break;
        case('bacon'):
            ingredient = <div className="Bacon">bacon </div>;
            break;
        default:
            ingredient = null;
    }

    return ingredient;
}

BurgerIngredient.propTypes = {
    type:propTypes.string.isRequired
};

export default BurgerIngredient;