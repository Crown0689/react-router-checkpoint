import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { userLogin } from './auth.actions'
import {userSignup} from './auth.actions'



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const email = 'dominik.krone@test.de';
const password = 'test';


describe('auth.actions for login and Signup', () => {
    afterEach(() => {
        fetchMock.restore();
        store=mockStore()
    })

    let store = mockStore()

    const passUser = {
        email: email,
        password: password,
    }

    it('creates USER_LOGIN_SUCCESS when trying to login to /api/login', async () => {
        fetchMock.post('http://localhost:8082/api/login', passUser)

        const response = await fetch('http://localhost:8082/api/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passUser})
        }
        )
        const payload = await (response.json());
        const expectedActions = [
            { type: 'USER_LOGIN_PENDING' },
            { type: 'USER_LOGIN_SUCCESS', payload }
        ]

        

        return store.dispatch(userLogin({ email, password }))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('creates USER_LOGIN_FAILED, receiving an error from the API', async () => {
        const failUser = {
            email: email, 
            password: 1234,
        }
        fetchMock.mock('http://localhost:8082/api/login', new Error('Test') )
        const response = await fetch('http://localhost:8082/api/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passUser})
        })
        const payload = await (response.json());
      
        const expectedAction = [
            { type: 'USER_LOGIN_FAILED', payload }
        ]
        
        return store.dispatch(userLogin({failUser})).
        then(()=> {
                expect(store.getActions()).toEqual(expectedAction)
            })
        
    })


    it('creates USER_SIGNUP_SUCCESS when trying to signup to /api/login', async () => {
        fetchMock.post('http://localhost:8082/api/users', passUser)
        


        const response = await fetch('http://localhost:8082/api/users', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passUser})
        }
        )
        const payload = await (response.json());
        const expectedActions = [
            { type: 'USER_SIGNUP_PENDING' },
            { type: 'USER_SIGNUP_SUCCESS', payload }
        ]

        

        return store.dispatch(userSignup({ email, password }))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('creates USER_SIGNUP_FAILED, receiving an error from the API', async () => {
        
        fetchMock.mock('http://localhost:8082/api/users', new Error('Test') )
        const response = await fetch('http://localhost:8082/api/users', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passUser})
        })
        const payload = await (response.json());
      
        const expectedAction = [
            { type: 'USER_LOGIN_FAILED', payload }
        ]
        
        return store.dispatch(userSignup({passUser})).
        then(()=> {
                expect(store.getActions()).toEqual(expectedAction)
            })
        
    })
})
