import React from 'react';

import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';


interface SquareButtonProps extends ButtonProps {
    width: number;
}


const SquareButton: React.FC<SquareButtonProps> = ({ style, ...props }) => {
    const buttonStyle: React.CSSProperties = {
        width: props.width,
        height: props.width,
        lineHeight: `${props.width}px`,
        textAlign: 'center',
        padding: 0,
        ...style,
    };

    return <Button style={buttonStyle} {...props} />;
};

export default SquareButton;