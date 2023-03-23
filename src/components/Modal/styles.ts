import { StyleSheet } from 'react-native';
import { THEME } from '../../theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStartColor: THEME.COLORS.GRAY_600,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  header: {
    alignItems: 'flex-end',
    paddingBottom: 16,
  },
  content: {
    height: '100%',
    width: '70%',
    padding: 16,
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: THEME.COLORS.GRAY_600,
  },
  title: {
    color: THEME.COLORS.GRAY_200,
    fontFamily: THEME.FONTS.FAMILY.PRIMARY.REGULAR,
    fontSize: THEME.FONTS.SIZE.XL,

    textAlign: "center",
    marginBottom: 16
  },
});