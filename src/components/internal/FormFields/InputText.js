import { h } from 'preact';
import InputBase from './InputBase';

function InputText(props) {
    return <InputBase classNameModifiers={['large']} {...props} type="text" />;
}

export default InputText;
