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
            imageTrack="https://lh3.googleusercontent.com/m4Xo358rYskNiuF4ztEp_MyuM2Rmma6yaL70oit2fE5OTVdAhNrVHtGNtaIYwyAkoyxsKMDEl76RpjDweV8JzmEcHDx3Nq2dWEFyNIEf8SeoncUIhgLRBDPQkX_nVfbwD8TEHhM_jJLHdyq59Z8N5hg5J7T5otqRpaQHhgcvmpxOFSF2WIsYESt1Wq8i6hTsqP5LjbG1OXr6hXbh80-1K1iTigOd5PUaY-jkuKplokNGSaNHZpwNT_bezdqI_9EE4Qd3VZXoiCP5hTrENoqSGgGF-MxihW-aa0jE-BxLBa0Pay0KLVdhHjwCgp-VbEwh1kW5ZR759XHSHpQuE_Ft1oEDPHu9rrpU8hdcTUPh6KSnty267QqCGW7txC-BJw9oiFeYiTvbngUaf98Ab8NOYeukn2NOmagJiG9GrL8D_CEPJzbOgWtw9YUZxCvlqDkqVxMr4Cvwy05jALYLaTjutjvwu2dgSz2wbV6COzulbRQ173hwRFqikMLxD958adxMjUMJyJ7muJ5pFXBf5fuYoU3eTOP7lYnwPaYEaaFIsKldkVEV4qZdznN725-XqHbH_UIWKTYU1rffrhjyRyeakWypEtyfInWRDGeH-utSn-CbP2wXnZEqdlQ09Ji3huOjCbnN1cfGHnhzllSs-GVHitMjXJ6Za70RkBQ-T288ff788flfgT23jDs=w1920-h705-no"
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
            imageTrack="https://lh3.googleusercontent.com/B2i7J3yOlDygGui5syM8V18EZOMPDjU6IrApQ4w3lMLaQUIfAdLnEiV4tnoK10H2dXU-psEY4rac8DVEi8yh-bez6XExoBXHruzdZSTO7JySfC3ODYfDnQX9oN7QnqCkY4s9innqHLbmvq5u4HBAMn7HO5J9ZFX42cAEsx9THK2eLgrDg8pqsgWFviWFZNsj0mZW6WzfmRNkaWJB88_Md-C1dDdui2FLRbCcmJuJ-tsywHFfaW9uTs-1R2VJ3TrxJY93wE53fr5u9kv2ZFBHpcVQNa8dgJvz6aF5VuZmwjEnnxemwXSdUtMnlFveeRnqUu3l8yWcvlwkZsAmNJ7QUGK9X3taRSbTVYaCnUqqLrHBDEqQG9YYhQG1wr6YruDmKP95WBambhdNU0y1JIIofpW0_3ANV5cNNIub4tajbQFJAzRGcnkBUJJVL5sNeLhrj81I12El_DK-ijS7KxOc04de6jrbc1N5IYWsoLkkdqbVEckt4iIKlEW9n-zwF3EEVnIVZNaujLZazKMuA4XqRSDqJDx2tMvjeApnJTbdN7alOuuYNHfBaKcVWOZG1MuMp1Q-j3n4flQh1_GPoJ6fIGSlN73wMms4ytzEfkVfnqjMZj74DqWEzN2_-Fs6hwZ0yewnobPY0GA5v4dp0anTjCuxXgmpDcnu-i9G9xYv0fswHe72JkZ9DeA=w1594-h669-no"
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
            imageTrack="https://lh3.googleusercontent.com/CXaUHrRo1MQTUEHxZjh90stK9Zt6tmmKbmTcBbZKtCHQdakpk-y8-K04DaoUH8HaY0VTm5uJKnBeA4C8XQOGclIQQZJgVonmLGyOLv-TQw-VI-pTq31ff6QY38vMmgOvfp9nD0-sqZBdfKVOvpyMbWcTY64IZVOh9QW8fGaJZM0NkgCZdWeLXHzAZm0HwGlIQie-9UElgIYxABC8Shi3ajWKf1s2u9wf5Z6X08MmFnoiDt8cEvq3iqDj8WgQo7LA3VbtNJJCmV2_DoqDmpPBUY_4xlA7Pn8trd44czBSVUpJSC-R92de7BYgYwEfx7qd6Dm4DfGdfK1FS8F-SyDGOi2ih9xG8k-YjjC76g_V6fASu6PjuD2baQNPSc5yvbFFeHOggMhV56onPBAAO0903YVHlh1MVaoDHiO-RcAXqsothbTaHlbCWUc5CE61XenV-xTlcVgW_bPvrKAAXgX0flAT5_nWGzkGbHr7hqN7_ZOEnTXxCuCTTzLv3LP1s6rlAFRFYCb9DsvzyBHncZ7sqxcRLrTs3p2LtEHwA3o52yxxEmPLIqKEsBtvPGH61BdLt014J8Cilgo6esCJDxqHH_0qPehcstdPas37sMZMoES0o453PZ3lV_iiv5zVH9qHgsLet5tuEPXz985Nc6SCmTyPmQfMbeRdddhcC1xNArtEn77z5Z7dmzs=w1920-h764-no"
            redirectAfterAction="/kontakt"
          />
        </Grid>
      </Grid>
    </div>
  )
}