import {Platform} from 'react-native';

export const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
