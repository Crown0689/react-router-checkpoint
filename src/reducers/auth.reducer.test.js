import reducer from './auth.reducers'
import * as actions from '../actions/auth.actions'
import deepFreeze from 'deep-freeze'

describe('auth-reducer', () => {
    it('should return the initial state, when no input is given', () => {
        expect(reducer(undefined, {})).toEqual({
            isLoading: false,
            user: {},
            showLoginError: false,
            showSignupError: false
        });
    });

    it('should handle USER_LOGIN_PENDING', () => {
        const currentState = {};
        deepFreeze(currentState);

        expect(
            reducer (currentState, {
                type : actions.USER_LOGIN_PENDING,
            })
        ).toEqual({
            isLoading: true,
        })
    })

    it('should handle USER_LOGIN_SUCCESS', () => {
        const currentState = {};
        deepFreeze(currentState);
        expect(
            reducer (currentState, {
                type : actions.USER_LOGIN_SUCCESS,
            })
        ).toEqual({
            isLoading: false, 
            user: actions.payload,
        })
    })

    it('should handle USER_LOGIN_FAILED', () => {
        const currentState = {};
        deepFreeze(currentState);
        expect(
            reducer (currentState, {
                type : actions.USER_LOGIN_FAILED,
            })
        ).toEqual({
            isLoading: false, 
            showLoginError: true,
        })
    })

    it('should handle USER_SIGNUP_PENDING', () => {
        const currentState = {};
        deepFreeze(currentState);
        expect(
            reducer (currentState, {
                type : actions.USER_SIGNUP_PENDING,
            })
        ).toEqual({
            isLoading: true
        })
    })

    it('should handle USER_SIGNUP_SUCCESS', () => {
        const currentState = {};
        deepFreeze(currentState);
        expect(
            reducer (currentState, {
                type : actions.USER_SIGNUP_SUCCESS,
            })
        ).toEqual({
            isLoading: false
        })
    })

    it('should handle USER_SIGNUP_FAILED', () => {
        const currentState = {};
        deepFreeze(currentState);
        expect(
            reducer (currentState, {
                type : actions.USER_SIGNUP_FAILED,
            })
        ).toEqual({
            isLoading: false, 
            showSignupError: true,
        })
    })


})