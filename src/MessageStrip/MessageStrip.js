import Button from '../Button/Button';
import classnames from 'classnames';
import CustomPropTypes from '../utils/CustomPropTypes/CustomPropTypes';
import Link from '../Link/Link';
import { MESSAGESTRIP_TYPES } from '../utils/constants';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import 'fundamental-styles/dist/icon.css';
import 'fundamental-styles/dist/message-strip.css';


/** A **MessageStrip** provides a message within the application that is
 * color-coded to emphasize the level of urgency. */

const MessageStrip = (props) => {

    let [active, setActive] = useState(true);

    const {
        onCloseClicked,
        buttonProps,
        type,
        link,
        linkProps,
        linkText,
        localizedText,
        noGlyph,
        dismissible,
        children,
        className,
        ...otherProps
    } = props;

    const closeMessageStripHandler = (e) => {
        setActive(false);
        onCloseClicked(e);
    };


    const MessageStripClasses = classnames(
        'fd-message-strip',
        {
            'fd-message-strip--dismissible': dismissible,
            'fd-message-strip--no-icon': noGlyph,
            [`fd-message-strip--${type}`]: !!type
        },
        className
    );

    return (
        <div>
            {active && (
                <div
                    {...otherProps}
                    className={MessageStripClasses}
                    role='alert'>
                    {dismissible && (
                        <Button
                            {...buttonProps}
                            aria-controls='j2ALl423'
                            aria-label={localizedText.close}
                            className='fd-message-strip__close'
                            compact
                            onClick={closeMessageStripHandler}
                            option='transparent' />
                    )}
                    <p className='fd-message-strip__text'>
                        {children}
                        {link && (
                            <Link
                                {...linkProps}
                                href={link}>
                                {linkText}{' '}
                            </Link>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

MessageStrip.displayName = 'MessageStrip';

MessageStrip.propTypes = {
    /** Additional props to be spread to the `<button>` element */
    buttonProps: PropTypes.object,
    /** Node(s) to render within the component */
    children: PropTypes.node,
    /** CSS class(es) to add to the element */
    className: PropTypes.string,
    /** Set to **true** to show a dismiss button */
    dismissible: PropTypes.bool,
    /** Value to be applied to the anchor\'s `href` attribute */
    link: PropTypes.string,
    /** Additional props to be spread to the link\'s `<a>` element */
    linkProps: PropTypes.object,
    /** Localized display text of the link */
    linkText: PropTypes.string,
    /** Localized text to be updated based on location/language */
    localizedText: CustomPropTypes.i18n({
        /** Value for aria-label on the close <button> element */
        close: PropTypes.string
    }),
    /** Set to **true** to disable the state icon */
    noGlyph: PropTypes.bool,
    /** Sets the variation of the component. Primarily used for styling:
    'warning',
    'error',
    'success',
    'information'*/
    type: PropTypes.oneOf(MESSAGESTRIP_TYPES),
    /** Callback function passing event when close button is clicked */
    onCloseClicked: PropTypes.func
};

MessageStrip.defaultProps = {
    localizedText: {
        close: 'Close'
    },
    onCloseClicked: () => { }
};

export default MessageStrip;
