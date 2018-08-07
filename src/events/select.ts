import { Observable, fromEvent } from 'rxjs';
import { Listener, Producer } from './listener';

export interface SelectItem<K extends string, V> {
    key: K;
    value: V;
}

export class Selector<K extends string, V> {
    name?: string;
    private _items: SelectItem<K, V>[];
    private _selected: K[];
    private _producer: Producer<SelectItem<K, V>>;
    private _valueObserver: Observable<SelectItem<K, V>[]>;

    constructor(readonly multi: boolean = false, items: SelectItem<K, V>[] = [], name?: string) {
        if (name) {
            this.name = name;
        }

        this._items = items;
        this._producer = new Producer();

        this._valueObserver = new Observable( observer => {
            this._producer.on((e) => {
                observer.next(e);
            });
        });
        this.publishValues();
    }

    createFrom = (optArr: SelectItem<K, V>[]) => {
        this._items = optArr;
    }

    publishValues = () => {
        this._producer.emit(this._items);
    }

    getItems = () => this._items;

    addItem = (item: SelectItem<K, V>) => {
        this._items.push(item);
        this.publishValues();
    }

    getObservable = () => this._valueObserver;
}
