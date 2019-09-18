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
    img: 'http://vps730378.ovh.net/upfiles/gallery/pierogi_firmowe.jpg',
    title: 'Pierogi firmowe'
  }
];

export function GalleryPage() {
  return (
    FotoGalleryCard(tileData)
  )
}
