export class Dessert {
    id: string;
    dessert: string;
    calories: string;
    fat: string;
    carbs: string;
    protein: string;
    sodium: string;
    calcium: string;
    iron: string;

    public constructor(init?: Partial<Dessert>) {
        Object.assign(this, init)
    }
}
