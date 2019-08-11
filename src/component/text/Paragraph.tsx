import React from 'react';

interface Props {
  content: string;
}

export function ListParagraph(props: Props) {
  return(
    <li>{props.content}</li>
  )
}