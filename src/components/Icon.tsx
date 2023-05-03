import { MotiView } from 'moti';
import { styled } from 'nativewind';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  children: React.ReactNode;
  background?: 'bg-gray-500' | 'bg-purple-mid' | 'bg-trans-100'
}

function IconStyled({ background = 'bg-gray-500', children, ...rest }: Props) {
  return (
    <MotiView
      from={{
        opacity: 0,
        translateX: -50
      }}
      animate={{
        opacity: 1,
        translateX: 0
      }}
      transition={{
        type: 'timing',
        duration: 400,
      }}

    >
      <TouchableOpacity className={`h-12 w-12 rounded-full bg-gray-500 justify-center items-center ${background}`} {...rest}>
        {children}
      </TouchableOpacity>
    </MotiView>
  )
}
const Icon = styled(IconStyled);
export { Icon };