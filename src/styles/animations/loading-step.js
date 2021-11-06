import styled from 'styled-components';
import { loading } from './animations';

const LoadingStep = styled.span`
  animation: ${loading} 1.4s infinite both;
  animation-delay: ${props => props.delay};
  font-size: 3em;
`;

export default LoadingStep;
