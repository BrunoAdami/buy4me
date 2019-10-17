import React from 'react';
import { WellcomeDiv } from './styles';
import PropTypes from 'prop-types';

const Wellcome = props => {
  if (props.gender === 'male') {
    return <WellcomeDiv>BEM-VINDO {props.name}</WellcomeDiv>;
  }
  return <WellcomeDiv>BEM-VINDA {props.name}</WellcomeDiv>;
};
export default Wellcome;

const { string } = PropTypes;
Wellcome.propTypes = {
  gender: string.isRequired,
  name: string.isRequired,
};
