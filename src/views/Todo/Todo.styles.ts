import { AppTheme } from '@/src/styles';
import styled from '@emotion/native';

export const Container = styled.View({
  flex: 1,
  padding: 16,
});

export const TaskTitle = styled.Text<{ isDone: boolean; theme: AppTheme }>(props => ({
  fontSize: 16,
  textDecorationLine: props.isDone ? 'none' : 'line-through',
  color: props.isDone ? props.theme.colors.inversePrimary : props.theme.colors.onSurface,
}));
