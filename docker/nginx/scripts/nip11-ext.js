
const nip11 = {
    "contact": "info@ngengine.org",
    "description": "ngengine.org - dev relay",
    "limitation": {
        "max_limit": 500,
        "max_message_length": 131072,
        "max_subscriptions": 20
    },
    "name": "relay.ngengine.org",
    "negentropy": 1,
    "pubkey": "npub1klt4m7gsqtx0e5erq9snquk8g2sw79mwm6kjau02nufnny99pcysd4kr0p",
    "software": "git+https://github.com/hoytech/strfry.git",
    "supported_nips": [
        1,
        2,
        4,
        9,
        11,
        22,
        28,
        40,
        70,
        77
    ],
    "version": "1.0.3-1-g60d35a6",
    "turn": ["wss://relay.ngengine.org"],
    "stun": ["stun.cloudflare.com:3478"]
}


function extendNip11(r) {
    r.return(200, JSON.stringify(nip11));
}

export default { extendNip11 };