import express from 'express';
import asciify from 'asciify-image';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3030;

app.get('/ascii/:img', async (req, res) => {
  const imgName = req.params.img;
  const imgPath = path.join(__dirname, 'content', 'img', imgName);
  if (!fs.existsSync(imgPath)) {
    return res.status(404).send('Image not found');
  }
  const options = {
    fit: 'box',
    width: 60,
    height: 30,
    color: false
  };
  try {
    const ascii = await asciify(imgPath, options);
    res.type('text/plain').send(ascii);
  } catch (err) {
    res.status(500).send('Error converting image');
  }
});

app.listen(PORT, () => {
  console.log(`ASCII server running on http://localhost:${PORT}`);
});
