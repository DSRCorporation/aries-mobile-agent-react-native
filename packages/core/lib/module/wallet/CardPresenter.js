import React from 'react';
import Card10Pure from '../components/misc/Card10Pure';
import Card11Pure from '../components/misc/Card11Pure';
const WalletCredentialCard = props => {
  return props.data.brandingType === 'Branding10' ? /*#__PURE__*/React.createElement(Card11Pure, props) : /*#__PURE__*/React.createElement(Card10Pure, props);
};
export default WalletCredentialCard;
//# sourceMappingURL=CardPresenter.js.map