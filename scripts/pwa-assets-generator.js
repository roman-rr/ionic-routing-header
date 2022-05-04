const fs = require('fs');
const sharp = require('sharp');
const writeFile = require('@ionic/utils-fs').writeFile;

const PWA_SPLASH_FORMAT = 'jpg';
const PWA_SPLASH_QUALITY = 90;
const PWA_SPLASH_RESOURCES = [
    { width: 640, height: 1136 },
    { width: 750, height: 1334 },
    { width: 828, height: 1792 },
    { width: 1125, height: 2436 },
    { width: 1170, height: 2532 },
    { width: 1242, height: 2208 },
    { width: 1242, height: 2688 },
    { width: 1284, height: 2778 }
];

const PWA_ICON_FORMAT = 'png';
const PWA_ICON_QUALITY = 90;
const PWA_ICON_RESOURCES = [
    { width: 96, height: 96 },
    { width: 180, height: 180 },
    { width: 192, height: 192 },
    { width: 512, height: 512 }
];

async function generateFromResource(source, type) {
    const format = type === 'icon' ? PWA_ICON_FORMAT : PWA_SPLASH_FORMAT;
    const quality = type === 'icon' ? PWA_ICON_QUALITY : PWA_SPLASH_QUALITY;
    const dir = `./src/assets/pwa/${type}`;
    const sharpThread = await sharp(`./resources/${type}.png`);
    const image = {
        src: `./src/assets/pwa/${type}/${type}-${source.width}-${source.height}.${format}`,
        format,
        width: source.width,
        height: source.height,
        fit: 'cover'
    };

    // Create dirs
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    const pipeline = await sharpThread
    .resize(image.width, image.height, { fit: image.fit})
    [format === 'png' ? 'png' : 'jpeg']({
        quality: quality
    });

    await writeFile(image.src, await pipeline.toBuffer());
}

async function genaratePWAAssets () {
    console.log('Generating PWA assets ...');
    
    for (const source of PWA_SPLASH_RESOURCES) {
        await generateFromResource(source, 'splash');
    }
    for (const source of PWA_ICON_RESOURCES) {
        await generateFromResource(source, 'icon');
    }

    console.log('PWA assets generated!');
}

genaratePWAAssets();