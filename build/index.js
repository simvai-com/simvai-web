const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5200;

const rootDir = path.join(__dirname, '..');
const distPath = path.join(rootDir, 'dist');
const assetsPath = path.join(rootDir, 'assets');

app.use(express.static(distPath));            // для index.html и остальных
app.use('/assets', express.static(assetsPath)); // отдельно обслуживаем assets

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
