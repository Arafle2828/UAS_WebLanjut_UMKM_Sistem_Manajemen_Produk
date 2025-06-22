import React from 'react';

const ProductCard = ({ nama_produk, kategori, harga, stok }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
      <h4>{nama_produk}</h4>
      <p>Kategori: {kategori}</p>
      <p>Harga: Rp{harga}</p>
      <p>Stok: {stok}</p>
    </div>
  );
};

export default ProductCard;
