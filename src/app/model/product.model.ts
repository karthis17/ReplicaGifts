export class Product {
    _id?: string;
    title!: string;
    description!: string;
    price!: number;
    discount!: number;
    thumbnail!: string;
    userImage!: boolean;
    images!: Array<string>;

    additionalInfo!: [{
        title: '',
        description: ''
    }];
    quantity!: number;

    availablePrintSize!: [{
        _id?: any,
        width: 0,
        height: 1
    }];

    totalrating?: number;

    availablePrintType!: any[];
    amount?: number;
    reviews?: [{ rating: number, user: any, comment: string }]
}