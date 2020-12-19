import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { FooterWrapper, FooterSpan, RegularLink, Lion, StyledLink } from './styles';

// Image
import lion from '../../assets/images/lion.png';

@translate()
export default class Footer extends Component {
  render() {
    const { t, path, mapPath } = this.props;

    return (
      <FooterWrapper>
        <FooterSpan>Copyright © 2020</FooterSpan>
      </FooterWrapper>
    );
  }
}

Footer.propTypes = {
  t: PropTypes.func,
  path: PropTypes.string,
  mapPath: PropTypes.string,
};
