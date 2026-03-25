import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import WalletNameForm from '../components/forms/WalletNameForm';
const RenameWallet = () => {
  const navigation = useNavigation();
  const onCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  const onSubmitSuccess = useCallback(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ => {
    // TODO: We can't assign to this label anymore, do we want to do anything with this argument still?
    // agent.config.label = name
    navigation.goBack();
  }, [navigation]);
  return /*#__PURE__*/React.createElement(WalletNameForm, {
    isRenaming: true,
    onCancel: onCancel,
    onSubmitSuccess: onSubmitSuccess
  });
};
export default RenameWallet;
//# sourceMappingURL=RenameWallet.js.map