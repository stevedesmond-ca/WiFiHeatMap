import { Test, TestSuite } from "xunit.ts";
import App from '../App/app.vue';
import { mount } from '@vue/test-utils';
import Mockito from 'ts-mockito';
import Renderer from "../App/Renderer";
import MockFactory from "./MockFactory";

export default class AppTests extends TestSuite {
    @Test()
    async canCreateApp() {
        //arrange
        const signal_service = MockFactory.signalService();

        const canvas = MockFactory.canvas();
        const renderer = new Renderer(Mockito.instance(canvas));

        //act
        const component = mount(App, { global: { provide: { signal_service: () => Mockito.instance(signal_service), renderer: () => renderer } } })

        //assert
        this.assert.notEmpty(component.html());
    }
}