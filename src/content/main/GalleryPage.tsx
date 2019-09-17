import React from 'react';
import { FotoGalleryCardProps, FotoGalleryCard } from '../../component/card/FotoGalleryCard';

const tileData: Array<FotoGalleryCardProps> = [
  {
    img: 'http://vps730378.ovh.net/upfiles/gallery/babeczki_serowe.jpg',
    title: 'Babeczki serowe'
  },
  {
    img: 'http://vps730378.ovh.net/upfiles/gallery/golabki.jpg',
    title: 'Gołąbki'
  },
  {
    img: 'http://vps730378.ovh.net/upfiles/gallery/kapusniaki.jpg',
    title: 'Kapuśniaki'
  },
  {
    img: 'http://vps730378.ovh.net/upfiles/gallery/krokiety.jpg',
    title: 'Krokiety'
  },
  {
    img: 'http://vps730378.ovh.net/upfiles/gallery/parowki_w_ciescie.jpg',
    title: 'Parówki w cieście'
  },
  {
    img: 'http://vps730378.ovh.net/upfiles/gallery/pierogi_ze_szpinakiem.jpg',
    title: 'Pierogi ze szpinakiem'
  },
  {
    img: 'http://vps730378.ovh.net/upfiles/gallery/pierogi_z_kasza.jpg',
    title: 'Pierogi z kaszą gryczaną i pieczarkami'
  },
  {
    img: 'http://vps730378.ovh.net/upfiles/gallery/pierogi_z_kapusta.jpg',
    title: 'Pierogi z kapustą i pieczarką'
  },
  {
    img: 'http://vps730378.ovh.net/upfiles/gallery/pierogi_ruskie.jpg',
    title: 'Pierogi ruskie'
  },
  {
    img: 'https://lh3.googleusercontent.com/zWaDcyTU3idbxUEWqB3xiLIp4eU9Fa3R7PUdF1zftySgaAlqCSluO0Ll9eFE58zw-41Q4uSSxQ8Kb-qMA1yRETjW2lpmdOlm6c6nB0LN1y-YW_yErj44yPp4U_fiGqNfnASa5PzULJwOB7FOL-YdY009pkpaMS5j4yZVPdxLQF79MoCMBnvVTH6Gyxhe5wiU9_108NkKiMFCEoaIt0tFR044KoSU5NNu9SDd0qD3ncePgwvawcQlumOcy0cgKQY9XWaL01ZN3Bk9OoPNhrhXkjIvQgB2glC3FFvIgHTtYgHjOjAGZ5fnoM8wKD2vCoupnc7BInj0YDT9Hfc2Wx8GKBIT99WOiCcEN3d6JDn7QrgPtnMNpnMyd3G1G1S4PV1UTSyZPp9_R0AZU-S6plIjsqNHCWluRy0dUxE79Hpwspg9e6fGuhlSXrrozXK7BADSyPbbZ7jb3uV7weGNqn31sfjCMlp5VwLjrQ1ikhum5LeY_FdVSg1HbOMwJBZnRTRvlYcg8tFQKr7e2cO96-FZP7khQ1IPZewYuPOENU0yhkXE5dZD11heGhnOXiWHQYoZBjtXFvv8ijKFucx876azjg5LuTK4fvwUmPfzc-_uixAaBaa8G0GU30ObBnda5wZ02eguN1Fc9qvEAd-bt2esHADKL0Dqlow=w1250-h700-no',
    title: 'Pierogi firmowe'
  }
];

export function GalleryPage() {
  return (
    FotoGalleryCard(tileData)
  )
}
