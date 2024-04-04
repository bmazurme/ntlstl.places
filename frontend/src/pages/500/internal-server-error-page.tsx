import React from 'react';

import InternalServerErrorLayout from '../../layouts/internal-server-error-layout';
import Content from '../../components/content';
import withUser from '../../hocs/with-user';

function InternalServerErrorPage() {
  return (<Content children={(<InternalServerErrorLayout />)} />);
}

export default withUser(InternalServerErrorPage, false);
