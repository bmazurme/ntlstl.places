import React from 'react';

import KitLayout from '../../layouts/kit-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function AdminPage() {
  return (<Content children={(<KitLayout />)} />);
}

export default withUser(AdminPage, true);
