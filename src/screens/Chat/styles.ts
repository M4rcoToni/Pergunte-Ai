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


});