import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popper } from 'react-popper';
import { TransitionGroup } from 'react-transition-group';
import onClickOutside from 'react-onclickoutside';
import FadeTransition from '../FadeTransition';
import './Popover.scss';

class Popover extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool.isRequired,
    placement: PropTypes.string.isRequired,
    modifiers: PropTypes.shape({}),
    onToggle: PropTypes.func.isRequired,
    style: PropTypes.shape({})
  };

  static defaultProps = {
    style: {},
    modifiers: {}
  };

  handleClickOutside = event => {
    this.props.onToggle(false, event);
  };

  renderPopper = ({ ref, style, placement, arrowProps }) => {
    const { children } = this.props;
    return (
      <div
        ref={ref}
        style={style}
        data-placement={placement}
        className="Popover"
        data-testid="popover"
      >
        <div className="Popover__Body">{children}</div>
        <div
          className="Popover__Arrow"
          data-placement={placement}
          ref={arrowProps.ref}
          style={arrowProps.style}
        />
      </div>
    );
  };

  render() {
    const { show, placement, modifiers } = this.props;

    return (
      <TransitionGroup>
        {show && (
          <FadeTransition key="popper">
            <Popper placement={placement} modifiers={modifiers}>
              {this.renderPopper}
            </Popper>
          </FadeTransition>
        )}
      </TransitionGroup>
    );
  }
}

export default onClickOutside(Popover);
