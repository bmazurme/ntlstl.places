import React from 'react';

import KitLayout from '../../layouts/kit-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function KitPage() {
  return (<Content children={(<KitLayout />)} />);
}

export default withUser(KitPage, false);
