export class Product {
    _id?: string;
    title!: string;
    description!: string;
    price!: number;
    discount!: number;
    userImage!: boolean;
    image!: string;
    category!: string;
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