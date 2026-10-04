import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const outputZipPath = path.join(publicDir, 'algorithms-complete-package.zip');

const zip = new JSZip();

function addFolderToZip(folderPath: string, zipFolder: JSZip) {
  if (!fs.existsSync(folderPath)) return;
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    if (item === 'node_modules' || item === '.git' || item.endsWith('.zip')) continue;

    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subZip = zipFolder.folder(item);
      if (subZip) {
        addFolderToZip(fullPath, subZip);
      }
    } else {
      const fileData = fs.readFileSync(fullPath);
      zipFolder.file(item, fileData);
    }
  }
}

async function main() {
  console.log('Building full package ZIP...');

  // 1. Add dist directory (Ready for Netlify / Cloudflare drag & drop)
  if (fs.existsSync(path.join(rootDir, 'dist'))) {
    console.log('Adding dist/ folder to ZIP...');
    const distFolder = zip.folder('dist');
    if (distFolder) addFolderToZip(path.join(rootDir, 'dist'), distFolder);
  }

  // 2. Add src directory
  if (fs.existsSync(path.join(rootDir, 'src'))) {
    console.log('Adding src/ folder to ZIP...');
    const srcFolder = zip.folder('src');
    if (srcFolder) addFolderToZip(path.join(rootDir, 'src'), srcFolder);
  }

  // 3. Add root deployment and config files
  const rootFiles = [
    'package.json',
    'vite.config.ts',
    'tsconfig.json',
    'index.html',
    'netlify.toml',
    'wrangler.toml',
    'supabase_schema.sql',
    '.env.example',
  ];

  for (const f of rootFiles) {
    const p = path.join(rootDir, f);
    if (fs.existsSync(p)) {
      zip.file(f, fs.readFileSync(p));
    }
  }

  // 4. Add routing files into root for Cloudflare Pages / Netlify Direct Upload
  const redirectsPath = path.join(publicDir, '_redirects');
  if (fs.existsSync(redirectsPath)) {
    zip.file('_redirects', fs.readFileSync(redirectsPath));
  }

  const routesPath = path.join(publicDir, '_routes.json');
  if (fs.existsSync(routesPath)) {
    zip.file('_routes.json', fs.readFileSync(routesPath));
  }

  // 5. Add README.md
  zip.file(
    'README.md',
    `# المنصة التفاعلية المتقدمة لفهم وهندسة الخوارزميات المنطقية
مدرسة الوصال العامرة - بإشراف الأستاذ حمزة

## النشر الفوري بنقرة واحدة على Cloudflare Pages:
1. ارفع مجلد \`dist\` مباشرة عبر **Cloudflare Dashboard -> Workers & Pages -> Upload Assets**.
2. أو اربط مستودع GitHub مع إعدادات البناء:
   - Framework preset: **Vite**
   - Build command: \`npm run build\`
   - Build output directory: \`dist\`

## النشر الفوري بنقرة واحدة على Netlify:
1. ادخل إلى **app.netlify.com/drop**.
2. اسحب مجلد \`dist\` مباشرة وأفلته في المتصفح وسيعمل الموقع فوراً برابط عالمي!

## إعداد قاعدة بيانات Supabase:
تم ربط المشروع مسبقاً بعنوان المشروع ومفتاح الوصول.
قم بنسخ ما بداخل ملف \`supabase_schema.sql\` والصقه في **Supabase SQL Editor** ثم اضغط **RUN**.
`
  );

  console.log('Generating ZIP buffer...');
  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputZipPath, buffer);
  console.log(`Success! Full ZIP saved to: ${outputZipPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch((e) => {
  console.error('Error generating full zip:', e);
  process.exit(1);
});
