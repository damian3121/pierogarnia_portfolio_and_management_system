import React, { useState, useMemo } from 'react';
import { SplitPane } from '../../component/SplitPane/SplitPane';
import { mergeById } from '../../util/arrayUtils';
import { useLoading } from '../../hooks/useLoading';
import { productService, Product } from '../../service/salesManagement/productService'
import { SelectProduct } from './SelectProduct';
import { ProductDetailView } from './ProductDetailView';

export function ProductManager() {
  const fetchedProducts = useLoading(
    () => productService.getAllProducts()
  )[0] || [];
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [localProducts, setLocalProducts] = useState<Array<Product>>([]);

  function onProductAdded(product: Product) {
    setLocalProducts([product].concat(localProducts));
    setSelectedProduct(product)
  }

  function onProductUpdated(product: Product) {
    setLocalProducts(products.filter(t => t.id !== product.id))
    setLocalProducts([product].concat(localProducts));
    setSelectedProduct(product)
  }

  const products = useMemo(
    () => mergeById(localProducts, fetchedProducts),
    [fetchedProducts, localProducts]
  );

  function onDeleteProduct(id: number) {
    setLocalProducts(products.filter(t => t.id !== id))
  }

  return (
    <SplitPane
      left={
        <SelectProduct
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          onDeleteProduct={onDeleteProduct}
          products={products}
        />
      }
      right={
        <ProductDetailView
          selectedProduct={selectedProduct}
          onProductAdded={onProductAdded}
          onProductUpdated={onProductUpdated}
        />
      }
    />
  )
}