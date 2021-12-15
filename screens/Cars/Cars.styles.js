import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../styles/colors.styles";

let width = (Dimensions.get('window').width - 20);

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

const CarList = styled.FlatList`
    flex: 1;
    margin-top: 5px;
`;

const Card = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: ${Math.round(width)}px;
    height: 100px;
    border-radius: 15px;
    background-color: ${colors.white} ;
    padding: 0;
    margin: 5px;
    box-shadow: 1px 1px 2px #cfcfcf;
    text-align: center;
`;

const CardColorPicker = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* width: ${Math.round(width)}px; */
    height: 150px;
    border-radius: 15px;
    background-color: ${colors.white} ;
    padding: 0;
    margin: 5px;
    margin-top: 10px;
    /* box-shadow: 1px 1px 2px #cfcfcf; */
    text-align: center;
`;


const InfoButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center; 
    /* margin-right: 10px; */
`;

const Image = styled.Image`
    width: 70px;
    height: 70px;
    margin: 20px;
    borderRadius: 10px;
`;

const Car = styled.Text`
    flex: 3;
    align-items: center;
    font-size: 17px;
    color: ${colors.black};
    padding:10px;
`;

const AddButtonContainer = styled.KeyboardAvoidingView`
    background-color: transparent;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
`;

const AddButton = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-end;
    padding: 20px;
`;

const Label = styled.Text`
  align-items: center;
  font-size: 14px;
  color: ${colors.black};
  padding:5px;
`;

const LabelNotFound = styled.Text`
    align-items: center;
    font-size: 17px;
    color: ${colors.black};
    margin-left: 10px;
`;

const LabelClose = styled.Text`
 color: black;
font-weight: bold;
text-align: center
`;

;

const LabelColor = styled.Text`
  align-items: center;
  font-size: 14px;
  color: #c7c7c7;
  padding:5px;
`;

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    box-shadow: 1px 2px 15px #a3a3a3;

`;

const ModalView = styled.View`
    margin: 20px;
    background-color: ${colors.white};
    box-shadow: 1px 2px 15px #a3a3a3;
    border-radius: 15px;
    padding: 35px;
    align-items: center;
    max-height: 65%
`;

const CloseButton = styled.Pressable`
    background-color: ${colors.primary};
    border-radius: 10px;
    align-items: center;
    padding: 10px;
    margin: 10px;
`;

const ModalText = styled.Text`
     font-size: 17px;
    color: ${colors.black};
    padding:10px;
`;

const DrawerText = styled.Text`
    font-size: 18px;
    margin: 20px;
`
const DrawerButton = styled.TouchableOpacity`
    flex: 1;
    align-content: center;
`

export { LabelNotFound, LabelClose, DrawerButton, DrawerText, LabelColor, CardColorPicker, ModalText, CloseButton, Container, CarList, Card, Car, InfoButton, AddButtonContainer, AddButton, Label, Image, ModalContainer, ModalView }