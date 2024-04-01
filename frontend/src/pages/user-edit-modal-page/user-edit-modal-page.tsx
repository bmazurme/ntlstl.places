import React from 'react';

import UserEditModalLayout from '../../layouts/user-edit-modal-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function UserEditModalPage() {
  return (<Content children={(<UserEditModalLayout />)} />);
}

export default withUser(UserEditModalPage, true);
