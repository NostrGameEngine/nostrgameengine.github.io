Hello Stacker News,

I’m excited to share the release of [Nostr Game Engine v0.1](https://github.com/NostrGameEngine/ngengine/releases), the next milestone following [v0.0](https://stacker.news/items/1005012).

For those new to the project: **Nostr Game Engine (NGE)** is a "nostrified" version of jMonkeyEngine. 

Core components are being modernized and progressively replaced with a peer-to-peer, nostr-based implementations.


## Spotlight: In-game Ads

This release brings many bug fixes and improvements, but the headline feature is **in-game advertising**.

In-game ads have been discussed for decades, yet today’s industry standard still leans on disruptive and annoying formats. With NGE, we’re experimenting with approaches that are immersive, peer-to-peer, and player-friendly.

![demo-gif1](./nge-demo-gif0.gif)

This system is powered by the **nostrads protocol**, designed to bring ads to nostr in a **privacy-friendly** and **permissionless** way.

From a game developer’s perspective, integration is simple:

* Set up a lightning address for your game
* Mark some surfaces in your 3D models as ad-spaces
* Add a few lines of code to initialize the ads system

And just like that, your game becomes monetizable. 

For a deeper dive into nostrads, see the [dedicated post](https://stacker.news/items/1057985).

As with previous releases, this version comes with a purpose-built [demo app](https://github.com/NostrGameEngine/adcity-demo) to show the ad system in action, using fake retro-futuristic ads, but you get the idea.


![demo-gif1](./nge-demo-gif1.gif)

##  Experimental Android Support

The engine now builds and runs on Android. All dependencies have been ported to API level 33.


##  Component System Improvements

* Simplified global object access in components
* Deprecated all `receiveX` methods in favor of a single `getGlobalInstance()` method

[More in the docs](https://ngengine.org/docs/components/#accessing-engine-objects)



## Other Improvements

As part of the NGE development, several improvements were made to the **jMonkeyEngine** codebase. These are included in this release and are either in review or merged upstream:

* Improved render parity with Blender
* Faster, more memory-efficient glTF loading
* Global illumination support for local lights
* Improved tonemapping


##  Updates to Nostr4j

[Nostr4j](https://github.com/NostrGameEngine/nostr4j), the high-performance nostr client library powering NGE, also gets a major update:

* Improved resilience to network issues
* Blossom protocol support
* More flexible fetching strategies
* Wallet abstraction + NWC support (NIP-47)
* Managed event deletion (NIP-09)
* Proof of Work support (NIP-13)
* LNURL resolution


## What’s Next

- Browser port (WebGL + TeaVM)
- Stabilize Android support
- Lay groundwork for future features

There are great things ahead, but first we need to make sure the foundation is solid!


## Funding and Support

A big thank you to **OpenSats** for supporting this work through the [eleventh wave of Nostr grants](https://opensats.org/blog/eleventh-wave-of-nostr-grants).

I'd also like to recognize our first four donors, who quietly contributed to our [Geyser fund](https://geyser.fund/project/nge) even before it was officially announced. 
Your support means a lot!

On that note, If you’d like to support the project, contributions via the  [crowdfunding page](https://ngengine.org/support.html) page will directly help sustain long-term development.


---

That’s all for now. Hope you like what’s been built so far!


[Follow on Nostr](https://njump.me/npub146wutmuxfmnlx9fcty0lkns2rpwhnl57kpes26mmt4hygalsakrsdllryz)