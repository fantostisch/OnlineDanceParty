import _OnBeforeRequestDetails = browser.webRequest._OnBeforeRequestDetails
import BlockingResponse = browser.webRequest.BlockingResponse
// we need to add .js when using imports: https://github.com/microsoft/TypeScript/issues/16577
import * as storage from "./storage.js"

// Redirecting websockets does not work,
// so we modify the response that tells the client the location of the websocket.
function requestHook(
    redirectUrl: string,
    requestDetails: _OnBeforeRequestDetails
): BlockingResponse {
    console.log("Modifying: " + requestDetails.url)

    return {
        redirectUrl: redirectUrl,
    }
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
    const redirectUrl =
        `https://${server}/v1/query/` +
        encodeURIComponent(JSON.stringify(odpClient))

    browser.webRequest.onBeforeRequest.addListener(
        (x) => requestHook(redirectUrl, x),
        {
            urls: patterns,
        },
        ["blocking"]
    )
}

main()
