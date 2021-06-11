import {StyleSheet} from 'react-native';
import { TRANSPARENT } from '../../../utility/colors';

export default StyleSheet.create({
  btn: {
    backgroundColor: TRANSPARENT,
    borderColor: '#B2352C',
    borderWidth:3,
    width: '85%',
    height: 70,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {fontSize: 20, color: '#B2352C'},
});
