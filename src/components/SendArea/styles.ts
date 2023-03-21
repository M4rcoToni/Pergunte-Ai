import { StyleSheet } from 'react-native';
import { THEME } from '../../theme/index';

export const styles = StyleSheet.create({
  container: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 52,
    paddingStart: 22,
    paddingEnd: 22,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: THEME.COLORS.PRIMARY,
    fontFamily: THEME.FONTS.FAMILY.PRIMARY.REGULAR,
    fontSize: THEME.FONTS.SIZE.MD,
    color: THEME.COLORS.GRAY_200,
  },
  send: {
    width: 52,
    height: 52,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});