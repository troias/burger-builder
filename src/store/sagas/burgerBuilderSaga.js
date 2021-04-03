import { put } from 'redux-saga/effects'
import instance from '../../axios-orders'
import * as actions from '../actions/index'

export function* addInitialIngredientsSaga(action) {
    try {
        const req =  yield instance.get("/ingrediens.json")
        yield put(actions.setIngredient(req.data));
    } catch (error) {
        yield put(actions.setError());
    }
}