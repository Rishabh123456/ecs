import { Subscriber } from './subscriber.model';
export class ServiceId {
    id: number;
    serviceId: string;
    buildingName: string;
    houseNumber: string;
    nameKana: string;
    nameKanji: string;
    addressLine1: string;
    addressLine2: string;
    addressCode: string;
    address: string;
    groupStatus: boolean;
    otg: string;
    did: string;
    subscribers: Subscriber[];
}
    