const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(path.join(__dirname, '../public/dashboard-console-capture.js'), 'utf-8');
const scriptTag = `<script>${scriptContent}</script>`;

function injectScript(htmlPath) {
  if (!fs.existsSync(htmlPath)) return;
  
  let html = fs.readFileSync(htmlPath, 'utf-8');
  
  if (html.includes('dashboard-console-capture')) return;
  
  html = html.replace('</head>', `${scriptTag}</head>`);
  fs.writeFileSync(htmlPath, html);
  console.log(`Injected console capture script into ${htmlPath}`);
}

const outDir = path.join(__dirname, '../out');
if (fs.existsSync(outDir)) {
  const htmlFiles = [];
  
  function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath);
      }
    });
  }
  
  findHtmlFiles(outDir);
  htmlFiles.forEach(injectScript);
}