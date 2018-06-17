import { PSAP } from './psap.model';
import { AddressCode } from './addresscode.model';
export class AddressCodePSAPMapping {
    id: number;
    addressCode: string;
    activePSAP: PSAP;
    activePSAPEnabled: boolean;
    alternatePSAP: PSAP;
    alternatePSAPEnabled: boolean;
}
    