import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { userSignup, userLogin, userLogout } from './auth.actions'



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const email = 'dominik.krone@test.de';
const password = 'test';


describe('auth.actions for login, Signup and Logout', () => {
    afterEach(() => {
        fetchMock.restore();
        store = mockStore();
    });

    let store = mockStore();

    const passUser = {
        email: email,
        password: password,
    };

    const fetchError = new Error("Failed Request");

    it('creates USER_LOGIN_SUCCESS when trying to login to /api/login', async () => {
        fetchMock.post('http://localhost:8082/api/login', passUser);

        const expectedActions = [
            { type: 'USER_LOGIN_PENDING' },
            { type: 'USER_LOGIN_SUCCESS', payload: passUser }
        ];

        return store.dispatch(userLogin({ email, password }))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
    });

    it('creates USER_LOGIN_FAILED, receiving an error from the API', async () => {

        fetchMock.mock('http://localhost:8082/api/login', () => {
            throw fetchError;
        });

        const expectedAction = [
            { type: 'USER_LOGIN_PENDING' },
            { type: 'USER_LOGIN_FAILED', payload: fetchError }
        ];

        return store.dispatch(userLogin({})).
            then(() => {
                expect(store.getActions()).toEqual(expectedAction)
            });

    })


    it('creates USER_SIGNUP_SUCCESS when trying to signup to /api/login', async () => {
        fetchMock.post('http://localhost:8082/api/users', passUser)

        const expectedActions = [
            { type: 'USER_SIGNUP_PENDING' },
            { type: 'USER_SIGNUP_SUCCESS', payload: passUser },
        ];

        return store.dispatch(userSignup({ passUser }))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
    })


    it('creates USER_SIGNUP_FAILED, receiving an error from the API', async () => {

        fetchMock.mock('http://localhost:8082/api/users', () => {
            throw fetchError;
        });

        const expectedAction = [
            { type: 'USER_SIGNUP_PENDING' },
            { type: 'USER_SIGNUP_FAILED', payload: fetchError },
        ];

        return store.dispatch(userSignup({ passUser }))
            .then(() => {
                expect(store.getActions()).toEqual(expectedAction)
            });
    })

    it('creates USER_LOGOUT on using Logout function', async () => {
        const expectedAction = [
            { type: 'USER_LOGOUT' },
        ];

        return store.dispatch(userLogout())
            .then(() => {
                expect(store.getActions()).toEqual(expectedAction);

            })
    })
})

