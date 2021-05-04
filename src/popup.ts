import { Follower, Host, ODPClient } from "./model/ODPClient.js"
import * as storage from "./storage.js"
import * as constants from "./constants.js"
import * as server from "./server.js"
import { supportedProtocol } from "./constants.js"

async function reload(): Promise<void> {
    await browser.tabs.reload()
    await browser.runtime.reload() //todo: send message to background script instead of reload
}

const form = document.forms.namedItem("form")!
const serverField = form.elements.namedItem("server")! as HTMLInputElement
const hostCodeField = form.elements.namedItem("host-code")! as HTMLInputElement
const followCodeField = form.elements.namedItem(
    "follow-code"
)! as HTMLInputElement
const radio = form.elements.namedItem("setting") as RadioNodeList
const radioDisabled = "Disabled"
const radioHost = "Host"
const radioFollower = "Follower"
const applyButton = form.elements.namedItem("apply") as HTMLButtonElement

async function reportAndReload(message: string) {
    console.log(message)
    alert(message)
    await reload()
}

function registerHandlers() {
    const radioOnChange = () => {
        const radioValue = radio.value
        if (radioValue == radioDisabled) {
            hostCodeField.disabled = true
            followCodeField.disabled = true
        } else if (radioValue == radioHost) {
            hostCodeField.disabled = false
            followCodeField.disabled = true
        } else if (radioValue == radioFollower) {
            hostCodeField.disabled = true
            followCodeField.disabled = false
        }
    }
    radio.forEach((r) => {
        r.addEventListener("change", radioOnChange)
    })
    form.onsubmit = async function (this: GlobalEventHandlers, e: Event) {
        e.preventDefault()
        applyButton.value = "Loading..."
        applyButton.disabled = true

        const serverValue = serverField.value
        const serverURL = "https://" + (serverValue || constants.defaultServer)
        serverField.setCustomValidity("test")
        await server.getAbout(serverURL).then(
            async (sv) => {
                if (!sv.includes(constants.supportedProtocol)) {
                    if (sv.find((v) => v > constants.supportedProtocol)) {
                        await reportAndReload(
                            "To use this server a new version of this extension is required."
                        )
                        return
                    } else if (
                        sv.find((v) => v < constants.supportedProtocol)
                    ) {
                        await reportAndReload(
                            "Please ask the owner of this server to upgrade his server to the latest version."
                        )
                        return
                    }
                }
                if (serverValue == null) {
                    await storage.removeServer()
                } else {
                    await storage.setServer(serverValue)
                }

                const radioValue = radio.value
                if (radioValue === "" || radioValue === radioDisabled) {
                    await storage.removeODPClient()
                } else if (radioValue == radioHost) {
                    await storage.setODPClient(
                        new ODPClient(new Host(hostCodeField.value))
                    )
                } else if (radioValue == radioFollower) {
                    await storage.setODPClient(
                        new ODPClient(new Follower(followCodeField.value))
                    )
                }
            },
            async (err) => {
                await reportAndReload(
                    "Something went wrong while connecting to the server. Please try again. Error: " +
                        err
                )
            }
        )
    }
}

async function main(): Promise<void> {
    registerHandlers()

    const server = (await storage.getServer()) || ""
    serverField.value = server

    const odpClient = await storage.getODPClient()

    let radioValue: string
    if (odpClient == undefined) {
        hostCodeField.disabled = true
        followCodeField.disabled = true
        radioValue = "Disabled"
    } else if (odpClient.contents instanceof Host) {
        followCodeField.disabled = true
        hostCodeField.value = odpClient.contents.id
        radioValue = "Host"
    } else {
        hostCodeField.disabled = true
        followCodeField.value = odpClient.contents.hostToFollow
        radioValue = "Follower"
    }
    radio.value = radioValue
}

main()
