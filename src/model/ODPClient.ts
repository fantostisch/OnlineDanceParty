// Tagged union of Host or Follower
export class ODPClient {
    public tag: string
    public static HostTag = "Host"
    public static FollowerTag = "Follower"

    constructor(public contents: Host | Follower) {
        if (contents instanceof Host) {
            this.tag = ODPClient.HostTag
        } else {
            this.tag = ODPClient.FollowerTag
        }
    }
}

export type HostID = string

export class Host {
    constructor(public id: HostID) {}
}

export class Follower {
    constructor(public hostToFollow: HostID) {}
}
