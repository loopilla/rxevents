export type Listener<T> = (even: T[]) => any;

export interface Disposable {
    dispose(): void;
}

export class Producer<T> {
    private _listeners: Listener<T>[];

    constructor() {
        this._listeners = [];
    }

    on = (listener: Listener<T>): Disposable => {
        this._listeners.push(listener);
        return {
            dispose: () => this.off(listener)
        };
    }

    off = (listener: Listener<T>): void => {
        const index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    }

    emit = (event: T[]) => {
        this._listeners.forEach(listener => listener(event));
    }

    pipe = (event: Producer<T>): Disposable => {
        return this.on(e => event.emit(e));
    }

    listenerCount = () => this._listeners.length;
}
