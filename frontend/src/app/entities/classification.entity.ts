export class Classification {
    id?: string;
    name?: string;
    timestamp?: Date;

    public constructor(init?: Partial<Classification>) {
        Object.assign(this, init)
    }
}
