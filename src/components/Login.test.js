import React from 'react'
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { shallow } from 'enzyme'
import Login from './Login'

Enzyme.configure({ adapter: new Adapter() })


describe('<Login/>', () => {
    it('renders Login properly and contains tags with className "mr-3"', () => {
        const wrapper = shallow(<Login.WrappedComponent />);
        expect(wrapper.find(".mr-3")).toHaveLength(1);
    })

    it('calls the desired function on ButtonClick', ()=>{
        const loginButtonCallback = jest.fn();
        const wrapper = shallow(<Login.WrappedComponent  userLogin={loginButtonCallback}/>);
        wrapper.find(".mr-3").simulate('click');
        expect(loginButtonCallback).toHaveBeenCalled
    })
})
