import PropTypes from 'prop-types';
import React, { Component, cloneElement } from 'react';
import { Manager, Reference } from 'react-popper';
import uncontrollable from 'uncontrollable';
import Portal from '../Portal';
import Popover from './Popover';

class PopoverTrigger extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    popover: PropTypes.node.isRequired,
    popoverModifiers: PropTypes.shape({}),
    popoverPlacement: PropTypes.string,
    popoverStyle: PropTypes.shape({}),
    show: PropTypes.bool,
    style: PropTypes.shape({})
  };

  static defaultProps = {
    popoverModifiers: {},
    popoverPlacement: 'bottom',
    popoverStyle: {},
    show: false,
    style: { display: 'inline-block' }
  };

  handleOpen = () => {
    this.props.onToggle(true);
  };

  handleClose = () => {
    this.props.onToggle(false);
  };

  render() {
    const {
      children,
      onToggle,
      popover,
      popoverStyle,
      popoverPlacement,
      popoverModifiers,
      show
    } = this.props;

    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            children({
              ref,
              show,
              onToggle: show ? this.handleClose : this.handleOpen
            })
          }
        </Reference>
        <Portal>
          <Popover
            show={show}
            style={popoverStyle}
            placement={popoverPlacement}
            modifiers={popoverModifiers}
            onToggle={onToggle}
          >
            {cloneElement(popover, {
              onToggle
            })}
          </Popover>
        </Portal>
      </Manager>
    );
  }
}

export default uncontrollable(PopoverTrigger, { show: 'onToggle' });
