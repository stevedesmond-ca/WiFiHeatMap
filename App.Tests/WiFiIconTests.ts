import { Test, TestSuite } from "xunit.ts";
import { shallowMount as mount } from '@vue/test-utils';
import WiFiIcon from '../App/wifi-icon.vue';

export default class WiFiIconTests extends TestSuite {
    @Test()
    async colorGetsPassedToSVG() {
        //arrange
        const color = 'rgba(0, 255, 0, 1)';

        //act
        const component = mount(WiFiIcon, { props: { color: color } });

        //assert
        this.assert.stringContains('style="fill: rgba(0, 255, 0, 1);"', component.html());
    }
}
