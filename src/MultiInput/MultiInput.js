import Button from '../Button/Button';
import Checkbox from '../Forms/Checkbox';
import classnames from 'classnames';
import { FORM_MESSAGE_TYPES } from '../utils/constants';
import FormInput from '../Forms/FormInput';
import FormMessage from '../Forms/_FormMessage';
import InputGroup from '../InputGroup/InputGroup';
import List from '../List/List';
import Popover from '../Popover/Popover';
import PropTypes from 'prop-types';
import shortid from '../utils/shortId';
import Token from '../Token/Token';
import React, { Component } from 'react';
import 'fundamental-styles/dist/tokenizer.css';

/** A **MultiInput** allows users to enter multiple values which are displayed as a tokens. It provides an editable input field for filtering the list,
 * and a dropdown menu with a list of the available options.
 * If the entries are not validated by the application, users can also enter custom values. */

class MultiInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bShowList: false,
            tags: []
        };
    }

    // create tags to display in dropdown list
    createTagList = data => {
        return data.map((item, index) => (
            <List.Item key={index}>
                <Checkbox
                    checked={this.isChecked(item)}
                    className='fd-list__input'
                    compact={this.props.compact}
                    id={index + `_${shortid.generate()}`}
                    labelClasses='fd-list__label'
                    onChange={() => this.updateSelectedTags(item)}
                    value={item}>
                    <List.Text>{item}</List.Text>
                </Checkbox>
            </List.Item>
        ));
    };

    // create tag elements to display below input box
    createTags = () => {
        return this.state.tags.map((tag, index) => {
            if (index < 3) {
                return (
                    <Token
                        key={index}
                        onClick={() => this.removeTag(tag)}>
                        {tag}
                    </Token>
                );
            } else if (index >= this.state.tags.length - 1) {
                return (
                    <span className='fd-tokenizer__indicator'>{this.state.tags.length - 3} more</span>
                );
            } else {
                return null;
            }
        });
    };

    // add/remove tag to tag collection
    updateSelectedTags = (tag) => {

        if (this.state.tags.indexOf(tag) === -1) {
            this.setState(
                prevState => {
                    const tags = prevState.tags;
                    tags.push(tag);

                    return { tags: tags };
                },
                () => this.props.onTagsUpdate(this.state.tags)
            );
        } else {
            this.setState(
                prevState => {
                    let tags = prevState.tags.filter(item => {
                        return item.toLowerCase() !== tag.toLowerCase();
                    });

                    return { tags: tags };
                },
                () => this.props.onTagsUpdate(this.state.tags)
            );
        }
    };

    // check to see if tag is should be checked in list
    isChecked = tag => {
        if (this.state.tags.indexOf(tag) === -1) {
            return false;
        } else {
            return true;
        }
    };

    // remove/close tag
    removeTag = (tag) => {
        this.setState(
            prevState => {
                const tags = prevState.tags.filter(item => {
                    return item.toLowerCase() !== tag.toLowerCase();
                });

                return { tags: tags };
            },
            () => this.props.onTagsUpdate(this.state.tags)
        );
    };

    // show/hide tag list drop down
    showHideTagList = () => {
        this.setState(prevState => {
            return { bShowList: !prevState.bShowList };
        });
    };

    handleClickOutside = () => {
        this.setState({ bShowList: false });
    }

    render() {
        const {
            popoverProps,
            buttonProps,
            compact,
            className,
            disabled,
            data,
            listProps,
            inputProps,
            onTagsUpdate,
            placeholder,
            tagProps,
            validationState,
            ...rest
        } = this.props;


        const tokenizerClassName = classnames(
            'fd-tokenizer',
            {
                'fd-tokenizer--compact': compact
            }
        );

        const listClassName = classnames(
            'fd-list--dropdown',
            'fd-list--multi-input',
            {
                'fd-list--has-message': validationState?.state
            }
        );

        const inputGroupClasses = classnames(
            'fd-input-group--control',
            {
                'is-disabled': disabled,
                [`is-${validationState?.state}`]: validationState?.state
            }
        );

        const popoverBody = (
            <List
                className={listClassName}
                compact={compact}
                {...listProps}>
                {this.createTagList(data)}
            </List>
        );

        return (
            <Popover
                {...popoverProps}
                body={
                    (<>
                        {validationState &&
                        <FormMessage
                            type={validationState.state}>
                            {validationState.text}
                        </FormMessage>
                        }
                        {popoverBody}
                    </>)}
                control={
                    <InputGroup
                        {...rest}
                        aria-expanded={this.state.bShowList}
                        aria-haspopup='true'
                        className={inputGroupClasses}
                        compact={compact}
                        disabled={disabled}
                        onClick={this.showHideTagList}
                        validationState={!this.state.bShowList ? validationState : null}>
                        <div {...tagProps} className={tokenizerClassName}>
                            <div className='fd-tokenizer__inner'>
                                {this.state.tags.length > 0 && this.createTags()}
                                <FormInput
                                    {...inputProps}
                                    className='fd-input-group__input fd-tokenizer__input'
                                    compact={compact}
                                    placeholder={placeholder} />
                            </div>
                        </div>
                        <InputGroup.Addon isButton>
                            <Button
                                {...buttonProps}
                                glyph='value-help'
                                option='transparent' />
                        </InputGroup.Addon>
                    </InputGroup>
                }
                disabled={disabled}
                noArrow
                onClickOutside={this.handleClickOutside}
                widthSizingType='matchTarget' />
        );
    }
}

MultiInput.displayName = 'MultiInput';

MultiInput.propTypes = {
    /** Collection of items to display in the list */
    data: PropTypes.array.isRequired,
    /** Additional props to be spread to the `<button>` element */
    buttonProps: PropTypes.object,
    /** CSS class(es) to add to the element */
    className: PropTypes.string,
    /** Set to **true** to enable compact mode */
    compact: PropTypes.bool,
    /** Set to **true** to mark component as disabled and make it non-interactive */
    disabled: PropTypes.bool,
    /** Additional props to be spread to the `<input>` element */
    inputProps: PropTypes.object,
    /** Additional props to be spread to the `<ul>` element */
    listProps: PropTypes.object,
    /** Localized placeholder text of the input */
    placeholder: PropTypes.string,
    /** Additional props to be spread to the Popover component */
    popoverProps: PropTypes.object,
    /** Additional props to be spread to the tags `<div>` element */
    tagProps: PropTypes.object,
    /** An object identifying a validation message.  The object will include properties for `state` and `text`; _e.g._, \`{ state: \'warning\', text: \'This is your last warning\' }\` */
    validationState: PropTypes.shape({
        /** State of validation: 'error', 'warning', 'information', 'success' */
        state: PropTypes.oneOf(FORM_MESSAGE_TYPES),
        /** Text of the validation message */
        text: PropTypes.string
    }),
    /** Callback function when a tag is added or removed. Returns array of tags selected */
    onTagsUpdate: PropTypes.func
};

MultiInput.defaultProps = {
    onTagsUpdate: () => {}
};

export default MultiInput;
