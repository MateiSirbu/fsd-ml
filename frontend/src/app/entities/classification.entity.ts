export class Classification {
    id?: string;
    file?: string;
    timestamp?: string;
    result?: number;

    public constructor(init?: Partial<Classification>) {
        Object.assign(this, init)
    }
}
