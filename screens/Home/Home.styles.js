import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../styles/colors.styles";
import React from 'react';

let width = (Dimensions.get('window').width - 20);

const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

const TaskList = styled.FlatList`
    flex: 1;
`;

const Card = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: ${Math.round(width)}px;
    height: 80px;
    border-radius: 15px;
    background-color: ${colors.white} ;
    padding: 0;
    margin: 5px;
    box-shadow: 1px 1px 2px #cfcfcf;
    text-align: center;
`;


const TaskStatusButton = styled.TouchableOpacity`
    flex: 1;
    align-items: baseline; 
    margin-left: 10px;
`;

const DeleteButton = styled.TouchableOpacity`
    flex: 1;
    align-items: baseline; 
    margin-right: 10px;
`;

const Task = styled.Text`
    flex: 10;
    font-size: 17px;
    color: ${colors.black};
    padding: 20px ;
`;


const AddButtonContainer = styled.KeyboardAvoidingView`
    background-color: transparent;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const AddButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
`;


const Input = styled.TextInput`
    background-color: ${colors.white};
    flex: 5;
    padding: 5px;
    margin: 10px;

    width: 100%;
        box-shadow: 1px 3px 5px #cfcfcf;

    background-color: ${colors.white};
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    height: auto;
    
  `;

const SearchInput = styled.TextInput`
  border: 1.5px orange;
  margin: 15px;
  padding: 3px;
  border-radius: 50px;
  align-items: flex-start;
  width: 80%;
  background-color: ${colors.background};
`;
const LabelText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${colors.black};
  /* border: solid 1px; */
  border-radius: 10px;
  padding: 3%;
  margin-bottom: 8%;
`;


const LabelNotFound = styled.Text`
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: ${colors.black};
  padding:5px;
`;


const Label = styled.Text`
  text-align: center;
  font-size: 20px;
  color: ${colors.white};
`;

const ButtonContainer = styled.TouchableOpacity`
        width: 32px;
        height: 32px;
        position: absolute;
        top: 2.5%;
        right: 15px;
        border-radius: 50px;
        color: white;
        font-size: 25px;
        background-color: orange;
        
`;
const ButtonDelete = styled.TouchableOpacity`
 
flex:1;
align-items: center;
    /* margin-right: 10px; */
`;
const ButtonSucces = styled.TouchableOpacity`
        margin-top: 7%;
        position: absolute;
        left: 1%;
        font-size: 25px; 
`;
const CenteredView = styled.View`
        flex: 1;
        justify-content:center;
        align-items: center;
`;

const ModalView = styled.View`
        /* width: 370;
        height: 60%;
        max-width: 370;
        margin: 15px;
        background-color: white;
        border-radius: 20;
        padding: 30px;
        box-shadow: 10px 5px 5px black; */

         margin: 20px;
    background-color: ${colors.white};
    box-shadow: 1px 2px 15px #a3a3a3;
        border-radius: 15px;
    padding: 35px;
    align-items: center;
    max-height: 55%
`;

const ViewClose = styled.View`
        padding: 10%;
        align-items: center;
`;

const ScrollView = styled.ScrollView.attrs({
    contentContainerStyle: props => {
        return {
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
})``

const PressiableButton = styled.Pressable`
            background-color: ${colors.primary};
    border-radius: 10px;
    align-items: center;
    padding: 10px;
`;

const TextView = styled.Text`
       flex: 5;
    align-items: center;
    font-size: 17px;
    color: ${colors.black};
    padding:10px;
    margin-left: 10px;
`;

const TextStyle = styled.Text`
         color: black;
        font-weight: bold;
        text-align: center;
`;

const ButtonEliminar = styled.View`
        width: 30%;
        position: absolute;
        right: 5%;
`;
const ButtonSuccess = styled.View`
        width: 30%;
        position: absolute;
        left: 5%;
`;


export {
    Container, TaskList, Card, Task,
    TaskStatusButton, DeleteButton, AddButtonContainer,
    AddButton, Input, Label, SearchInput, ButtonContainer, ButtonDelete,
    LabelText, ViewClose, CenteredView, ModalView,
    ScrollView, PressiableButton, ButtonEliminar,
    TextView, TextStyle, ButtonSucces, ButtonSuccess, LabelNotFound
}