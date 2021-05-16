import { createApp, h as render } from "vue";
import app from "./app.vue";
import Factory from "./Factory";
import Signal from "./Signal";

export default createApp({
    render: () => render(app),
    provide: {
        signal_service: (signals: Signal[]) => Factory.signalService(signals),
        renderer: (canvas: HTMLCanvasElement) => Factory.renderer(canvas)
    }
}).mount('app');