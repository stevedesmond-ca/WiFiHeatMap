import { Test, TestSuite } from "xunit.ts";
import DebugPanel from '../App/debug-panel.vue';
import { shallowMount as mount } from '@vue/test-utils';
import Signal from "../App/Signal";
import AppViewModel from "../App/AppViewModel";
import Reading from "../App/Reading";
import Point from "../App/Point";

export default class DebugPanelTests extends TestSuite {
    @Test()
    async displayedWhenEnabled() {
        //arrange
        const state = new AppViewModel();
        state.debug = true;

        //act
        const component = mount(DebugPanel, { data: () => ({ state: state }) });

        //assert
        this.assert.null(component.attributes('style'));
    }

    @Test()
    async notDisplayedWhenNotEnabled() {
        //arrange
        const state = new AppViewModel();
        state.debug = false;

        //act
        const component = mount(DebugPanel, { data: () => ({ state: state }) });

        //assert
        this.assert.stringContains('display: none;', component.attributes('style'));
    }

    @Test()
    async signalsAreSortedByStrength() {
        //arrange
        const signals = [
            new Signal('mac1', 'ssid1', 2, -50),
            new Signal('mac2', 'ssid2', 2, -40)
        ];
        const state = new AppViewModel();
        state.current = new Reading(0, new Point(0,0), signals);
        const component = mount(DebugPanel, { data: () => ({state: state }) });
        
        //act
        const sorted_signals = component.findAll('table tbody tr');

        //assert
        this.assert.stringContains('-40', sorted_signals[0].text());
        this.assert.stringContains('-50', sorted_signals[1].text());
    }
}