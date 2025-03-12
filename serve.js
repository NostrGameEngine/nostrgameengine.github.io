import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { parse } from "./parser.js";

// Resolve __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcDir = path.join(__dirname, "src");
const staticDir = path.join(__dirname, "static");
const SUPPORTED_STATIC_FILES= [".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".webp", ".webm", ".json", ".xml", ".txt", ".pdf", ".mp3", ".mp4", ".woff", ".woff2", ".ttf", ".otf", ".eot"];

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "0.0.0.0";
const DEV_MOODE = (process.env.DEV_MOODE || "1") === "1";


async function compileHtmlFile(filePath) {
    try {
        const originalHtml = fs.readFileSync(filePath, "utf-8");
        const transformedHtml = await parse(originalHtml, DEV_MOODE);
        return transformedHtml;
    } catch (err) {
        console.error(`Error compiling ${filePath}:`, err);
        throw err;
    }
}


const app = express();
app.get("*", async (req, res) => {
    let p = req.path;
    p = path.normalize(p);

    if (p === "/") {
        p = "/index.html"
    } 

    if(p.endsWith(".html")) {
        const filePath = path.join(srcDir, p);
        if (!await fs.pathExists(filePath)) {
            res.status(404).send("Page not found.");
            return;
        }
        res.setHeader("Content-Type", "text/html");        
        try {
            const compiledHtml = await compileHtmlFile(filePath);
            res.send(compiledHtml);
        } catch (err) {
            res.status(500).send("Error compiling the page.");
        }
        
    } else { 
        if (!SUPPORTED_STATIC_FILES.some(ext => p.endsWith(ext))) {
            res.status(403).send("Forbidden.");
            return;
        }
        const staticPath = path.join(staticDir, p);
        if (!await fs.pathExists(staticPath)) {
            res.status(404).send("File not found.");
            return;
        }
        res.status(200).sendFile(staticPath);
    }
});


app.use("/static", express.static(staticDir));



app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});