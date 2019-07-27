import reducer from "./burgerBuilder";
import * as actionTypes from "../actions/actionTypes";

describe("burgerBuilder.js[reducer]", () => {
    it("it should return initil state", () => {
        expect(reducer(undefined, {})).toEqual({
            totalPrice: 4,
            ingredients: null,
            unPurchasable: true,
            error: false,
            building: false
        });
    });

    it("it should set error to error", () => {
        expect(
            reducer(undefined, {
                type: actionTypes.FETCH_INGREDIENTS_FAILED
            })
        ).toEqual({
            totalPrice: 4,
            ingredients: null,
            unPurchasable: true,
            error: true,
            building: false
        });
    });
});
