import React, { useState, useMemo } from 'react';
import { SplitPane } from '../../component/SplitPane/SplitPane';
import { mergeById, arrayDel } from '../../util/arrayUtils';
import { useLoading } from '../../hooks/useLoading';
import { orderService } from '../../service/salesManagement/orderService'
import { Order } from '../../service/salesManagement/orderService';
import { SelectOrder } from './SelectOrder';
import { OrderDetailView } from './OrderDetailView';

export interface LocalOrderMutations {
  [key: number]: Order;
}

export function OrderManager() {
  const fetchedOrders = useLoading(
    () => orderService.getAll()
  )[0] || [];
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [localMutations, setLocalMutations] = useState(() => new Map<number, Order>());
  const [toRemove, setToRemove] = useState<Order | null>(null)

  const orders = useMemo(
    () => {
      const added: Array<Order> = [];

      for (const [id, order] of localMutations.entries()) {
        if (fetchedOrders.findIndex(it => it.id === id) === -1) {
          added.push(order);
        }
      }

      if (toRemove) {
        return fetchedOrders.filter(order => order.id !== toRemove.id)
      }

      return added.concat(
        fetchedOrders
          .map(it => localMutations.has(it.id) ? localMutations.get(it.id)! : it)
      );
    },
    [fetchedOrders, localMutations, toRemove]
  );

  function addNewLocalOrderModification(
    next: Order
  ) {
    const updated = new Map(localMutations);
    updated.set(next.id, next);
    setLocalMutations(updated);
    setSelectedOrder(next)
  }

  function onDelete(
    next: Order
  ) {
    setToRemove(next)
  }

  return (
    <SplitPane
      left={
        <SelectOrder
          setSelectedOrder={setSelectedOrder}
          selectedOrder={selectedOrder}
          onDelete={onDelete}
          orders={orders}
        />
      }
      right={
        <OrderDetailView
          selectedOrder={selectedOrder}
          onOrderAdded={addNewLocalOrderModification}
          onOrderUpdated={addNewLocalOrderModification}
        />
      }
    />
  )
}