import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 12,
    marginTop: 32,
  },
  responsee: {
    padding: 12,
    color: THEME.COLORS.GRAY_200,
  }
});