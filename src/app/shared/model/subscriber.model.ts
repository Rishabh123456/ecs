export class Subscriber {
    serviceId: string;
    did: string;
    otg: string;
    groupStatus: boolean;
   

    constructor(serviceId: string, groupStatus: boolean) {
        this.serviceId = serviceId;
        this.groupStatus = groupStatus;
    }

    
}
    