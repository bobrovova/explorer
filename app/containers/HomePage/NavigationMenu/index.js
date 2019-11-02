// Core
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import store from 'store';

// Svg
import { SvgMenuButton } from './svg';
import { /* DownArrow, */ ExternalLink } from './svg/arrow';

// Styles
import {
  Container,
  Header,
  Headlink,
  LogoImage,
  SwitcherWrapper,
  LanguageSwitcher,
  BlurBG,
  NavMenu,
  Border,
  BlueLink,
} from './styles';

// Images
import logoGif from '../../../assets/images/small_t.gif';
import logo from '../../../assets/images/logo.svg';

@translate()
export default class NavigationMenu extends PureComponent {
  state = {
    isNavMenuActive: false,
    isLogoActive: false,
  };

  componentDidUpdate() {
    if (this.state.isNavMenuActive) {
      window.addEventListener('resize', this.onResizeWindow);
    } else {
      window.removeEventListener('resize', this.onResizeWindow);
    }
  }

  onResizeWindow = () => window.innerWidth > 768 && this.toggleNavMenuHandler();

  toggleNavMenuHandler = () => this.setState(({ isNavMenuActive }) => ({ isNavMenuActive: !isNavMenuActive }));

  toggleModalHandler = (modalName, data) => () => {
    if (this.state.isNavMenuActive) this.toggleNavMenuHandler();
    this.props.toggleModal(modalName, data);
  };

  changeLanguage = (lng, shortLng) => () => {
    store.set('eosMonitor_currentLanguage', shortLng);
    this.props.i18n.changeLanguage(lng);
  };

  toggleLogoHandler = () => {
    this.setState(prevState => ({
      isLogoActive: !prevState.isLogoActive,
    }));
  };

  // <LogoImage src={logo} alt="Logo" />

  render() {
    const { isNavMenuActive, isLogoActive } = this.state;
    const { t } = this.props;
    return (
      <Container>
        <Header>
          <SvgMenuButton toggleNavMenuHandler={this.toggleNavMenuHandler} />
          <LogoImage src={logo} alt="Logo" />
        </Header>
        {isNavMenuActive && <BlurBG onClick={this.toggleNavMenuHandler} />}
        <NavMenu isNavMenuActive={isNavMenuActive}>
          <BlueLink onClick={this.toggleModalHandler('accountInfo', null)}>
            {t('i18nNavigationMenu.accountInfo')}
          </BlueLink>
          <BlueLink onClick={this.toggleModalHandler('accountHistory', null)}>
            {t('i18nNavigationMenu.accountHistory')}
          </BlueLink>
          <BlueLink onClick={this.toggleModalHandler('transactions', null)}>Поиск по транзакции</BlueLink>
          <BlueLink onClick={this.toggleModalHandler('blockInfo', 1)}>Поиск по номеру блока</BlueLink>
          <BlueLink onClick={this.toggleModalHandler('api', 1)}>{t('i18nNavigationMenu.api')}</BlueLink>
          <BlueLink onClick={this.toggleModalHandler('liveTpsChart', null)}>
            {t('i18nNavigationMenu.liveTpsChart')}
          </BlueLink>
          <BlueLink href="#" target="__blank">
            Testnet
          </BlueLink>
          <BlueLink href="#" target="__blank">
            Инструкции
          </BlueLink>
          <BlueLink href="#" target="__blank">
            Explorer
          </BlueLink>
          <BlueLink href="http://185.87.51.136/" target="__blank">
            Method Web Wallet
          </BlueLink>
        </NavMenu>
      </Container>
    );
  }
}

NavigationMenu.propTypes = {
  t: PropTypes.func,
  toggleModal: PropTypes.func,
  i18n: PropTypes.func,
};
