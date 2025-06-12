Hey everyone,

I’m @rblb, a developer. 

You might recognize me from my work in the bitcoin and nostr space, or maybe from my time as a core maintainer of jMonkeyEngine. But for most of you, this might be our first time crossing paths, so hello, nice to meet you.

Let me show you what I’ve been working on:

----- 

I'm excited to drop the first milestone (that I call v0.0) of something I've been building for a while:  [Nostr Game Engine](https://ngengine.org).


## What is Nostr Game Engine?

Nostr Game Engine is built on top of the modular and proven [jMonkeyEngine](https://jmonkeyengine.org).

*What makes it different?* I'm gradually swapping out the internals with **Nostr-based** modules to create a reference engine purpose-built for decentralized games.

This first release delivers these key capabilities:

## Peer-to-Peer Networking

Forget centralized game servers. **Nostr Game Engine** gives you **real P2P multiplayer**, using **WebRTC** for data streaming and **Nostr relays** for coordination.

*Want to dig deeper? This is a [draft NIP](https://ngengine.org/docs/nip-drafts/nip-RTC/) that is a revised version of this [other draft NIP](https://github.com/nostr-protocol/nips/blob/ead1cd6ca6b5b789d70e0d146d17266a2e8e2fba/100.md), that details how the signaling works.*

Now, **WebRTC** is already **peer-to-peer**, but its signaling phase typically relies on specialized central servers 

**/Not your signaling servers, not your p2p connection!/**

By coupling WebRTC with Nostr, we take signaling decentralized too by relying on a **network of dumb public relays** that are oblivious to what encrypted data we send to them and are easily replaceable.

(see the [documentation](https://ngengine.org/docs/network/) for more info)

## Nostr Authentication & Gamertags

![](https://m.stacker.news/96335)

**NGE** has a fully managed **Nostr Auth flow**, with support for [NIP-49](https://github.com/nostr-protocol/nips/blob/master/49.md) **encrypted local nsecs** and  [NIP-46](https://github.com/nostr-protocol/nips/blob/master/46.md) **remote signers**.

It also fully handles metadata, including external identities:  your profile picture, display name, and other details can **carry over between games, and even from other Nostr clients and communities** *(nostr’s Steam, maybe?).*

This release is also introducing **Gamertags**: persistent gaming handles tied to your Nostr pubkey. They work **like Xbox Gamertags or the old Discord handle**, but they’re decentralized and **follow you across any game that supports them** (check this [draft nip](https://ngengine.org/docs/nip-drafts/nip-GAMERTAG/) for more info).

![](https://m.stacker.news/96336)

## Match Making

![](https://m.stacker.news/96337)

While matchmaking is planned for a later milestone on the [roadmap](https://ngengine.org/roadmap.html), I’ve started implementing it early to help with testing RTC connections.

In this release, there are already the APIs to create **lobbies** that are **discoverable** and optionally **password-protected**. Players can **search and filter** for lobbies using both client-side and relay-side filtering, depending on what the relay supports, so it kinda **Just Works™**.

*Right now, you can’t see how many players are in a lobby, and the feature is still a bit rough around the edges, but it's a solid start, and more improvements are coming as we move further along the roadmap.*

The cool part? You don’t even need to know Nostr is running under the hood. The engine exposes simple APIs like createLobby, findLobbies, and connectToLobby, the developer can call them when needed, and the engine handles all the relay querying and data stitching behind the scenes.

(see the [documentation](https://ngengine.org/docs/network/lobby/) for more info).


## A new Nostr Client Library

To power all of this, I built a new [Nostr client library from](https://github.com/NostrGameEngine/nostr4j) scratch, designed for performance, asynchronicity, and memory efficiency. It’s lean, fast, and built to be the foundation for everything that comes next.

## Cross-Platform and language of choice

The entire codebase is written mostly in Java, and it builds natively for Linux, macOS, and Windows. Support for Android, iOS, and Web Browsers is on the roadmap.

## Why Now?

This project was made possible thanks to funding from [OpenSats](https://opensats.org/blog/eleventh-wave-of-nostr-grants), but I held off on announcing or hyping it right away. I wanted something real to show. That extra time gave me the space to not only write the code, but also put together an [Almost Complete™ documentation](https://ngengine.org/docs/), an [app template](https://github.com/NostrGameEngine/nge-app-template), and a [tech demo](https://github.com/NostrGameEngine/sea-of-nostriches-demo)  (more on that later).

So now, you can get a real feel for the engine, see what it does, play around with it, and maybe even start experimenting with your own ideas.


## Roadmap

This is just the beginning. There is a full roadmap [on the website](https://ngengine.org/roadmap.html).

Upcoming milestones include ads, deeper identity features, and tools that make decentralized game development as smooth as possible.


## Sea of Nostriches

![](https://m.stacker.news/96338)

This is the demo I built for this initial release. 

*You start alone in an open ocean with a boat, nothing much at first.*

But as soon as another player joins **(another peer)**, your boat begins sending data directly to theirs via **peer-to-peer communication**. You’ll see this visualized as a **stream of numbers moving between boats** in game..

If you have a profile picture set, it’ll automatically appear on your boat’s sail, and you’ll see others’ profile pictures on theirs.

That’s the core of it.

*It is not a real game, as there is nothing really to do, no lag compensation, no score etc… but it is a decent reference, and what I would consider an “integration test” at this point.*

![](https://m.stacker.news/96339)

*There’s a lot more going on behind the scenes, like how the ocean is simulated or how rendering is handled, but that’s beyond the scope of this post. You can check out the [full source code on GitHub](https://github.com/NostrGameEngine/sea-of-nostriches-demo), along with native builds for all supported platforms and a portable JAR.*

------------

That’s all for now! If you have any questions, feel free to drop them in the comments. I’ll do my best to reply. Check out the website at [ngengine.org](https://ngengine.org) and browse the docs at [ngengine.org/docs](https://ngengine.org/docs) if you want to dig deeper.



Hope you enjoy what I’ve built so far.

[Follow on Nostr](https://njump.me/npub146wutmuxfmnlx9fcty0lkns2rpwhnl57kpes26mmt4hygalsakrsdllryz)
