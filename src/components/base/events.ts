import { IAppEvents } from '../../types';

export type EventName = keyof IAppEvents;
export type EventCallback<T> = (payload: T) => void;

export interface IEvents {
    on<K extends EventName>(event: K, callback: EventCallback<IAppEvents[K]>): void;
    emit<K extends EventName>(
      event: K,
      ...args: IAppEvents[K] extends void ? [] : [payload: IAppEvents[K]]
    ): void;
    off<K extends EventName>(event: K, callback: EventCallback<IAppEvents[K]>): void;
}

export class EventEmitter implements IEvents {
    private listeners = {} as Partial<Record<EventName, Set<Function>>>;

    public on<K extends EventName>(event: K, callback: EventCallback<IAppEvents[K]>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = new Set();
        }
        this.listeners[event]!.add(callback);
    }

    public emit<K extends EventName>(
      event: K,
      ...args: IAppEvents[K] extends void ? [] : [payload: IAppEvents[K]]
    ): void {
        this.listeners[event]?.forEach((cb) => {
            (cb as any)(...args);
        });
    }

    public off<K extends EventName>(event: K, callback: EventCallback<IAppEvents[K]>): void {
        this.listeners[event]?.delete(callback);
    }
}
