import { Test, TestSuite } from "xunit.ts";
import APForm from '../App/ap-form.vue';
import { shallowMount as mount } from '@vue/test-utils';
import Reading from "../App/Reading";
import Point from "../App/Point";
import Signal from "../App/Signal";
import AppViewModel from "../App/AppViewModel";

export default class APFormTests extends TestSuite {

    private static signals = [
        new Signal('mac2', 'ssid2', 2, -30),
        new Signal('mac5', 'ssid2', 2, -50),
        new Signal('mac3', 'ssid2', 5, -30),
        new Signal('mac4', 'ssid2', 5, -60),
        new Signal('mac1', 'ssid1', 2, -40),
        new Signal('mac7', 'ssid1', 5, -70),
        new Signal('mac6', 'ssid1', 5, -90),
        new Signal('mac8', 'ssid1', 2, -80),
    ];

    @Test()
    async accessPointsAreSortedWhenGroupedBySSIDAndFrequency() {
        //arrange
        const state = new AppViewModel();
        state.current = new Reading(0, new Point(0, 0), APFormTests.signals);
        const component = mount(APForm, { data: () => ({ state: state })});

        //act
        const options = component.findAll('option');

        //assert
        this.assert.equal('ssid1', options[0].text());
        this.assert.equal('ssid2', options[1].text());
    }

    @Test()
    async accessPointsAreSortedWhenGroupedBySSID() {
        //arrange
        const state = new AppViewModel();
        state.current = new Reading(0, new Point(0, 0), APFormTests.signals);
        const component = mount(APForm, { data: () => ({ state: state }) });

        //act
        component.get('#group-by-frequency').setChecked(false);
        await component.vm.$nextTick();

        //assert
        const options = component.findAll('option');
        this.assert.equal('ssid1 @ 2 GHz', options[0].text());
        this.assert.equal('ssid1 @ 5 GHz', options[1].text());
        this.assert.equal('ssid2 @ 2 GHz', options[2].text());
        this.assert.equal('ssid2 @ 5 GHz', options[3].text());
    }

    @Test()
    async accessPointsAreSortedWhenNotGrouped() {
        //arrange
        const state = new AppViewModel();
        state.current = new Reading(0, new Point(0, 0), APFormTests.signals);
        const component = mount(APForm, { data: () => ({ state: state }) });

        //act
        component.get('#group-by-ssid').setChecked(false);
        await component.vm.$nextTick();

        //assert
        const options = component.findAll('option');
        this.assert.equal('ssid1 @ 2 GHz (mac1)', options[0].text());
        this.assert.equal('ssid1 @ 2 GHz (mac8)', options[1].text());
        this.assert.equal('ssid1 @ 5 GHz (mac6)', options[2].text());
        this.assert.equal('ssid1 @ 5 GHz (mac7)', options[3].text());
        this.assert.equal('ssid2 @ 2 GHz (mac2)', options[4].text());
        this.assert.equal('ssid2 @ 2 GHz (mac5)', options[5].text());
        this.assert.equal('ssid2 @ 5 GHz (mac3)', options[6].text());
        this.assert.equal('ssid2 @ 5 GHz (mac4)', options[7].text());
    }

    @Test()
    async selectingAccessPointSetsState() {
        //arrange
        const state = new AppViewModel();
        const component = mount(APForm, { data: () => ({ state: state }) });

        //act
        const option = component.get('option:first-child');
        option.setSelected();

        //assert
        this.assert.stringContains(state.selected?.ssid ?? '', option.text());
    }

    @Test()
    async groupBySSIDEnablesGroupByFrequency() {
        //arrange
        const state = new AppViewModel();
        const component = mount(APForm, { data: () => ({ state: state }) });

        //act
        component.get('#group-by-ssid').setChecked(true);
        await component.vm.$nextTick();

        //assert
        const checkbox = component.get('#group-by-frequency');
        this.assert.null(checkbox.attributes("disabled"));
    }

    @Test()
    async disablingGroupBySSIDDisablesAndUnchecksGroupByFrequency() {
        //arrange
        const state = new AppViewModel();
        const component = mount(APForm, { data: () => ({ state: state }) });

        //act
        component.get('#group-by-ssid').setChecked(false);
        await component.vm.$nextTick();

        //assert
        const checkbox = component.get('#group-by-frequency');
        this.assert.notNull(checkbox.attributes("disabled"));
        this.assert.null(checkbox.attributes("checked"));
    }
}