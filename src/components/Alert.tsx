import AwesomeAlert from 'react-native-awesome-alerts';
import { StyleSheet } from 'react-native';
import colors from 'tailwindcss/colors';

type Props = {
  visible?: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  onConfirmPressed: () => void;
  onCancelPressed?: () => void;
  cancelVisible?: boolean;
}

export function Alert({ message, confirmText, cancelText, cancelVisible = false, onConfirmPressed, onCancelPressed, visible, title }: Props) {
  return (
    <AwesomeAlert
      show={visible}
      title={title}
      message={message}
      closeOnTouchOutside={false}
      showConfirmButton={true}
      titleStyle={style.titleStyle}
      messageStyle={style.messageStyle}

      confirmText={confirmText}
      confirmButtonColor={colors.purple[800]}
      confirmButtonStyle={style.buttonStyle}
      confirmButtonTextStyle={style.buttonTextStyle}
      onConfirmPressed={onConfirmPressed}

      cancelText={cancelText}
      cancelButtonColor={colors.red[500]}
      cancelButtonStyle={style.buttonStyle}
      cancelButtonTextStyle={style.buttonTextStyle}
      onCancelPressed={onCancelPressed}

      contentContainerStyle={style.contentContainerStyle}
      showCancelButton={cancelVisible}
    />
  );
}

const style = StyleSheet.create({
  titleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
  },
  messageStyle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginVertical: 12
  },
  buttonStyle: {
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonTextStyle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular'
  },
  contentContainerStyle: {
    backgroundColor: '#262130',
    borderRadius: 16,
    padding: 20,
  }
})