import { StyleSheet } from 'react-native';
import { THEME } from '../../theme/index';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 22,
    padding: 12,
    paddingTop: 12,
    backgroundColor: THEME.COLORS.GRAY_500,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_600,
  },
  title: {
    alignItems: 'flex-start',
    paddingHorizontal: 32,
    color: THEME.COLORS.GRAY_200,
    fontSize: THEME.FONTS.SIZE.XXL,
    fontWeight: 'bold',
  },

});