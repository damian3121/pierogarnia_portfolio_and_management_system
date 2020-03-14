import React, { useState, useMemo } from 'react';
import { SplitPane } from '../../component/SplitPane/SplitPane';
import { useLoading } from '../../hooks/useLoading';
import { productService, Product } from '../../service/salesManagement/productService'
import { SelectProduct } from './SelectProduct';
import { ProductDetailView } from './ProductDetailView';

export function ProductManager() {
  const fetchedProducts = useLoading(
    () => productService.getAll()
  )[0] || [];
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [localMutations, setLocalMutations] = useState(() => new Map<number, Product>());
  const [toRemove, setToRemove] = useState<Product | null>(null)

  const products = useMemo(
    () => {
      const added: Array<Product> = [];

      for (const [id, product] of localMutations.entries()) {
        if (fetchedProducts.findIndex(it => it.id === id) === -1) {
          added.push(product);
        }
      }

      if (toRemove) {
        return fetchedProducts.filter(product => product.id !== toRemove.id)
      }

      return added.concat(
        fetchedProducts
          .map(it => localMutations.has(it.id) ? localMutations.get(it.id)! : it)
      );
    },
    [fetchedProducts, localMutations, toRemove]
  );

  function addNewLocalProductModification(
    next: Product
  ) {
    const updated = new Map(localMutations);
    updated.set(next.id, next);
    setLocalMutations(updated);
    setSelectedProduct(next)
  }

  function onDelete(
    next: Product
  ) {
    setToRemove(next)
  }

  return (
    <SplitPane
      left={
        <SelectProduct
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          onDelete={onDelete}
          products={products}
        />
      }
      right={
        <ProductDetailView
          selectedProduct={selectedProduct}
          onProductAdded={addNewLocalProductModification}
          onProductUpdated={addNewLocalProductModification}
        />
      }
    />
  )
}