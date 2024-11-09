export interface IObserver<T> {
    updateByNotification(data: T | null): any;
    busy(): boolean;
}