import { PSAP } from './psap.model';
import { AddressCode } from './addresscode.model';
export class AddressCodePSAPMapping {
    addressCode: AddressCode;
    activePSAPs: PSAP[];
    inactivePSAPs: PSAP[];
    alternatePSAPs: PSAP[];
    inactiveAlternatePSAPs: PSAP[];
}
    