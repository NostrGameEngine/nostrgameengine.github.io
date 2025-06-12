I'm excited to announce that [***Nostr Game Engine***](https://ngengine.org) just reached its first development milestone: *v0.0.*

## What is Nostr Game Engine?

**Nostr Game Engine** is built on top of the modular and proven [***jMonkeyEngine***](https://jmonkeyengine.org/).

What sets it apart? Its internals are being gradually replaced with **Nostr-powered** modules, turning it into a reference engine purpose-built for **decentralized games**.

This first release delivers these key capabilities:

## Peer-to-Peer Networking

Forget centralized game servers. **Nostr Game Engine** gives you **real P2P multiplayer**, using **WebRTC** for data streaming and **Nostr relays** for coordination.

*Want to dig deeper? This is a *[***draft NIP***](https://ngengine.org/docs/nip-drafts/nip-RTC/)* that is a revised version of this*[ other draft NIP](https://github.com/nostr-protocol/nips/blob/ead1cd6ca6b5b789d70e0d146d17266a2e8e2fba/100.md)*, that details how the signaling works.*

**WebRTC** is already a solid and reliable **peer-to-peer protocol**, equipped with a full set of NAT traversal capabilities, but its signaling phase typically relies on specialized central servers.

By coupling **WebRTC with Nostr,** we take signaling decentralized too by relying on **a network of dumb public relays** that are oblivious to what encrypted data we send to them and are easily replaceable.

(see [*the documentation*](https://ngengine.org/docs/network/) for more info)

## Nostr Authentication & Gamertags

![](https://ngengine.org/articles/v0.0-release/identity.png)

**NGE** has a fully managed **Nostr Auth flow**, with support for [*NIP-49*](https://github.com/nostr-protocol/nips/blob/master/49.md) **encrypted local nsecs** and  [*NIP-46*](https://github.com/nostr-protocol/nips/blob/master/46.md) remote signers.

It also fully handles metadata, including external identities:  your profile picture, display name, and other details can **carry over between games, and even from other Nostr clients and communities**.

This release is also introducing **Gamertags**: persistent gaming handles tied to your Nostr pubkey. They are **like Xbox Gamertags or the old Discord handle**, but they’re decentralized and *follow you across any game that supports them* (check[ this draft nip](https://ngengine.org/docs/nip-drafts/nip-GAMERTAG/) for more info).

## ![](https://ngengine.org/articles/v0.0-release/auth.png)

## Match Making

![](https://ngengine.org/articles/v0.0-release/lobby.png)

While matchmaking is planned for a later milestone on the [*roadmap*](https://ngengine.org/roadmap.html), this release ships with an early implementation to help test RTC connections.

This initial implementation has the APIs to create **lobbies** that are **discoverable** and optionally **password-protected**. Players can *search and filter* for lobbies using both client-side and relay-side filtering, depending on what the relay supports.

*Right now, you can’t see how many players are in a lobby, and the feature is still a bit rough around the edges, but it's a solid start, and more improvements are coming as we move further along the roadmap.*

The cool part? You don’t even need to know Nostr is running under the hood. The engine exposes simple APIs like *createLobby*, *findLobbies*, and *connectToLobby*, the developer can call them when needed, and the engine handles all the relay querying and data stitching behind the scenes.

(see [*the documentation*](https://ngengine.org/docs/network/lobby/) for more info)

## A new Nostr Client Library

The engine uses a [*new Nostr client library*](https://github.com/NostrGameEngine/nostr4j) built from scratch, designed for performance, asynchronicity, and memory efficiency. It’s lean, fast, and built to be the foundation for everything that comes next.

## Cross-Platform and language of choice

The entire codebase is written mostly in Java, and it builds natively for **Linux, macOS, and Windows**.

Support for **Android, iOS, and Web Browsers** is on the roadmap.

## What has been built so far?

* **Version 0.0**, with the core features mentioned above

* [**Documentation**](https://ngengine.org/docs/) covering the key components of the engine

* An [**app template**](https://github.com/NostrGameEngine/nge-app-template) to help bootstrap projects and experiment with the engine

* An high performance and portable [nostr client library](https://github.com/NostrGameEngine/nostr4j)

* A [**tech demo**](https://github.com/NostrGameEngine/sea-of-nostriches-demo) (more on that later)

So now, you can get a real feel for the engine, see what it does, play around with it, and maybe even start experimenting with your own ideas.

## Roadmap

This is just the beginning. There is a full roadmap [*on the website*](https://ngengine.org/roadmap.html)*.*

Upcoming milestones include ads, deeper identity features, and tools that make decentralized game development as smooth as possible.

## Sea of Nostriches

## ![](https://ngengine.org/articles/v0.0-release/demo1.png)

This is a demo built for this release. 

You start alone in an open ocean with a boat, nothing much at first. 

But as soon as another player joins (**another peer**), your boat begins sending data directly to theirs via **peer-to-peer communication**. You’ll see this visualized as **a stream of numbers moving between boats** in game.

If you have a profile picture set, it’ll automatically appear on your boat’s sail, and you’ll see others’ profile pictures on theirs.

That’s the core of it. 

*It is not a real game, as there is nothing really to do, no lag compensation, no score etc… but it is a decent reference, and an “integration test” for this release.*

![](https://ngengine.org/articles/v0.0-release/demo2.png)

*There’s a lot more going on behind the scenes, like how the ocean is simulated or how rendering is handled, but that’s beyond the scope of this post. You can check out*[ the full source code on GitHub](https://github.com/NostrGameEngine/sea-of-nostriches-demo)*, along with native builds for all supported platforms and a portable JAR.*

***

###### That’s all for now! Thanks go to nostr:nprofile1qythwumn8ghj7ct5d3shxtnwdaehgu3wd3skuep0qyt8wumn8ghj7etyv4hzumn0wd68ytnvv9hxgtcqypu8xwr40lp96ewdj2fef408wy70gd3carf9n6xu7hrnhq6whpgly925h0z for making this possible. [Their support](https://opensats.org/blog/eleventh-wave-of-nostr-grants) allows me to dedicate full-time effort to this project and contribute to the growth of the Nostr ecosystem.

***

Check out the website at [*ngengine.org*](http://ngengine.org) and browse the docs at [*ngengine.org/docs*](https://ngengine.org/docs) if you want to dig deeper.\
\
Feel free to come up with any questions. I’ll do my best to answer.
