// Modules or libs content
import { FC, useEffect } from 'react';
// Images
import Bold from '../../assets/bold-solid.svg';
import Italic from '../../assets/italic-solid.svg';
import Underline from '../../assets/underline-solid.svg';
// Components
import { Container, Options, Input, Editable } from './styles';

const CustomInput: FC = () => {

    // const [formatState, setFormatState] = useState();

    useEffect(() => {

    }, []);

    return (
        <Container>
            <Options>
                <li onClick={() => {}}>
                    <img src={Bold} alt="Bold" />
                </li>
                <li>
                    <img src={Italic} alt="Italic" />
                </li>
                <li>
                    <img src={Underline} alt="Underline" />
                </li>
            </Options>
            <Input>
                <Editable contentEditable="true" className="editable">
                </Editable>
            </Input>
        </Container>
    );
};

export default CustomInput;
