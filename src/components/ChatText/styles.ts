import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    paddingY: 12,
  },
  responsee: {
    padding: 12,
    paddingLeft: 32,
    color: THEME.COLORS.GRAY_200,
    backgroundColor: THEME.COLORS.GRAY_400,
    fontFamily: THEME.FONTS.FAMILY.PRIMARY.REGULAR,

  },
  empty: {
    color: THEME.COLORS.GRAY_200,
    textAlign: 'center',
    fontSize: THEME.FONTS.SIZE.XL,
    fontFamily: THEME.FONTS.FAMILY.PRIMARY.REGULAR,
  },
  description: {
    padding: 12,
    color: THEME.COLORS.GRAY_200,
    backgroundColor: THEME.COLORS.GRAY_500,
  },

});