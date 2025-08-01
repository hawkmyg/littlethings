const fs = require('fs');
const path = require('path');

// Adjust folder locations if needed
const dir = path.join(__dirname, '../images/products');
const out = path.join(__dirname, '../images/product-images.json');

fs.readdir(dir, (err, files) => {
  if (err) throw err;
  const images = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .map(f => `images/products/${f}`);
  fs.writeFileSync(out, JSON.stringify(images, null, 2));
  console.log('Image list generated:', out);
});