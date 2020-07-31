import { h } from 'preact';
import cx from 'classnames';
import styles from './ApplePayButton.module.scss';
import './ApplePayButton.scss';

interface ApplePayButtonProps {
    buttonColor: 'black' | 'white' | 'white-with-line';
    buttonType: 'plain' | 'buy' | 'donate' | 'check-out' | 'book' | 'subscribe';
    onClick: (event) => void;
}

function ApplePayButton(props: ApplePayButtonProps) {
    const { buttonColor, buttonType } = props;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
        <div
            className={cx(
                'adyen-checkout__applepay__button',
                `adyen-checkout__applepay__button--${buttonColor}`,
                `adyen-checkout__applepay__button--${buttonType}`,
                [styles['apple-pay-button']],
                [styles[`apple-pay-button-${buttonColor}`]],
                [styles[`apple-pay-button--type-${buttonType}`]]
            )}
            onClick={props.onClick}
        />
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
}

ApplePayButton.defaultProps = {
    onClick: () => {},
    buttonColor: 'black',
    buttonType: 'plain'
};

export default ApplePayButton;
