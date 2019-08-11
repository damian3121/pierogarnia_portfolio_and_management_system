import React, { Fragment } from 'react';
import { Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import InfoCard from '../../component/card/InfoCard';
import { ListParagraph } from '../../component/text/Paragraph';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 'auto',
      width: '50%',
    }
  }),
);

export function Offer() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InfoCard
            title="Oferta"
            content={
              <Fragment>
                <p>Realizujemy zamówienia zarówno dla firm jak i osób prywatnych. 
                    Prowadzimy również sklepik (Jeżowe 237), gdzie od poniedziałku do piątku można zakupić świeże obiady/wyroby. 
                    Pakujemy próżniowo co sprawi, że Państwa zakupy będą miały dłuższą datę ważności i 
                    będą wygodniejsze w przechowywaniu. Przy większych bądź stałych zamówieniach zapewniamy dowózna miejsce. 
                    Oferujemy również:
                </p>
                <ListParagraph content="przekąski oraz pierogi przygotowywane specjalnie na różne imprezy okolicznościowe(chrzciny, wesela, komunie) 
                                    np. kapuśniaki, parówki w cieście, paszteciki, krokiety etc" />
                <ListParagraph content="obiady i dania dla szkół i innych placówek publicznych"/>
                <ListParagraph content="próżniowe pakowanie (nowość!)" />
                <ListParagraph content="zamówienia realizowane dla sklepów" />
                <ListParagraph content="produkty przygotowane do przewozów długich i ekstremalnych np. przewoźnicy międzynarodowi" />
                <li>elo</li>
              </Fragment>
            }
            imageHeight={250}
            imageTrack="https://imageshack.com/i/plXktLPoj"
          />
        </Grid>
      </Grid>
    </div>
  )
}