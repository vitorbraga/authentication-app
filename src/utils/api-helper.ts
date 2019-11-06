export const baseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:4000';

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
