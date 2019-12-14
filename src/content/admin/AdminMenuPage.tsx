import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import { PaperMenuItem } from '../../component/navigation/PaperMenuItem';

export function AdminMenuPage() {

  return (
    <Fragment>
      <Grid xs={12} item={true}>
        <PaperMenuItem
          paperSectionHeader='Zarządzaj sprzedażą'
          buttonMenuData={[
            {
              buttonText: 'dodaj produkt',
              redirectUrl: '/add-product'
            },
            {
              buttonText: 'dodaj zamówienie',
              redirectUrl: '/add-order'
            },
            {
              buttonText: 'lista produktów',
              redirectUrl: '/products'
            },
            {
              buttonText: 'lista zamówień',
              redirectUrl: '/orders'
            }
          ]}
        />
        <PaperMenuItem
          paperSectionHeader='Zarządzaj użytkownikami'
          buttonMenuData={[
            {
              buttonText: 'dodaj użytkownika',
              redirectUrl: '/add-users'
            },
            {
              buttonText: 'lista użytkowników',
              redirectUrl: '/users'
            },
          ]}
        />
      </Grid>
    </Fragment>
  )
}