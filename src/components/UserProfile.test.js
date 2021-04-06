import React from 'react'
import renderer from 'react-test-renderer'
import UserProfile from './UserProfile'


const user = {
    name: "dominik",
    email: "test@mail.de",
    company: "volkswagen",
    phone: "123454"
}

test('UserProfile renders consistently', () => {
    const tree = renderer.create(<UserProfile.WrappedComponent user={user} />).toJSON()
    expect(tree).toMatchSnapshot()
})


