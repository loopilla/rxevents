import { Producer } from "./events/listener";
import { SelectItem } from "./events/select";
import { Observable } from "rxjs";

export class App {
    private _producer: Producer<SelectItem<string, string>>;
    private _observable: Observable<SelectItem<string, string>[]>;

    constructor() {
        this._producer = new Producer();
        this.init();
        this.run();
    }

    private init = () => {
        this._observable = new Observable( observer => {
            this._producer.on( (na: SelectItem<string, string>[]) => {
                observer.next(na);
            });
        });
        this._observable.subscribe( na => console.log(`1: Subscription: ${JSON.stringify(na, null, 2)}`));
        this._observable.subscribe( na => console.log(`2: Subscription: ${JSON.stringify(na, null, 2)}`));
    }

    emitValues = (values: SelectItem<string, string>[]) => {
        this._producer.emit(values);
    }

    private run = () => {
        setInterval(() => {
            this.emitValues(
                [
                    {
                        key: `Key-${Math.round(Math.random() * 10)}`,
                        value: `Value${Math.round(Math.random() * 10)}`
                    }
                ]
            )
        }, 1000);
    }
}

export default new App();