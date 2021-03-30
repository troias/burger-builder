
import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import NavigationItems from './NavigationItems'
import NavItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter() })

describe('<NavigationItems />', () => {

    let wrapper;

    beforeEach(() => {
     wrapper = shallow(<NavigationItems/>)
    })

    it('should render two <NavigationItems /> elements if unauthenticated', () => {
      
        expect(wrapper.find(NavItem)).toHaveLength(2)
    })

    it('should render three <NavigationItems /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({isAuthenticated: true  })
        expect(wrapper.find(NavItem)).toHaveLength(3)
    })

    it('should render three <NavigationItems /> elements if authenticated', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({isAuthenticated: true  })
        expect(wrapper.contains(<NavItem link="/logout">Log Out</NavItem> )).toEqual(true)
    })

})