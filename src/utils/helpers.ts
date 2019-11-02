export interface Builder {
    withJwt: (token: string) => Builder;
    with: (name: string, value: string) => Builder;
    build: () => Headers;
}

export function headersBuilder() {
    const headers = new Headers();
    const builder: Builder = {
        withJwt: (token: string) => (headers.append('auth', token), builder),
        with: (name: string, value: string) => (headers.append(name, value), builder),
        build: () => headers
    };

    return builder;
}

// TODO separate this correctly
export function notUndefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}
