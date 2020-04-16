import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  Button,
  makeStyles,
  TableFooter,
  TablePagination
} from '@material-ui/core';
import { Setter } from '../../util/TypeUtils';
import { radioValueBinding, radioChangeBinding } from '../../util/bindings';
import { TableHeader } from '../../component/table/TableHeader';
import AddIcon from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/DeleteForever';
import { Notyfication, AlertType } from '../../component/notification/Notification';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { ClientExtraNote, clientExtraNoteService } from '../../service/clientExtraNoteService/clientExtraNoteService';

interface Props {
  setSelectedClientExtraNote: Setter<Props['selectedClientExtraNote']>;
  selectedClientExtraNote: ClientExtraNote | null;
  onDelete(clientExtraNote: ClientExtraNote): void;
  clientExtraNotes: Array<ClientExtraNote>;
}

const useStyle = makeStyles(() => ({
  buttonCenter: {
    textAlign: 'center',
  }
}));

export function SelectClientExtraNote({
  clientExtraNotes,
  setSelectedClientExtraNote,
  onDelete,
  selectedClientExtraNote
}: Props) {
  const cls = useStyle();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function deleteHandler(clientExtraNote: ClientExtraNote) {
    clientExtraNoteService.delete(clientExtraNote.id)
    onDelete(clientExtraNote)
    Notyfication({ type: AlertType.SUCCES, content: "Notatka została usunięta." })
    setSelectedClientExtraNote(null)
  }

  return (
    <Paper>
      <TableHeader
        actions={
          <Button
            color='primary'
            variant='contained'
            onClick={() => setSelectedClientExtraNote(null)}
          >
            <AddIcon />
            NOWY
          </Button>
        }
      >
        Notatki do faktury klienta
      </TableHeader>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'></TableCell>
            <TableCell>Nazwa klienta</TableCell>
            <TableCell>Notatka</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? clientExtraNotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : clientExtraNotes
          ).map(clientExtraNote =>
            <TableRow key={clientExtraNote.id}>
              <TableCell>
                <Radio
                  checked={
                    radioValueBinding(clientExtraNote, selectedClientExtraNote)
                  }
                  onChange={radioChangeBinding(clientExtraNote, setSelectedClientExtraNote)}
                />
              </TableCell>
              <TableCell>{clientExtraNote.extraInfoClientName}</TableCell>
              <TableCell>{clientExtraNote.extraInfo}</TableCell>
              <TableCell className={cls.buttonCenter}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => deleteHandler(clientExtraNote)}
                >
                  <Delete />
                  usuń
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={clientExtraNotes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  )
}
