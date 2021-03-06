// Core
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import store from 'store';
import isEqual from 'lodash/isEqual';

// Components
import TableHeading from './TableHeading';
import TableRow from './TableRow';

// Actions
import { uiActions } from '../../../../bus/ui/actions';
import { producerActions } from '../../../../bus/producers/actions';

// Selectors
import {
  selectProducers,
  selectLastHash,
  selectFilterInputValue,
  selectCheckedProducers,
} from '../../../../bus/producers/selectors';
import { selectTableColumnState } from '../../../../bus/ui/selectors';
import { selectHeadBlockNum, selectUnregisteredBps } from '../../../../bus/generalStats/selectors';

// Utils
import renderEnhancer from '../../../../hoc/renderEnhancer';

// Styles
import { TableContainer, TableTag, Filler, NoDataDiv, TableBody } from './styles';

const mapStateToProps = createStructuredSelector({
  // ui
  tableColumnState: selectTableColumnState(),
  // table
  producers: selectProducers(),
  lastHash: selectLastHash(),
  // checkbox state
  selectedProducers: selectCheckedProducers(),
  // Filter table value
  filterInputValue: selectFilterInputValue(),
  // CurrentBlockInfo
  headBlockNum: selectHeadBlockNum(),
  // Unregistered bps
  unregistered: selectUnregisteredBps(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      toggleProducerSelection: producerActions.toggleProducerSelection,
      toggleModal: uiActions.toggleModal,
    },
    dispatch
  ),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.tableContainer = React.createRef();
    this.table = React.createRef();
    this.tableContainerToggler = false;
  }

  state = {
    colsNumber: null,
    isTableScrolled: false,
  };

  componentDidMount() {
    this.tableContainerToggler = this.tableContainer.current.offsetHeight > 2000;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProducers.length !== this.props.selectedProducers.length)
      store.set('checkedProducers', nextProps.selectedProducers);

    if (!this.state.colsNumber) {
      this.getColSpan(nextProps.tableColumnState);
    }

    if (!isEqual(nextProps.tableColumnState, this.props.tableColumnState)) {
      store.set('tableColumnState', nextProps.tableColumnState);
      this.visibleColumnsChanged = true;
      this.getColSpan(nextProps.tableColumnState);
    }
  }

  componentDidUpdate() {
    const isTableContainerFiltered = this.tableContainer.current.offsetHeight > 2000;

    if (isTableContainerFiltered !== this.tableContainerToggler) {
      this.tableContainerToggler = isTableContainerFiltered;
      this.tableContainer.current.style.paddingTop = isTableContainerFiltered ? '0' : '90vh';
    }

    if (this.visibleColumnsChanged) {
      this.tableContainer.current.scrollLeft = this.table.current.offsetWidth - this.tableContainer.current.offsetWidth;
      this.visibleColumnsChanged = false;
    }
  }

  getColSpan = tableColumnState => {
    const cols = Object.values(tableColumnState).filter(item => item);
    this.setState({
      colsNumber: cols.length,
    });
  };

  filterHandler = producers => {
    if (!this.props.filterInputValue) return producers;

    const lowerCaseSearch = this.props.filterInputValue.toLowerCase();
    return producers.filter(producer => producer.name.toLowerCase().includes(lowerCaseSearch));
  };

  tableScrollHandler = () => {
    const { isTableScrolled } = this.state;
    const horizontalScroll = this.tableContainer.current.scrollLeft;
    if (isTableScrolled !== !!horizontalScroll) {
      this.setState(() => ({
        isTableScrolled: !!horizontalScroll,
      }));
    }
  };

  render() {
    const {
      producers,
      lastHash,
      tableColumnState,
      headBlockNum,
      actions: { toggleModal, toggleProducerSelection },
      selectedProducers,
      filterInputValue,
      unregistered,
    } = this.props;
    const { colsNumber, isTableScrolled } = this.state;

    const filteredProducers = this.filterHandler(producers);
    const reregisteredBps = unregistered.filter(bp => bp.reregisteredAt);

    return (
      <Fragment>
        <TableContainer innerRef={this.tableContainer} onScroll={this.tableScrollHandler}>
          {!filteredProducers.length && <NoDataDiv>No data found</NoDataDiv>}
          <TableTag innerRef={this.table}>
            <TableHeading tableColumnState={tableColumnState} />
            <TableBody>
              {filteredProducers.length !== 0 &&
                filteredProducers.slice(0, 21).map((producer, index) => (
                  <Fragment key={producer.name}>
                    {index === 21 && !filterInputValue && <Filler />}
                    <TableRow
                      producer={producer}
                      lastHash={lastHash}
                      isNodeChecked={selectedProducers.some(item => item === producer.name)}
                      tableColumnState={tableColumnState}
                      headBlockNum={headBlockNum}
                      toggleModal={toggleModal}
                      toggleProducerSelection={toggleProducerSelection}
                      colsNumber={colsNumber}
                      isTableScrolled={isTableScrolled}
                      index={index}
                      reregistered={reregisteredBps.some(bp => bp.name === producer.name)}
                    />
                  </Fragment>
                ))}
            </TableBody>
          </TableTag>
        </TableContainer>
      </Fragment>
    );
  }
}

Table.propTypes = {
  producers: PropTypes.array,
  selectedProducers: PropTypes.array,
  tableColumnState: PropTypes.object,
  headBlockNum: PropTypes.number,
  actions: PropTypes.object,
  filterInputValue: PropTypes.string,
  lastHash: PropTypes.string,
  unregistered: PropTypes.array,
};

export default renderEnhancer(Table);
