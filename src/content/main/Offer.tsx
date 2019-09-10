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
              </Fragment>
            }
            imageHeight={250}
            imageTrack="https://lh3.googleusercontent.com/hyYIwx_y8h_r-osMXZpdg_kZCE6JnsIdkIIIZNC0JFo30O9e7OKuBpl5Ne6FN6nYkUPMqJ9DZDYYqomYFOJmhpKg-NP3NP0sMCH6cm64_aMq2B5uNcsgYW5CvrNX-rXfj0DrJjXKPi8tDx-yWOArMNgx-mh8vIvKtic2zKSSIBDWsrre5O7D8glR-XR4GeajXQcA7k3XtJo5EKCzobbw_VgL0i1MVkYlLEtG5cJrnZg3Iih-mNB9k2hyCkPA-BhtuEUgK8m6z7ARWiudcToPHvjEm1YeRrypQJ823rxS-1MrFgd0HXvUUYB0ytqaUA2U0eUXzK_Zxoj9Ydl3rxMHwKpubBtracpzKKUeQAqnf5cnqUltdakNXGDyej4mewvKRjJj3FBGLcFO_2ePFsE4Ra3GC3T3j7gRFtP4VR2Cbxc26drrn6Ibqkr7zhlzVMwfrsvYU5QptOyezm_yFh2E4dOa90jLYblDpmRGCo0Z4JPJBdWMhTioxKeQVIh1r0P9rNK0e_21Sf1VoEAHmjVyDZhe8BW5nX1SjeABENUEgNd3PZmdW5DasZtWAXrBrl2tAPl8OXSlE5knWyXYLIxeHtYKhwU8XNBRE1-0u_pngky9MsdYDZ7FHewZ8kzIUytbFSy1IisqLqkeOBd_ngZ3p4tZrW0FASlZfY8IZC-53HryJuRYgUThykw=w1483-h585-no"
          />
        </Grid>
      </Grid>
    </div>
  )
}