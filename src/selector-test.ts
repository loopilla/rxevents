import { SelectItem, Selector } from "./events/select";

export class App {
    private _selector: Selector<string, string>;

    constructor() {
        this._selector = new Selector(false, [
            {
                key: "Key1",
                value: "Value1"
            },
            {
                key: "Key2",
                value: "Value2"
            },
            {
                key: "Key3",
                value: "Value3"
            }
        ]);
        this.init();
        this.run();
    }

    private init = () => {
        this._selector.getObservable().subscribe( na => console.log(`1: Subscription: ${na.length}`));
    }

    emitValues = (values: SelectItem<string, string>[]) => {
        this._selector.publishValues();
    }

    private run = () => {
        setInterval(() => {
            this._selector.addItem(
                {
                    key: `Key-${Math.round(Math.random() * 10)}`,
                    value: `${Math.round(Math.random())}`
                }
            );
        }, 500);
    }
}

export default new App();