export class AddCoupon {
    id: number;
    couponTitle: string;
    couponCode: string;
    isActive: boolean;
    validFrom: any;
    validTo: any;
    allUsers: boolean;
    allProducts: boolean;
    couponType: string;
    minAmt: number;
    maxAmt: number;
    usesPerUser: number;
    usersId: string;
    products: string;
    chosenProductId:{id: number}[];
    deductionValue: number;
    productType: number;
}
    