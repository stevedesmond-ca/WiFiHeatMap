import { Test, TestSuite } from "xunit.ts";
import DataPoint from '../App/data-point.vue';
import { shallowMount as mount } from '@vue/test-utils';
import Reading from "../App/Reading";
import Point from "../App/Point";
import Signal from "../App/Signal";
import AccessPoint from "../App/AccessPoint";
import AppViewModel from "../App/AppViewModel";

export default class DataPointTests extends TestSuite {
    @Test()
    async showsSignalOnDataPoint() {
        //arrange
        const reading = new Reading(1, new Point(0, 0), [new Signal('mac', 'test', 2, -30)]);
        const selected = new AccessPoint('test');

        //act
        const component = mount(DataPoint, { props: { reading: reading, selected: selected } });

        //assert
        this.assert.equal('-30 dBm', component.text());
    }

    @Test()
    async showsNoSignalWhenNoSignal() {
        //arrange
        const reading = new Reading(1, new Point(0, 0), []);
        const selected = new AccessPoint('test');

        //act
        const component = mount(DataPoint, { props: { reading: reading, selected: selected } });

        //assert
        this.assert.equal('(no signal)', component.text());
    }

    @Test()
    async positionMatchesReadingLocation() {
        //arrange
        const reading = new Reading(1, new Point(12, 34), [new Signal('mac', 'test', 2, -30)]);
        const selected = new AccessPoint('test');

        //act
        const component = mount(DataPoint, { props: { reading: reading, selected: selected } });

        //assert
        this.assert.stringContains('left: 12px;', component.html());
        this.assert.stringContains('top: 34px;', component.html());
    }

    @Test()
    async clickingDeletesReading() {
        //arrange
        const state = new AppViewModel();
        state.readings = [
            new Reading(1, new Point(0, 0), []),
            new Reading(2, new Point(0, 0), []),
            new Reading(3, new Point(0, 0), [])
        ]
        const reading = new Reading(1, new Point(12, 34), [new Signal('mac', 'test', 2, -30)]);
        const selected = new AccessPoint('test');
        const component = mount(DataPoint, { data: () => ({state: state }), props: { index: 1, reading: reading, selected: selected } });
        global.confirm = () => true;

        //act
        await component.get('.delete').trigger('click');

        //assert
        this.assert.count(2, state.readings);
        this.assert.equal(1, state.readings[0].id);
        this.assert.equal(3, state.readings[1].id);
    }

    @Test()
    async cancellingConfirmDoesNotDeleteReading() {
        //arrange
        const state = new AppViewModel();
        state.readings = [
            new Reading(1, new Point(0, 0), []),
            new Reading(2, new Point(0, 0), []),
            new Reading(3, new Point(0, 0), [])
        ]
        const reading = new Reading(1, new Point(12, 34), [new Signal('mac', 'test', 2, -30)]);
        const selected = new AccessPoint('test');
        const component = mount(DataPoint, { data: () => ({state: state }), props: { index: 1, reading: reading, selected: selected } });
        global.confirm = () => false;

        //act
        await component.get('.delete').trigger('click');

        //assert
        this.assert.count(3, state.readings);
    }
}