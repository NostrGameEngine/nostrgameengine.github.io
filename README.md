# Nostr Game Engine - website


The source of the nostr game engine website.

It runs on a custom static site generator built around concepts similar to 11ty webc.

## Create a component
Components are created in src/component and include with <x-componentname></x-componentname> in the pages created under src/ or in other components.


### Use arguments in componenets
`$$tagname$$` is replace with the argument's value  in components


### Pass children to components
<slot></slot> is replaced with the children passed to the component



## Start a server
```
npm i 
npm run serve
```

## Build the site
```
npm i
npm run build
```