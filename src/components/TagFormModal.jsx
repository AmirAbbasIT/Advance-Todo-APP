import React, { useState } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from "uuid";

const TagFormModal = ({ id, toggleModal, addTag }) => {
    const ModalWrapper = styled.div`
    width:100%;
    height:100%;
    position:absolute;
    z-index:1000;
    background-color:rgba(0,0,0,0.9);
   `
    const ModalBody = styled.div`
    width:100%;
    height:100%;
    position:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    margin:top:200px;
   `
    const ModalInput = styled.input`
    align-self:center
    width:70%;
   padding:20px;
   color:white;
   background-color:rgba(0,0,0,0);
   margin-top: 200px;
   border: none;
   border-bottom: 3px solid white;
   width: 300px;
   `
    const ModalButton = styled.button`
    padding 18px 40px;
    font-size:22px;
    font-weght:400;
    color:white;
    background: rgb(199,1,98);
    background: linear-gradient(90deg, rgba(199,1,98,1) 18%, rgba(36,0,27,1) 100%, rgba(0,212,255,1) 100%);
    border:none;
    border-bottom:2px solid;
    `
    const handleSubmit = () => {
        addTag(id, tag);
        toggleModal();

    }

    const [tag, setTag] = useState("")
    return (
        <ModalWrapper >
            <ModalBody>
                <ModalInput key={uuid()} autoFocus value={tag} onChange={e => { setTag(e.target.value) }} placeholder="please add a tag" type="text" />
                <ModalButton onClick={handleSubmit}>Add Tag</ModalButton>
            </ModalBody>
        </ModalWrapper>
    )
}

export default TagFormModal
