import App from './App'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'

const BASE_URL = 'http://localhost:8082'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    isLoading: false,
    user: {},
    showLoginError: false,
    showSignupError: false
})
const user = {
    name: "dominik",
    email: "test@mail.de",
    company: "volkswagen",
    phone: "123454"
}

describe('App', () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it('renders without error', ()=> {
        fetchMock.get(`${BASE_URL}/api/login`, user);
    })
    
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </MemoryRouter>
        , div
    )
})