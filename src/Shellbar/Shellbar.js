import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import classnames from 'classnames';
import Counter from '../Counter/Counter';
import CustomPropTypes from '../utils/CustomPropTypes/CustomPropTypes';
import Icon from '../Icon/Icon';
import Menu from '../Menu/Menu';
import Popover from '../Popover/Popover';
import PropTypes from 'prop-types';
import SearchInput from '../SearchInput/SearchInput';
import React, { Component } from 'react';
import 'fundamental-styles/dist/shellbar.css';
import 'fundamental-styles/dist/product-switch.css';

/** The **Shellbar** offers consistent, responsive navigation across all products and applications. Includes
support for branding, product navigation, search, notifications, user settings, and CoPilot. This is
a composite component comprised of mandatory and optional elements. Before getting started, here are
some things to know. */

class Shellbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsedActions: this.getCollapsedActions(),
            totalNotifications: this.getNotificationsSum(),
            showCollapsedProductSwitchMenu: false
        };
    }

    backBtnHandler = () => {
        this.setState({
            showCollapsedProductSwitchMenu: false
        });
    };

    getCollapsedActions = () => {
        let collapsedList = [];

        //put all the Additional Actions in the list
        if (this.props.actions) {
            collapsedList = [...this.props.actions];
        }

        //Add the notification icon to the notifications object and add it to the list
        //The notifications are placed after the additional actions

        if (this.props.notifications) {
            let collapsedNotifications = this.props.notifications;
            collapsedNotifications.glyph = 'bell';
            collapsedList.push(collapsedNotifications);
        }

        //Add the grid icon to the product switch object and add it to the list
        //The product switch is placed after the notifications

        if (this.props.productSwitch) {
            let collapsedProductSwitch = this.props.productSwitch;

            // eslint-disable-next-line react/prop-types
            collapsedProductSwitch.glyph = 'grid';
            // eslint-disable-next-line react/prop-types
            collapsedProductSwitch.callback = () => {
                this.setState(prevState => ({
                    showCollapsedProductSwitchMenu: !prevState.showCollapsedProductSwitchMenu
                }));
            };

            collapsedList.push(collapsedProductSwitch);
        }

        //Add the search icon to the search input object and add it to the list
        //The search input is placed at the beginning of the list
        if (this.props.searchInput) {
            let collapsedSearchInput = this.props.searchInput;
            collapsedSearchInput.glyph = 'search';
            collapsedList.unshift(collapsedSearchInput);
        }
        return collapsedList;
    };

    getNotificationsSum = () => {
        let additionalActionsSum = 0;
        if (this.props.actions) {
            additionalActionsSum = this.props.actions.reduce((r, d) => r + d.notificationCount, 0);
        }
        if (this.props.notifications) {
            if (this.props.notifications.notificationCount) {
                let totalSum = additionalActionsSum + this.props.notifications.notificationCount;
                return totalSum;
            } else {
                return additionalActionsSum;
            }
        } else {
            return additionalActionsSum;
        }
    };

    render() {
        const {
            localizedText,
            logo,
            logoSAP,
            productTitle,
            productMenu,
            subtitle,
            copilot,
            searchInput,
            actions,
            notifications,
            productSwitch,
            productSwitchList,
            profile,
            profileMenu,
            className,
            backAction
        } = this.props;

        const shellbarClasses = classnames(
            'fd-shellbar',
            className
        );

        return (
            <div className={shellbarClasses}>
                <div className='fd-shellbar__group fd-shellbar__group--product'>
                    {backAction && <Button
                        aria-label={localizedText.backButtonLabel}
                        className='fd-shellbar__button'
                        glyph='nav-back'
                        onClick={backAction}
                        option='transparent' />
                    }
                    {logo && <span className='fd-shellbar__logo'>{logo}</span>}
                    {logoSAP && (
                        <span className='fd-shellbar__logo'>
                            <img alt='SAP' src='//unpkg.com/fundamental-styles/dist/images/sap-logo.png' />
                        </span>
                    )}
                    {productTitle && !productMenu && <span className='fd-shellbar__title'>{productTitle}</span>}
                    {productMenu && (
                        <div className='fd-product-menu'>
                            <Popover
                                body={
                                    productMenu && (
                                        <Menu>
                                            <Menu.List>
                                                {productMenu.map((item, index) => {
                                                    return (
                                                        <Menu.Item
                                                            key={index}
                                                            link={item.link}
                                                            onClick={item.callback}
                                                            url={item.url} >
                                                            {item.glyph && (
                                                                <>
                                                                    <Icon glyph={item.glyph} size={item.size} />
                                                                        &nbsp;&nbsp;&nbsp;
                                                                </>
                                                            )}
                                                            {item.name}
                                                        </Menu.Item>
                                                    );
                                                })}
                                            </Menu.List>
                                        </Menu>
                                    )
                                }
                                control={
                                    <Button
                                        className='fd-shellbar__button--menu fd-button--menu'
                                        option='transparent'>
                                        <span className='fd-shellbar__title'>
                                            {productTitle}
                                        </span>
                                    </Button>
                                }
                                noArrow
                                popperProps={{ id: 'fd-shellbar-product-popover' }} />
                        </div>
                    )}
                    {subtitle && <div className='fd-shellbar__subtitle'>{subtitle}</div>}
                </div>
                {copilot ? (
                    <div className='fd-shellbar__group fd-shellbar__group--copilot'>
                        <img
                            alt='CoPilot'
                            height='30'
                            src='//unpkg.com/fundamental-styles/dist/images/copilot.png'
                            width='30' />
                    </div>
                ) : null}
                <div className='fd-shellbar__group fd-shellbar__group--actions'>
                    {searchInput && (
                        <div className='fd-shellbar__action fd-shellbar__action--desktop'>
                            <SearchInput
                                className='fd-shellbar__input-group'
                                inShellbar
                                inputGroupAddonProps={{ className: 'fd-shellbar__input-group__addon' }}
                                inputGroupProps={{ className: 'fd-shellbar__input-group' }}
                                inputProps={{ className: 'fd-shellbar__input-group__input' }}
                                onEnter={searchInput.onSearch}
                                placeholder={searchInput.placeholder}
                                popoverProps={{
                                    placement: searchInput?.popoverProps?.placement || 'bottom',
                                    disableEdgeDetection: searchInput?.popoverProps?.disableEdgeDetection || true,
                                    ...searchInput.popoverProps
                                }}
                                searchBtnProps={{ className: 'fd-shellbar__button' }}
                                searchList={searchInput.searchList} />
                        </div>
                    )}
                    {actions &&
                            actions.map((action, index) => {
                                return (
                                    <div className='fd-shellbar__action fd-shellbar__action--desktop' key={index}>
                                        {action.menu ? (
                                            <Popover
                                                body={action.menu}
                                                control={
                                                    <Button
                                                        aria-label={action.label}
                                                        className='fd-shellbar__button'
                                                        glyph={action.glyph}>
                                                        {action.notificationCount > 0 && (
                                                            <Counter
                                                                aria-label={localizedText.counterLabel}
                                                                className='fd-shellbar__counter--notification'
                                                                notification>
                                                                {action.notificationCount}
                                                            </Counter>
                                                        )}
                                                    </Button>
                                                }
                                                placement='bottom-end'
                                                popperProps={{ id: `fd-shellbar-actions-popover-${index}` }} />
                                        ) : (
                                            <Button
                                                aria-label={action.label}
                                                className='fd-shellbar__button'
                                                glyph={action.glyph}
                                                key={index}
                                                onClick={action.callback} >
                                                {action.notificationCount > 0 && (
                                                    <Counter
                                                        aria-label={localizedText.counterLabel}
                                                        notification>
                                                        {action.notificationCount}
                                                    </Counter>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}
                    {notifications && (
                        (notifications.notificationsBody || notifications.noNotificationsBody) ? (
                            <Popover
                                body={
                                    ((notifications.notificationCount > 0) && notifications.notificationsBody) ||
                                        ((notifications.notificationCount <= 0) && notifications.noNotificationsBody)
                                }
                                control={
                                    <div className='fd-shellbar__action fd-shellbar__action--desktop'>
                                        <Button
                                            aria-label={localizedText.notificationsButton}
                                            className='fd-shellbar__button'
                                            glyph='bell'>
                                            {notifications.notificationCount > 0 && (
                                                <Counter
                                                    aria-label={localizedText.counterLabel}
                                                    notification>
                                                    {notifications.notificationCount}
                                                </Counter>
                                            )}
                                        </Button>
                                    </div>
                                }
                                placement='bottom-end'
                                popperProps={{ id: 'fd-shellbar-notifications-popover' }} />
                        ) : (
                            <div className='fd-shellbar__action fd-shellbar__action--desktop'>
                                <Button
                                    aria-label={localizedText.notificationsButton}
                                    className='fd-shellbar__button'
                                    glyph='bell'
                                    onClick={notifications.callback}>
                                    {notifications.notificationCount > 0 && (
                                        <Counter
                                            aria-label={localizedText.counterLabel}
                                            notification>
                                            {notifications.notificationCount}
                                        </Counter>
                                    )}
                                </Button>
                            </div>
                        )
                    )}
                    {
                        (actions || searchInput || notifications) && <div className='fd-shellbar__action fd-shellbar__action--mobile'>
                            <Popover
                                body={
                                    <Menu>
                                        {!this.state.showCollapsedProductSwitchMenu ? (
                                            <Menu.List>
                                                {this.state.collapsedActions.map((item, index) => {
                                                    return (
                                                        <Menu.Item
                                                            key={index}
                                                            link={item.link}
                                                            onClick={item.callback}
                                                            url={item.url} >
                                                            <Icon glyph={item.glyph}>
                                                                {item.notificationCount > 0 && <Counter notification>{item.notificationCount}</Counter>}
                                                            </Icon> {item.label}
                                                        </Menu.Item>
                                                    );
                                                })}
                                            </Menu.List>
                                        ) : (
                                            <Menu.List>
                                                <Menu.Item>
                                                    <span
                                                        className='fd-menu sap-icon--nav-back'
                                                        onClick={this.backBtnHandler} />
                                                </Menu.Item>
                                                {productSwitchList.map((item, index) => {
                                                    return (
                                                        <Menu.Item
                                                            key={index}
                                                            link={item.link}
                                                            onClick={item.callback}
                                                            url={item.url} >
                                                            <Icon glyph={item.glyph} /> {item.title}
                                                        </Menu.Item>
                                                    );
                                                })}
                                            </Menu.List>
                                        )}
                                    </Menu>
                                }
                                control={
                                    <div className='fd-shellbar-collapse--control' role='button'>
                                        <Button className='fd-shellbar__button'
                                            glyph='overflow'>
                                            <Counter
                                                aria-label={localizedText.counterLabel}
                                                notification> {this.state.totalNotifications > 0 && this.state.totalNotifications} </Counter>
                                        </Button>
                                    </div>
                                }
                                placement='bottom-end'
                                popperProps={{ id: 'fd-shellbar-mobile-action-popover' }} />
                        </div>
                    }
                    {profile && (
                        <div className='fd-shellbar__action fd-shellbar__action--show-always'>
                            <div className='fd-user-menu'>
                                <Popover
                                    body={
                                        profileMenu && (
                                            <Menu>
                                                <Menu.List>
                                                    <Menu.Item>{profile.userName}</Menu.Item>
                                                    {profileMenu.map((item, index) => {
                                                        return (
                                                            <Menu.Item
                                                                key={index}
                                                                link={item.link}
                                                                onClick={item.callback}
                                                                url={item.url} >
                                                                {item.glyph && (
                                                                    <React.Fragment>
                                                                        <Icon
                                                                            glyph={item.glyph}
                                                                            size={item.size} />
                                                                            &nbsp;&nbsp;&nbsp;
                                                                    </React.Fragment>
                                                                )}
                                                                {item.name}
                                                            </Menu.Item>
                                                        );
                                                    })}
                                                </Menu.List>
                                            </Menu>
                                        )
                                    }
                                    control={
                                        <div className='fd-button fd-shellbar__button fd-user-menu__control'>
                                            {profile.image ? (
                                                <Avatar
                                                    backgroundImageUrl={profile.image}
                                                    circle
                                                    size='xs' />
                                            ) : (
                                                <Avatar circle
                                                    color={profile.colorAccent}
                                                    size='xs'>
                                                    {profile.initials}
                                                </Avatar>
                                            )}
                                        </div>
                                    }
                                    noArrow
                                    placement='bottom-end'
                                    popperProps={{ id: 'fd-shellbar-profile-popover' }} />
                            </div>
                        </div>
                    )}
                    {productSwitch && (
                        <div className='fd-shellbar__action fd-shellbar__action--desktop'>
                            <div className='fd-product-switch'>
                                <Popover
                                    body={
                                        <div className='fd-product-switch__body'>
                                            <ul className='fd-product-switch__list'>
                                                {productSwitchList.map((item, index) => {
                                                    return (
                                                        <li
                                                            className='fd-product-switch__item'
                                                            key={index}
                                                            onClick={item.callback}>
                                                            <div className={`fd-product-switch__icon sap-icon--${item.glyph}`} />
                                                            <div className='fd-product-switch__text'>
                                                                <div className='fd-product-switch__title'>
                                                                    {item.title}
                                                                </div>
                                                                {item.subtitle &&
                                                                    <div className='fd-product-switch__subtitle'>
                                                                        {item.subtitle}
                                                                    </div>
                                                                }
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    }
                                    control={<Button
                                        aria-label={productSwitch.label}
                                        className='fd-product-switch__control fd-shellbar__button'
                                        glyph='grid' />}
                                    disableEdgeDetection
                                    placement='bottom-end'
                                    popperProps={{ id: 'fd-shellbar-product-switch-popover' }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Shellbar.displayName = 'Shellbar';

Shellbar.propTypes = {
    /** Holds all product actions and links */
    actions: PropTypes.array,
    /** Adds back icon to shellbar and performs the provided action */
    backAction: PropTypes.func,
    /** CSS class(es) to add to the element */
    className: PropTypes.string,
    /** For use with applications that utilize CoPilot */
    copilot: PropTypes.bool,
    /** Localized text to be updated based on location/language */
    localizedText: CustomPropTypes.i18n({
        /** Aria-label for back <button> */
        backButtonLabel: PropTypes.string,
        /** Aria-label for <span> element within the <button> element */
        counterLabel: PropTypes.string,
        /** Aria-label for <button> element */
        notificationsButton: PropTypes.string
    }),
    /** Provide an img tag for a logo other than the SAP logo.
     * One of the two props (`logo` or `logoSAP`) should be set */
    logo: PropTypes.object,
    /** Renders the SAP logo in the Shellbar. One of the two props (`logo` or `logoSAP`) should be set */
    logoSAP: PropTypes.bool,
    /** Information about pending notifications */
    notifications: PropTypes.object,
    /** Holds product titles and navigation */
    productMenu: PropTypes.array,
    /** For navigating between products. An object that contains an accessible and localized label for product switch button. */
    productSwitch: PropTypes.shape({
        /** Accessible and localized label for product switch button */
        label: PropTypes.string.isRequired
    }),
    /** Array of objects containing data about the products.
     * Callback, title, and glyph are required; subtitle is optional. */
    productSwitchList: PropTypes.arrayOf(
        PropTypes.shape({
            callback: PropTypes.func.isRequired,
            /** Localized text for the heading */
            title: PropTypes.string.isRequired,
            /** The icon to include. See the icon page for the list of icons */
            glyph: PropTypes.string.isRequired,
            subtitle: PropTypes.string
        })
    ),
    /** Displays the current application when no product menu is used */
    productTitle: PropTypes.string,
    /** User information (_e.g._ name, initials, etc.) */
    profile: PropTypes.object,
    /** List of items for the profile menu */
    profileMenu: PropTypes.array,
    /** Holds `searchInput` [properties](?id=component-api-searchinput--compact&viewMode=docs#properties) */
    searchInput: PropTypes.object,
    /** Displays an application context. Should be used rarely */
    subtitle: PropTypes.string
};

Shellbar.defaultProps = {
    localizedText: {
        backButtonLabel: 'Back button',
        counterLabel: 'Unread count',
        notificationsButton: 'Notifications'
    }
};

export default Shellbar;
