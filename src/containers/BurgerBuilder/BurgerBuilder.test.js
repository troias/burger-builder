import { BurgerBuilder } from './BurgerBuilder'
import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({adapter: new Adapter() })

describe('<BurgerBuilder />', () => {

    let wrapper;

    beforeEach(() => {
     wrapper = shallow(<BurgerBuilder addInitialIngredients={() => {}}/>)
    })

    it('Should render <BurgerBuilder/> when recievign ingredients ', () => {
        wrapper.setProps({ings: {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })


})


