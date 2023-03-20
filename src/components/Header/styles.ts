import { StyleSheet } from 'react-native';
import { THEME } from '../../theme/index';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    padding: 12,
    paddingTop: 12,
    backgroundColor: THEME.COLORS.GRAY_500,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.GRAY_600,
  },
  title: {
    alignItems: 'center',
    paddingHorizontal: 32,
    color: THEME.COLORS.GRAY_200,
    fontSize: THEME.FONTS.SIZE.XXL,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});