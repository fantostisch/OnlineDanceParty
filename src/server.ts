const aboutName = "OnlineDanceParty"

export async function getAbout(serverURL: string): Promise<number[]> {
    const aboutURL = `${serverURL}/about`
    return fetch(aboutURL).then(async (r) => {
        if (!r.ok) {
            throw new Error("Error connecting")
        }
        const obj = JSON.parse(await r.text())
        if (
            obj.name !== aboutName ||
            !Array.isArray(obj.supported) ||
            !(obj.supported.length > 0)
        ) {
            throw new Error("Invalid response")
        }
        obj.supported.forEach((v: unknown) => {
            if (typeof v !== "number") {
                throw new Error("Invalid response")
            }
        })
        return obj.supported
    })
}
