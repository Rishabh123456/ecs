import { Subscriber } from './subscriber.model';
export class ServiceId {
    id: number;
    nameKana: string;
    nameKanji: string;
    addressLine1: string;
    addressLine2: string;
    addressCode: string;
    groupStatus: boolean;
    otg: string;
    subscribers: Subscriber[];
}
    