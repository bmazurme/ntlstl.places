import React from 'react';

import OauthLayout from '../../layouts/oauth-layout';

import withUser from '../../hocs/with-user';

function OauthPage() {
  return (<OauthLayout />);
}

export default withUser(OauthPage, false);
