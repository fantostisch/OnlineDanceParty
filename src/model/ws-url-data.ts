import { ODPClient } from "./ODPClient"

export class WSURLData {
    public originalWSURL: string
    public odpClient: ODPClient

    constructor(originalWSURL: string, odpClient: ODPClient) {
        this.originalWSURL = originalWSURL
        this.odpClient = odpClient
    }
}
