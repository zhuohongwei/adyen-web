import UIElement from '../UIElement';
import fetchJSONData from '../../utils/fetch-json-data';

/**
 * ThreeDS2DeviceFingerprint, onComplete, calls a new, internal, endpoint which behaves like the /details endpoint but doesn't require the same credentials
 */
export default function callSubmit3DS2Fingerprint(state) {
    fetchJSONData(
        {
            path: `v1/submitThreeDS2Fingerprint?token=${this.props.clientKey}`,
            loadingContext: this.props.loadingContext,
            method: 'POST',
            contentType: 'application/json'
        },
        {
            fingerprintResult: state.data.details[this.props.dataKey],
            clientKey: this.props.clientKey,
            paymentData: state.data.paymentData
        }
    ).then(data => {
        // elementRef exists when the fingerprint component is created from the Dropin
        const actionHandler = this.props.elementRef ?? this;

        /**
         * Frictionless (no challenge) flow
         */
        if (data.action?.type === 'authenticationFinished') {
            const detailsObj = {
                data: {
                    // Sending no details property should work - BUT currently doesn't in the new flow
                    details: { 'threeds2.challengeResult': btoa('{"transStatus":"Y"}') },
                    paymentData: data.action.paymentData,
                    threeDSAuthenticationOnly: false
                }
            };

            return UIElement.prototype.onComplete.call(this, detailsObj);
        }

        /**
         * Challenge flow
         */
        if (data.action?.type === 'threeDS2') {
            return actionHandler.handleAction(data.action);
        }

        /**
         * Redirect (usecase: we thought we could do 3DS2 but it turns out we can't)
         */
        if (data.action?.type === 'redirect') {
            data.action.paymentMethodType = 'scheme';
            return actionHandler.handleAction(data.action);
        }
    });
}