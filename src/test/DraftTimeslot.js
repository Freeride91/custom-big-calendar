import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, defineMessages } from 'react-intl';
import { PopoverTrigger } from '../components/Popover';
import { TimeslotType } from '../constants/Court';
import Button from '../components/Button';
import { EmptyTimeslot } from '../components/Calendar';
import Authority from './Authority';

const messages = defineMessages({
  buttonLabel: {
    id: 'DraftTimeslot.buttonLabel',
    defaultMessage: `{type, select,
      ${TimeslotType.PROGRAM} {Program}
      ${TimeslotType.BLOCKED_OFF} {Block off times}
      ${TimeslotType.COURT_RESERVATION} {Book court}
      ${TimeslotType.COACH_AVAILABILITY} {I'm available}
      ${TimeslotType.LESSON} {Lesson}
    }`
  }
});

function DraftTimeslot(props) {
  const { types, onCancel, onSelect, ...rest } = props;
  const popover = (
    <div style={{ padding: '.5rem' }}>
      {types.map(({ type, permissions }) => (
        <Authority key={type} {...permissions}>
          {({ authorized }) =>
            authorized && (
              <Button
                theme={Button.themes.TEXT}
                onClick={onSelect}
                params={type}
                compact
              >
                <FormattedMessage {...messages.buttonLabel} values={{ type }} />
              </Button>
            )
          }
        </Authority>
      ))}
    </div>
  );

  return (
    <PopoverTrigger
      show
      popoverPlacement="bottom"
      popover={popover}
      onToggle={onCancel}
    >
      {({ ref }) => <EmptyTimeslot {...rest} ref={ref} title="+ CREATE" />}
    </PopoverTrigger>
  );
}

DraftTimeslot.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(TimeslotType.values).isRequired,
      permissions: PropTypes.shape({})
    })
  ).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default DraftTimeslot;
