import React, { useState, useMemo } from 'react';
import { SplitPane } from '../../component/SplitPane/SplitPane';
import { useLoading } from '../../hooks/useLoading';
import { invoiceService, InvoiceDetails } from '../../service/salesManagement/invoiceService';
import { SelectInvoice } from './SelectInvoice';
import { InvoiceDetailView } from './InvoiceDetailView';

export interface LocalInvoiceMutations {
  [key: number]: InvoiceDetails;
}

export function InvoiceManager() {
  const fetchedInvoices = useLoading(
    () => invoiceService.getAll()
  )[0] || [];
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetails | null>(null);
  const [localMutations, setLocalMutations] = useState(() => new Map<number, InvoiceDetails>());
  const [toRemove, setToRemove] = useState<InvoiceDetails | null>(null)

  const invoices = useMemo(
    () => {
      const added: Array<InvoiceDetails> = [];

      for (const [id, invoice] of localMutations.entries()) {
        if (fetchedInvoices.findIndex(it => it.id === id) === -1) {
          added.push(invoice);
        }
      }

      if (toRemove) {
        return fetchedInvoices.filter(invoice => invoice.id !== toRemove.id)
      }

      return added.concat(
        fetchedInvoices
          .map(it => localMutations.has(it.id) ? localMutations.get(it.id)! : it)
      );
    },
    [fetchedInvoices, localMutations, toRemove]
  );

  function addNewLocalInvoiceModification(
    next: InvoiceDetails
  ) {
    localMutations.delete(next.id)
    const updated = new Map(localMutations);
    updated.set(next.id, next);
    setLocalMutations(updated);
    setSelectedInvoice(next)
  }

  function onDelete(
    next: InvoiceDetails
  ) {
    setToRemove(next)
  }

  return (
    <SplitPane
      left={
        <SelectInvoice
          setSelectedInvoice={setSelectedInvoice}
          selectedInvoice={selectedInvoice}
          onDelete={onDelete}
          invoices={invoices}
        />
      }
      right={
        <InvoiceDetailView
          selectedInvoice={selectedInvoice}
          onInvoiceAdded={addNewLocalInvoiceModification}
        />
      }
    />
  )
}