/* eslint-disable react/no-multi-comp */
import Button from '../../Button/Button';
import FormInput from '../../Forms/FormInput';
import FormTextarea from '../../Forms/FormTextarea';
import Icon from '../../Icon/Icon';
import InputGroup from '../InputGroup';
import InputGroupAddon from '../_InputGroupAddon';
import React from 'react';
import {
    boolean,
    select
} from '@storybook/addon-knobs';


export default {
    title: 'Component API/InputGroup',
    component: InputGroup,
    subcomponents: InputGroupAddon
};


export const primary = () => (
    <InputGroup>
        <InputGroup.Addon isButton>
            <Button
                glyph='navigation-down-arrow'
                option='transparent' />
        </InputGroup.Addon>
        <FormInput />
    </InputGroup>
);

export const compact = () => (
    <InputGroup compact>
        <InputGroup.Addon isButton>
            <Button
                glyph='navigation-down-arrow'
                option='transparent' />
        </InputGroup.Addon>
        <FormInput />
    </InputGroup>
);

export const disabled = () => (
    <InputGroup disabled>
        <InputGroup.Addon isButton>
            <Button
                glyph='navigation-down-arrow'
                option='transparent' />
        </InputGroup.Addon>
        <FormInput />
    </InputGroup>
);

export const validationState = () => (
    <div className='fddocs-container'>
        <InputGroup validationState={{ state: 'error', text: 'Test validation state' }}>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormInput />
        </InputGroup>
        <InputGroup validationState={{ state: 'warning', text: 'Test validation state' }}>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormInput />
        </InputGroup>
        <InputGroup validationState={{ state: 'information', text: 'Test validation state' }}>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormInput />
        </InputGroup>
        <InputGroup validationState={{ state: 'success', text: 'Test validation state' }}>
            <InputGroup.Addon>$</InputGroup.Addon>
            <FormInput />
        </InputGroup>
    </div>
);

/**
 * The **InputGroup.Addon** `isButton` prop supports buttons by providing the correct styling. Buttons can be shown with a text label or icon.
 */

export const addonButton = () => (
    <div className='fddocs-container'>
        <InputGroup>
            <FormInput />
            <InputGroup.Addon isButton>
                <Button
                    glyph='navigation-down-arrow'
                    option='transparent' />
            </InputGroup.Addon>
        </InputGroup>
        <InputGroup>
            <InputGroup.Addon isButton>
                <Button
                    glyph='navigation-down-arrow'
                    option='transparent' />
            </InputGroup.Addon>
            <FormInput />
        </InputGroup>
    </div>
);

addonButton.storyName = 'Button add-on';

/**
 * The Input with text add-on component is typically used to specify the type of the data being entered, such as currency or unit of measure.
This add-on can be placed at the left or right of the input element.
 */

export const addonText = () => (
    <div className='fddocs-container'>
        <InputGroup>
            <InputGroup.Addon>€</InputGroup.Addon>
            <FormInput placeholder='Type text here' />
        </InputGroup>
        <InputGroup>
            <FormInput placeholder='Type text here' />
            <InputGroup.Addon>€</InputGroup.Addon>
        </InputGroup>
    </div>

);

addonText.storyName = 'Text add-on';

/** The consumer can add an **Icon** as a child of **InputGroup.Addon** */

export const addonIcon = () => (
    <div className='fddocs-container'>
        <InputGroup>
            <InputGroup.Addon>
                <Icon glyph='globe' />
            </InputGroup.Addon>
            <FormInput placeholder='Type text here' />
        </InputGroup>
        <InputGroup>
            <FormInput placeholder='Type text here' />
            <InputGroup.Addon>
                <Icon glyph='hide' />
            </InputGroup.Addon>
        </InputGroup>
    </div>
);

addonIcon.storyName = 'Icon add-on';

export const textArea = () => (
    <InputGroup>
        <FormTextarea defaultValue='Default' />
        <InputGroup.Addon>
            <Icon glyph='hide' />
        </InputGroup.Addon>
    </InputGroup>
);

export const dev = () => (
    <InputGroup
        compact={boolean('compact', false)}
        disabled={boolean('disabled', false)}
        validationState={select('Validation State', {
            'none': '',
            'success': { state: 'success', text: 'placeholder text' },
            'error': { state: 'error', text: 'placeholder text' },
            'information': { state: 'information', text: 'placeholder text' },
            'warning': { state: 'warning', text: 'placeholder text' }
        })}>
        <FormInput />
        <InputGroup.Addon isButton>
            <Button
                glyph='navigation-down-arrow'
                option='transparent' />
        </InputGroup.Addon>
    </InputGroup>
);

dev.parameters = { docs: { disable: true } };
