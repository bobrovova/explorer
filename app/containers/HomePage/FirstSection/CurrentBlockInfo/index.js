// Core
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

// Utils
import { formatNumber } from '../../../../utils/intUtils';
import { convertUtcToLocal } from '../../../../utils/dateUtils';

// Svg
import { SvgSpinner } from '../svg';

// Styles
import { PurpleSpan, HeadGreenSpan, FooterContainer, TimeGreenSpan, DifferenceSpan, GraySpan } from './styles';
import { Wrapper, Header, HeaderSpan, Container, TextSpan, GreenSpan } from '../styles';

@translate()
export default class CurrentBlockInfo extends PureComponent {
  render() {
    const { t, lastBlockStats } = this.props;

    return (
      <Wrapper>
        <Header>
          <HeaderSpan>{t('i18nFirstSection.i18nCurrentBlockInfo.title')}</HeaderSpan>
        </Header>
        <Container>
          {lastBlockStats.head_block_num ? (
            <Fragment>
              <TextSpan>
                {t('i18nFirstSection.i18nCurrentBlockInfo.irreversibleBlock')}
                <GreenSpan>{formatNumber(lastBlockStats.last_irreversible_block_num)}</GreenSpan>
                <DifferenceSpan>
                  [{formatNumber(lastBlockStats.last_irreversible_block_num - lastBlockStats.head_block_num)}]
                </DifferenceSpan>
              </TextSpan>
              <TextSpan>
                {t('i18nFirstSection.i18nCurrentBlockInfo.producedBy')}
                <GreenSpan>{lastBlockStats.head_block_producer}</GreenSpan>
              </TextSpan>
              <TextSpan>
              {t('i18nFirstSection.i18nCurrentBlockInfo.next')}
                <GreenSpan>{lastBlockStats.next_producer}</GreenSpan>
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

CurrentBlockInfo.propTypes = {
  t: PropTypes.func,
  lastBlockStats: PropTypes.object,
};
