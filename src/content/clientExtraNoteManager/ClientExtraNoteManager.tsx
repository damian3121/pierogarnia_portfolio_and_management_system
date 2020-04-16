import React, { useState, useMemo } from 'react';
import { ClientExtraNote, clientExtraNoteService } from '../../service/clientExtraNoteService/clientExtraNoteService';
import { useLoading } from '../../hooks/useLoading';
import { SplitPane } from '../../component/SplitPane/SplitPane';
import { SelectClientExtraNote } from './SelectClientExtraNote';
import { ClientExtraNoteDetailView } from './ClientExtraNoteDetailView';

export interface LocalOrderMutations {
  [key: number]: ClientExtraNote;
}

export function ClientExtraNoteManager() {
  const fetchedClientExtraNote = useLoading(
    () => clientExtraNoteService.getAll()
  )[0] || [];
  const [selectedClientExtraNote, setSelectedClientExtraNote] = useState<ClientExtraNote | null>(null);
  const [localMutations, setLocalMutations] = useState(() => new Map<number, ClientExtraNote>());
  const [toRemove, setToRemove] = useState<ClientExtraNote | null>(null)

  const clientExtraNotes = useMemo(
    () => {
      const added: Array<ClientExtraNote> = [];

      for (const [id, clientExtraNote] of localMutations.entries()) {
        if (fetchedClientExtraNote.findIndex(it => it.id === id) === -1) {
          added.push(clientExtraNote);
        }
      }

      if (toRemove) {
        return fetchedClientExtraNote.filter(clientExtraNote => clientExtraNote.id !== toRemove.id)
      }

      return added.concat(
        fetchedClientExtraNote
          .map(it => localMutations.has(it.id) ? localMutations.get(it.id)! : it)
      );
    },
    [fetchedClientExtraNote, localMutations, toRemove]
  );

  function addNewLocalClientExtraNoteModification(
    next: ClientExtraNote
  ) {
    const updated = new Map(localMutations);
    updated.set(next.id, next);
    setLocalMutations(updated);
    setSelectedClientExtraNote(next)
  }

  function onDelete(
    next: ClientExtraNote
  ) {
    setToRemove(next)
  }

  return (
    <SplitPane
      left={
        <SelectClientExtraNote
          setSelectedClientExtraNote={setSelectedClientExtraNote}
          selectedClientExtraNote={selectedClientExtraNote}
          onDelete={onDelete}
          clientExtraNotes={clientExtraNotes}
        />
      }
      right={
        <ClientExtraNoteDetailView
          selectedClientExtraNote={selectedClientExtraNote}
          onClientExtraNoteAdded={addNewLocalClientExtraNoteModification}
          onClientExtraNoteUpdated={addNewLocalClientExtraNoteModification}
        />
      }
    />
  )
}