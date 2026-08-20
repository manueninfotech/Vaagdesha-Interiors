const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const folders = [
  "./src/assets/projects",
  "./src/assets/collections",
  "./src/assets/services",
  "./src/assets/reviews",
];

async function convertFolder(folder) {
  if (!fs.existsSync(folder)) {
    console.log(`Folder not found: ${folder}`);
    return;
  }

  const files = fs.readdirSync(folder);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      continue;
    }

    const inputPath = path.join(folder, file);
    const outputPath = path.join(
      folder,
      `${path.basename(file, ext)}.webp`
    );

    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);

      console.log(`✓ ${file} → ${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`✗ Failed: ${file}`, error.message);
    }
  }
}

async function main() {
  for (const folder of folders) {
    console.log(`\nConverting: ${folder}`);
    await convertFolder(folder);
  }

  console.log("\n✓ All images converted to WebP!");
}

main();