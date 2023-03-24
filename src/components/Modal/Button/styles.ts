import { StyleSheet } from 'react-native';
import { THEME } from '../../../theme/index';

export const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    borderWidth: 0.2,
    borderColor: THEME.COLORS.GRAY_200,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 14,
  },
  text: {
    color: THEME.COLORS.GRAY_200,
    fontFamily: THEME.FONTS.FAMILY.PRIMARY.REGULAR,
    fontSize: THEME.FONTS.SIZE.MD,
  },
});