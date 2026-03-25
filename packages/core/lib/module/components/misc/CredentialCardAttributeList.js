import React from 'react';
import { FlatList } from 'react-native';
import CredentialCardActionLink from './CredentialCardActionLink';
import { CredentialAttributeRow } from './AttributeRow';
const CredentialCardAttributeList = ({
  list,
  textColor,
  showPiiWarning,
  isNotInWallet,
  hasAltCredentials,
  onChangeAlt,
  helpActionUrl,
  styles
}) => {
  return /*#__PURE__*/React.createElement(FlatList, {
    data: list,
    scrollEnabled: false,
    initialNumToRender: list.length,
    keyExtractor: i => i.key,
    renderItem: ({
      item
    }) => /*#__PURE__*/React.createElement(CredentialAttributeRow, {
      item: item,
      textColor: textColor,
      showPiiWarning: showPiiWarning,
      isNotInWallet: isNotInWallet,
      styles: styles
    }),
    ListFooterComponent: /*#__PURE__*/React.createElement(CredentialCardActionLink, {
      hasAltCredentials: hasAltCredentials,
      onChangeAlt: onChangeAlt,
      helpActionUrl: helpActionUrl,
      textStyle: styles.textContainer
    })
  });
};
export default CredentialCardAttributeList;
//# sourceMappingURL=CredentialCardAttributeList.js.map