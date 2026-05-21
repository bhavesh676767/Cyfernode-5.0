/**
 * Compress team portraits for the team page.
 * Outputs WebP (max 600px wide, quality 82) and removes source PNGs.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const TEAM_DIR = path.join(__dirname, "..", "images", "team");
const MAX_WIDTH = 600;
const WEBP_QUALITY = 82;

async function compressOne(file) {
  const input = path.join(TEAM_DIR, file);
  const base = file.replace(/\.png$/i, "");
  const output = path.join(TEAM_DIR, `${base}.webp`);
  const before = fs.statSync(input).size;

  const meta = await sharp(input).metadata();
  let pipeline = sharp(input).rotate();

  if (meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(output);

  const after = fs.statSync(output).size;
  fs.unlinkSync(input);

  return { name: base, before, after };
}

async function main() {
  const files = fs.readdirSync(TEAM_DIR).filter((f) => /\.png$/i.test(f));
  if (!files.length) {
    console.log("No PNG files found in images/team/");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  const results = [];

  for (const file of files) {
    results.push(await compressOne(file));
  }

  for (const r of results) {
    totalBefore += r.before;
    totalAfter += r.after;
    const pct = Math.round((1 - r.after / r.before) * 100);
    console.log(
      `  ${r.name}.webp  ${(r.before / 1024).toFixed(0)} KB → ${(r.after / 1024).toFixed(0)} KB  (-${pct}%)`
    );
  }

  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB  (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
