import React from 'react';

import MainLayout from '../../layouts/main-layout';
import Content from '../../components/content';

import withUser from '../../hocs/with-user';

function MainPage() {
  return (<Content children={<MainLayout />} />);
}

export default withUser(MainPage, false);
