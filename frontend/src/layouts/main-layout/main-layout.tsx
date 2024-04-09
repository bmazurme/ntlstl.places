import React from 'react';

import Board from '../../components/board';
import Cards from '../../components/cards';

export default function MainLayout() {
  return (<Board children={<Cards />} />);
}
