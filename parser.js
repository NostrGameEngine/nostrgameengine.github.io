
import fs from "fs-extra";
import path from "path";
import { DOMParser, XMLSerializer } from 'xmldom';
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcDir = path.join(__dirname, "src");
const componentsDir = path.join(srcDir, "components");
let componentDefs = null;


async function reloadComponents(){
    componentDefs={};
    for (const component of await fs.readdir(componentsDir)) {
        if (!component.endsWith(".html")) continue;
        const componentPath = path.join(componentsDir, component);
        const filename = path.basename(component, ".html");
        componentDefs[filename] = fs.readFileSync(componentPath, "utf-8");
    }
}
 
const replaceTagWithValue = (node, tag, value) => {
    console.log(tag, value);
    const elements = Array.from(node.getElementsByTagName(tag));
    for (const element of elements) {
        const parent = element.parentNode;
        const fragment = new DOMParser().parseFromString(value, 'text/html').documentElement;
        while (fragment.firstChild) {
            parent.insertBefore(fragment.firstChild, element);
        }
        parent.removeChild(element);
    }
};

function processConditionals(html, attributes) {
    // Process $$ifdef:attr$$ ... $$endif$$ blocks
    const ifdefRegex = /\$\$ifdef:([a-zA-Z0-9_]+)\$\$([\s\S]*?)\$\$endif\$\$/g;

    return html.replace(ifdefRegex, (match, attrName, content) => {
        if (attrName === "value" || attrName === "xmlns") return content;

        const attribute = attributes.find(attr => attr.name === attrName);

        // If the attribute exists, keep the content (without the ifdef/endif tags)
        if (attribute && attribute.value) {
            // Replace $$attrName$$ with the attribute value
            content = content.replace(new RegExp(`\\$\\$${attrName}\\$\\$`, 'g'), attribute.value);
            content = content.replace(new RegExp(`___${attrName}___`, 'g'), attribute.value);
            return content;
        }

        // If the attribute doesn't exist or is empty, remove the entire block
        return '';
    });
}


export async function parse(originalHtml, reload = false) {

    if(!componentDefs||reload){
        await reloadComponents();
    }

    // Parse the original HTML with xmldom
    const dom = new DOMParser().parseFromString(originalHtml, 'text/html');



    // Find all components and replace with their HTML content
    let replaced = false;
    do {
        replaced = false;
        for (const [selector, chtml] of Object.entries(componentDefs)) {
            const elements = Array.from(dom.getElementsByTagName(selector));
            if (elements.length === 0) continue;
            for (const element of elements) {
                let componentHtml = chtml;
                const attributes = Array.from(element.attributes);

                componentHtml = processConditionals(componentHtml, attributes);

                let innerHtml = new XMLSerializer().serializeToString(element);
                let innerText = innerHtml;
                if (element.childNodes.length > 0 && element.childNodes[0].nodeType == 3) {
                    innerText = element.childNodes[0].textContent;
                }

                // Replace $$attribute$$ with attribute value

                const regex = /\$\$([a-zA-Z0-9_]+)\$\$/g;
                let match;
                while ((match = regex.exec(componentHtml)) !== null) {
                    const attributeName = match[1];
                    const attributeValue = attributes.find(attr => attr.name === attributeName)?.value || '';
                    componentHtml = componentHtml.replace(match[0], attributeValue);
                }





                // Replace $$value$$ with innerHtml
                componentHtml = componentHtml.replace(/___value___/g, innerText);
                componentHtml = componentHtml.replace(/\$\$value\$\$/g, innerText);


                const componentDom = new DOMParser().parseFromString(componentHtml, 'text/html');

         
                // Replace <slot> with inner elements nodes

                replaceTagWithValue(componentDom, 'slot', innerHtml);

                // Replace <slot:attribute></slot:attribute> with attribute value
                for (const attribute of attributes) {
                    replaceTagWithValue(componentDom, `slot-${attribute.name}`, attribute.value);
                }

                componentHtml = new XMLSerializer().serializeToString(componentDom);



                const componentFragment = new DOMParser().parseFromString(componentHtml, 'text/html').documentElement;
                element.parentNode.replaceChild(componentFragment, element);

                replaced = true;
            }
        }
    } while (replaced);

    // Serialize the modified DOM
    const serializedHtml = new XMLSerializer().serializeToString(dom);
    return "<!DOCTYPE html>\n" + serializedHtml;

}