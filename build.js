import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "./parser.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const deployDir = path.join(__dirname, "deploy");
const srcDir = path.join(__dirname, "src");

 

async function compileHtmlFile(filePath) {
    try {
        const originalHtml = fs.readFileSync(filePath, "utf-8");
        const transformedHtml = await parse(originalHtml);
        const relativePath = path.relative(srcDir, filePath);
        const outputPath = path.join(deployDir, relativePath);
        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, transformedHtml, "utf-8");
        console.log(`Compiled ${filePath} -> ${outputPath}`);
    } catch (err) {
        console.error(`Error compiling ${filePath}:`, err);
    }
}

async function compileAllHtml() {
    const pattern = `${srcDir}/**/*.html`;
    const files = await import('glob').then(glob => glob.sync(pattern, {
        ignore: ["**/components/**"]
    }));
    for (const file of files) {
        await compileHtmlFile(file);
    }
}

async function copyStatic() {
    const staticDir = path.join(__dirname, "static");
    if (await fs.pathExists(staticDir)) {
        
        await fs.copy(staticDir, deployDir, {
            recursive: true
        });
        console.log(`Copied static folder to ${deployDir}`);
    } else {
        console.log("No static folder found.");
    }
}

function cleanDeploy() {
    return fs.emptyDir(deployDir);
}

await (async () => {
    await cleanDeploy();
    await compileAllHtml();
    await copyStatic();
})().catch(err => {
    console.error(err);
});