// Core
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

// Utils
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { formatNumber } from '../../../../utils/intUtils';

// Svg
import { SvgSpinner } from '../svg';

// Styles
import { Wrapper, Header, HeaderSpan, TextSpan, GreenSpan } from '../styles';
import { Container, GreenLink } from './styles';
import {
  selectAdditionalInfoStats,
  selectConnectedUsers,
  selectTpsApsStats,
} from '../../../../bus/generalStats/selectors';

const mapStateToProps = createStructuredSelector({
  additionalInfoStats: selectAdditionalInfoStats(),
  tpsApsStats: selectTpsApsStats(),
  connectedUsers: selectConnectedUsers(),
});

@translate()
@connect(mapStateToProps)
export default class GeneralInfo extends PureComponent {
  correctBalance = balance => {
    if (!balance) {
      return '';
    }
    const [value] = balance.split(' ');
    return `${formatNumber(value.substr(0, value.length - 2))} JUN`;
  };

  render() {
    const { t, tpsApsStats, additionalInfoStats, connectedUsers, toggleModal, headBlockNum } = this.props;

    return (
      <Wrapper>
        <Header>
          <HeaderSpan>{t('i18nFirstSection.i18nGeneralInfo.title')}</HeaderSpan>
        </Header>
        <Container>
          {tpsApsStats.stackedTotal ? (
            <Fragment>
              <TextSpan>
                {t('i18nFirstSection.i18nGeneralInfo.stakedTotal')}:{' '}
                <GreenSpan>{tpsApsStats.stackedTotal && formatNumber(tpsApsStats.stackedTotal)} JUN</GreenSpan>
              </TextSpan>
              <TextSpan>
                {t('i18nFirstSection.i18nGeneralInfo.activatedStake')}:{' '}
                <GreenSpan>
                  {additionalInfoStats.totalActivatedStake && formatNumber(additionalInfoStats.totalActivatedStake)}
                </GreenSpan>
              </TextSpan>
              <TextSpan>
                {t('i18nFirstSection.i18nGeneralInfo.tps')}:{' '}
                <GreenSpan>
                  <GreenLink onClick={() => toggleModal('blockInfo', headBlockNum)}>{tpsApsStats.liveTps}</GreenLink> /{' '}
                  <GreenLink onClick={() => toggleModal('blockInfo', tpsApsStats.maxTpsBlock)}>
                    {tpsApsStats.maxTps}
                  </GreenLink>
                </GreenSpan>
              </TextSpan>
              <TextSpan>
                {t('i18nFirstSection.i18nGeneralInfo.aps')}:{' '}
                <GreenSpan>
                  <GreenLink onClick={() => toggleModal('blockInfo', headBlockNum)}>{tpsApsStats.liveAps}</GreenLink> /{' '}
                  <GreenLink onClick={() => toggleModal('blockInfo', tpsApsStats.maxApsBlock)}>
                    {tpsApsStats.maxAps}
                  </GreenLink>
                </GreenSpan>
              </TextSpan>
              <TextSpan>
                {t('i18nFirstSection.i18nGeneralInfo.ramUsed')}:{' '}
                <GreenSpan>{`${formatNumber(additionalInfoStats.ramUsed)} / ${formatNumber(
                  additionalInfoStats.maxRamSize
                )} Gb`}</GreenSpan>
              </TextSpan>
              <TextSpan>
                {t('i18nFirstSection.i18nGeneralInfo.totalUnpaidBlocks')}:{' '}
                <GreenSpan>{formatNumber(additionalInfoStats.totalUnpaidBlocks)}</GreenSpan>
              </TextSpan>
              <TextSpan>
                {t('i18nFirstSection.i18nGeneralInfo.eosioRamFee')}:{' '}
                <GreenSpan>{this.correctBalance(additionalInfoStats.eosioRamFee)}</GreenSpan>
              </TextSpan>
              <TextSpan>
                {t('i18nFirstSection.i18nGeneralInfo.eosioSaving')}:{' '}
                <GreenSpan>{this.correctBalance(additionalInfoStats.eosioSaving)}</GreenSpan>
              </TextSpan>
              <TextSpan>
                {t('i18nFirstSection.i18nGeneralInfo.connectedUsers')}: <GreenSpan>{connectedUsers}</GreenSpan>
              </TextSpan>
            </Fragment>
          ) : (
            <SvgSpinner />
          )}
        </Container>
      </Wrapper>
    );
  }
}

GeneralInfo.propTypes = {
  t: PropTypes.func,
  tpsApsStats: PropTypes.object,
  additionalInfoStats: PropTypes.object,
  connectedUsers: PropTypes.number,
  headBlockNum: PropTypes.number,
  toggleModal: PropTypes.func,
};
