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
              buttonText: 'produkty',
              redirectUrl: '/products'
            },
            {
              buttonText: 'zamówienia',
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