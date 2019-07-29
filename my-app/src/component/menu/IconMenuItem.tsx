import React from 'react';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import LocalOffer from '@material-ui/icons/LocalOffer';
import AttachMoney from '@material-ui/icons/AttachMoney';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Phone from '@material-ui/icons/Phone'

export function IconMenuItem(props: string) {
  switch (props) {
    case 'SupervisedUserCircle': return <SupervisedUserCircle />
    case 'LocalOffer': return <LocalOffer />
    case 'AttachMoney': return <AttachMoney />
    case 'PhotoCamera': return <PhotoCamera />
    case 'Phone': return <Phone />
    default: return <div></div>
  }

}