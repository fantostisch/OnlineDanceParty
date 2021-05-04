import _OnBeforeRequestDetails = browser.webRequest._OnBeforeRequestDetails
// we need to add .js when using imports: https://github.com/microsoft/TypeScript/issues/16577
import * as storage from "./storage.js"
import { ODPClient } from "./model/ODPClient.js"
import { WSURLData } from "./model/ws-url-data.js"
import { Query } from "./model/query"

// Redirecting websockets does not work,
// so we modify the response that tells the client the location of the websocket.
function listener(
    serverWSURL: string,
    odpClient: ODPClient,
    requestDetails: _OnBeforeRequestDetails
) {
    const filter = browser.webRequest.filterResponseData(
        requestDetails.requestId
    )
    const decoder = new TextDecoder("utf-8")
    const encoder = new TextEncoder()

    filter.ondata = (event) => {
        const response = decoder.decode(event.data, { stream: true })
        const query: Query = JSON.parse(response)
        query.wsUrl =
            serverWSURL + JSON.stringify(new WSURLData(query.wsUrl, odpClient))
        const modifiedResponse = JSON.stringify(query)
        filter.write(encoder.encode(modifiedResponse))
        filter.disconnect()
    }

    return {}
}

const defaultServer = "dance.nickaquina.nl"

async function main(): Promise<void> {
    const patterns = ["https://justdancenow.com/query"]

    const odpClient = await storage.getODPClient()
    console.log("odpClient from storage: ", odpClient)
    if (odpClient == null) {
        return
    }
    const server = (await storage.getServer()) || defaultServer
    const serverWSURL = `wss://${server}/`

    browser.webRequest.onBeforeRequest.addListener(
        (x) => listener(serverWSURL, odpClient, x),
        {
            urls: patterns,
        },
        ["blocking"]
    )
}

main()
