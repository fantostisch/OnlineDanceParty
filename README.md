# Online Dance Party Browser Extension

Play Just Dance Now with friends at different locations. This is a browser extensions that makes it
possible to see the dance screen at multiple locations. This is built as an alternative to screen
sharing, because screen sharing suffers from lag and a low frame rate.

[![Get the add-on for Firefox](img/promotion/AMO-button.png)](https://addons.mozilla.org/en-US/firefox/addon/online-dance-party/)
[![Get the add-on for Chrome](img/promotion/Chrome-button.png)](https://chrome.google.com/webstore/detail/online-dance-party/pjjphlghccmaedekgpalljfcckpjpekl)

## Usage

1. Install and open Firefox or Chrome.
2. Install this browser extension.
   [Get the add-on for Firefox](https://addons.mozilla.org/en-US/firefox/addon/online-dance-party/)
   or
   [get the add-on for Chrome](https://chrome.google.com/webstore/detail/online-dance-party/pjjphlghccmaedekgpalljfcckpjpekl).
3. Open [justdancenow.com](https://justdancenow.com).
4. Click on the disco ball.
5. One player selects host and shares the follow code.
6. Other players select follower and fill in the follow code.
7. Join the room using the Just Dance Now app.
8. Have fun!

The room can be controlled from the host browser and from the Just Dance Now app. When controlling
the room using the browser of the host, at least one user should be in the room using the Just Dance
Now app, otherwise followers will not see the song the hosts selects.

## Privacy

This extension requires an external server. By default, this server is dance.nickaquina.nl. When
using dance.nickaquina.nl, your IP, user-agent and if you join as host or follower will be logged to
detect and block users that abuse the service. The information listed below is send to
dance.nickaquina.nl, but not logged.

Information that is normally only shared with the makers of Just Dance now and the person that hosts
the game, is now also send to the server that you use. This information includes, but is not limited
to, your IP address, your timezone, what browser you use, what songs you click on and what songs you
dance to. When you join using the app, information is shared which includes, but is not limited to,
your country, your avatar, if you are VIP, all dances you danced to, your highscores and how many
coins you have in your wallet.

The server that you use might log all this information.

If you are concerned about sharing this information, it is recommended to host your own server.
Information about hosting your own server can be found in
[the ODPServer repository](https://github.com/fantostisch/ODPServer).

## Development

### Building

```sh
npm install
npm run build
```

For changes in typescript to become active the typescript code has to be compiled to javascript:

```
npm run watch
```

### Start browser with extension

Firefox:

```sh
npm start
```

Chrome:

```sh
npm run startC
```

### Run type checker and linter

Please run

```sh
npm run check
```

and check for errors before committing.

## Server

This extension requires a server. Information about this server can be found in
[the ODPServer repository](https://github.com/fantostisch/ODPServer).

## Documentation

Other documentation in:

* [doc/](doc/)

## Todo

* Better UI

## License

**License**:  AGPL-3.0-or-later

```
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
