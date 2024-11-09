import { IObserver } from "./IObserver";

export interface IObservable<T> {
    notify(object: any): void;
    subscribe(observer: IObserver<T>): boolean;
}