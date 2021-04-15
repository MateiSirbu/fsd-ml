export class Dessert {
    id?: string;
    dessert?: string;
    calories?: number;
    fat?: number;
    carbs?: number;
    protein?: number;
    sodium?: number;
    calcium?: string;
    iron?: string;

    public constructor(init?: Partial<Dessert>) {
        Object.assign(this, init)
    }
}
