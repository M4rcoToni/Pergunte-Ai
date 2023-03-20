import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: THEME.COLORS.GRAY_500,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 12,
    backgroundColor: THEME.COLORS.GRAY_400,
  },
  options: {
    flexDirection: 'row',
    gap: 7
  },
  scroll: {
    flex: 1,
    paddingY: 12,
  },
  description: {
    padding: 12,
    color: THEME.COLORS.GRAY_200,
    backgroundColor: THEME.COLORS.GRAY_500,
  },
  responsee: {
    padding: 12,
    paddingLeft: 32,
    color: THEME.COLORS.GRAY_200,
    backgroundColor: THEME.COLORS.GRAY_400,
  },
  empty: {
    paddingTop: '50%',
    color: THEME.COLORS.GRAY_200,
    alignSelf: 'center',
    fontSize: THEME.FONTS.SIZE.XL,
  }
});