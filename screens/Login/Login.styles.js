import React from 'react';
import styled from "styled-components/native";
import { colors } from "../../styles/colors.styles";

const StyledInput = styled.TextInput`
    background-color: ${colors.white};
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    height: auto;
`;

const ButtonContainer = styled.TouchableOpacity`
    border-radius:7px;
    margin-top: 10px;
    width: 350px;
    height: auto;
    padding: 10px;
    border: 2px darkorange ;
    background-color: ${props => props.bgColor};
`;

const ButtonText = styled.Text`
    font-weight:bold;
    font-size: 15px;
    color: ${props => props.color} ;
    text-align: center;
`;

const PressableButton = ({ onPress, bgColor, title, color }) => (
    <ButtonContainer onPress={onPress} bgColor={bgColor}>
        <ButtonText color={color}>{title}</ButtonText>
    </ButtonContainer>
);

const LogoImage = styled.Image`
  width: 200px;
  height: 50px;
  align-self: center;
  bottom: 3%;
  resizeMode: stretch;
`;

export {
    StyledInput,
    ButtonContainer,
    ButtonText,
    PressableButton,
    LogoImage
}