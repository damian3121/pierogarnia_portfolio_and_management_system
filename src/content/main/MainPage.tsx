import React from 'react';
import { Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import InfoCard from '../../component/card/InfoCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 'auto',
      width: '50%',
    }
  }),
);

export function MainPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InfoCard
            title="O nas"
            content="Produkcja wyrobów garmażeryjnych powstała w 2018r. 
                    Tworzymy nowoczesny zakład zatrudniający pracowników pasjonujących się swojskimi wyrobami
                    oraz wyposażony w nowoczesne maszyny. Gotowanie to nasza pasja :)"
            imageHeight={250}
            imageTrack="https://imageshack.com/i/plXktLPoj"
            redirectAfterAction="/o-nas"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InfoCard
            title="Oferta"
            content="W naszym sklepie można znaleźć szeroką gammę wyrobów garmażeryjnych. 
                    Zaczynając od pierogów i kopytek, kończąc na krokietach i kapuśniaczkach. 
                    Do wyrobów używamy najlepszych składników, najlepszych maszyn, które tworzy najlepsza ekipa :)"
            imageHeight={250}
            imageTrack="https://imageshack.com/i/pngp3ShKj"
            redirectAfterAction="/oferta"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InfoCard
            title="Kontakt"
            content="Skontaktować się możesz z nami za pomocą numeru telefonu, 
                    mailowo bądź odwiedź nas osobiście i przekonaj się o tym, 
                    że drugiego takiego miejsca nie znajdziesz w okolicy! 
                    Jesteśmy otwarci na wszelkie propozycje i nie boimy się wyzwań! :)"
            imageHeight={250}
            imageTrack="https://imageshack.com/i/po8RM85lj"
            redirectAfterAction="/kontakt"
          />
        </Grid>
      </Grid>
    </div>
  )
}