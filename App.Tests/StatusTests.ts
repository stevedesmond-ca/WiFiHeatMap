import { Test, TestSuite } from "xunit.ts";
import Status from '../App/status.vue';
import { shallowMount as mount } from '@vue/test-utils';

export default class StatusTests extends TestSuite {
    @Test()
    async showsStatusWhenOneExists() {
        //arrange
        const status = 'test message';

        //act
        const component = mount(Status, { props: { status: status } });

        //assert
        this.assert.equal('test message', component.text());
    }

    @Test()
    async componentDoesNotDisplayWhenNoStatus() {
        //arrange
        const status = '';

        //act
        const component = mount(Status, { props: { status: status } });

        //assert
        this.assert.empty(component.text());
    }
}