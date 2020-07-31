import { h } from 'preact';
import InputBase from './InputBase';

function InputTelephone(props) {
    return <InputBase {...props} type="tel" />;
}

export default InputTelephone;
