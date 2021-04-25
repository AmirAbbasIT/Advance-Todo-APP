import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { Trash, Tag } from 'react-feather'
import styled from 'styled-components'




function CompletedItem({ item, onDelete, setAnimate, handleAddTag, deleteTag }) {
  const [state, setState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate();
    }, 300)
  }, [setAnimate])

  const handleDelete = () => {
    setState(true)
    setTimeout(() => {
      onDelete()
    }, 150)

  }

  const Button = styled.button`
margin:5px;
border: none;
background:white; 
cursor: pointer;
padding:10px;
border 1px solid gray;
border-radius:50%;
transition:all 0.2s ease-in;
&:hover{
    background-color:#a62b56;
    color:white;
}
&:focus{
    border-radius:50%;
}
`

  const ListItem = styled.li`
display: flex;
justify-content:space-between;
align-items:center;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
padding: 0.5rem 1rem;
width:50%;

background-color: white;
border-radius:2px;
font-fize:18px;
font-weight:500;
`
  const Section = styled.section`
display:flex;
flex-direction:row;
align-items:space-between;
justify-content:space-between;
padding-top: 15px;
`
  const TagSec = styled.span`
padding:3px 25px;
color:white;
font-size:16px;
background: rgb(199,1,98);
background: linear-gradient(90deg, rgba(199,1,98,1) 0%, rgba(0,212,255,1) 0%, rgba(6,97,131,1) 100%);
margin: 2px;
border-radius:16px;
transition:1s all ease-in;
cursor:pointer;
&:hover{
    background: rgb(199,1,98);
    background: linear-gradient(90deg, rgba(199,1,98,1) 0%, rgba(255,0,39,1) 100%, rgba(6,97,131,1) 100%);
}
`
  const WrapperDiv = styled.div`
    padding: 0.3rem 1rem;
    background-color:white;
    width:50%;
    border-bottom:4px solid #2a9184;
    margin-bottom:5px;
    text-align:justify;
   `
  return (
    <>
      <ListItem className={`${item.animate ? "fade-in" : ""} ${state ? "fade-out" : ""}`}>
        <Section>
          <span>
            {item.name}
          </span>
        </Section>
        <div>
          <Button onClick={() => handleAddTag(item.id)}> <Tag size={15} /></Button>
          <Button onClick={handleDelete}> <Trash size={15} /></Button>
        </div>
      </ListItem>
      <WrapperDiv className={`${item.animate ? "fade-in" : ""} ${state ? "fade-out" : ""}`} >
        {item?.tags?.map(tag => (<TagSec onClick={() => deleteTag(item.id, tag)} >{tag}</TagSec>))}
      </WrapperDiv>
    </>
  )
}

export default styled(observer(CompletedItem))`
padding:1rem
`