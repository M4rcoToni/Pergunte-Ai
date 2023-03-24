import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderTopColor: THEME.COLORS.GRAY_200,
  },
  area: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  text: {
    color: THEME.COLORS.GRAY_200,
    fontFamily: THEME.FONTS.FAMILY.PRIMARY.REGULAR,
    fontSize: THEME.FONTS.SIZE.MD,
    paddingHorizontal: 16,
  }
});