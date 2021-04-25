import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { createTodoStore } from '../store/TodoStore';
import CompletedItem from './CompletedItem';
import InProgressItem from './InProgressItem';
import TagFormModal from './TagFormModal';
import TodoListItem from './TodoListItem';
import { Plus } from 'react-feather';
import { useRef } from 'react';

function TodoList({ className }) {
    const [store] = useState(createTodoStore);


    const Wrapper = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    min-width:900px;
    min-height:90vh;
    background-color:#dbdbdb;
    font-family: Roboto, sans-serif;
   `
    const InnerWrapper = styled.div`
    text-align:center;
    width:100%;
   `
    const Header = styled.header`
    text-align:center;
    width:100%;
    color:tomato;
    font-size:30px;
    font-weight:500;

   `
    const Header2 = styled.header`
    text-align:center;
    color:white;
    font-weight:500;
    margin:0px;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(207,41,75,1) 0%, rgba(136,11,11,1) 3%, rgba(204,125,41,1) 100%, rgba(255,0,168,1) 100%);
    min-width: 150px;
    font-size: 18px;
    border-bottom: 2px solid gray;
    border-radius:2px;
    display:absolute;
    align-self: baseline;
    margin: 5px;
    left: 20px;
    padding:5px 0px;
    margin-left: 400px;
    padding-right:20px;
    padding-left:5px;
    margin-top:20px;
   `

    const Ul = styled.ul`
    list-style:none;
    width:100%;
    margin:auto;
    display: contents;
   `
    const Section = styled.section`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin: 30px auto;
   
   `
    const Button = styled.section`
    padding:10px;
    margin-top:5px;
    background:rgba(0,0,0,0);
    color:black;
    width:150px;
    border-radius:3px;
    border: 3px solid #ab7b03;
    transition: all 0.2s ease-in;
    cursor:pointer;
;    &:hover{
        border-color:#b90000;
        background-color:#b90000;
        color:white;
    }
   `
    const FormButton = styled.li`
    padding:14px;
    color:white;
    font-weight:500;
    display:inline-block;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(122,129,112,1) 0%, rgba(207,41,75,1) 0%, rgba(255,0,95,1) 100%);
    transition:all 0.2s ease-in;
    &:hover{
        background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(207,41,75,1) 0%, rgba(117,112,129,1) 0%, rgba(204,41,63,1) 0%, rgba(255,0,168,1) 100%);
    }
    `;

    const Input = styled.input`
            width:300px;
            padding:15px;
            display:inline-block;
            
    `;
    const TagsWrapper = styled.div`
    display:flex;
    flex-direction:row;
    padding:20px 10px;
    
`;

    const TagWrap = styled.span`
    padding:10px 25px;
    border-radius:24px;
    color:black;
    font-size:20px;
    font-weight:500;
    border: 3px solid rgb(199,1,98);
    background-color:rgba(0,0,0,0);
    cursor:pointer;
    margin:4px;
    transition:all 0.4s ease-in;
    &:hover{
        border-color:#b90000;
        background-color:#b90000;
        color:white;
    }
`;
    const TagInput = styled.input`
    text-align:center;
    color:black;
    font-weight:500;
    margin:0px;
    background: rgba(0,0,0,0);
    border:none;
    border:2px solid tomato;
    width: 400px;
    font-size: 26px;
    border-radius:16px;
    display:absolute;
    align-self: center;
    margin: 5px;
    margin-top:30px;
    left: 20px;
    padding-right:20px;
    padding-left:5px;
    padding-top:10px;
    padding-bottom:10px;
    transition: all 0.2s ease-in;
    &:focus{
    outline:none;
    color:white;
    background-color:#b90000;
    }
    `;

    const tagInputRef = useRef()

    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState("");
    const handleAddTag = (itemId) => {
        setShowModal(true);
        setId(itemId);
    }

    const toggleModal = () => {
        setShowModal(state => !state);
    }

    const [edit, setEdit] = useState(false)
    const [editData, setEditData] = useState({ id: "", name: "" })
    const handleEdit = (id, name) => {
        setEdit(true);
        setEditData({ id, name });
    }

    const [filter, setFilter] = useState("");

    return (

        <div>
            {
                showModal && id && <TagFormModal id={id} toggleModal={toggleModal} addTag={store.addTag} />
            }
            <Wrapper>
                <InnerWrapper>
                    <Header>
                        <h1 className="title">TODO List</h1>
                    </Header>
                    <Section>
                        <Ul>

                            {!edit && store.activeItems.map(item => (
                                <TodoListItem
                                    key={item.id}
                                    name={item.name}
                                    isComplete={item.isComplete}
                                    onComplete={() => store.setInProgress(item.id)}
                                    onChange={(e, ref) => { store.setItemName(item.id, e.target.value, ref); store.setFocusInput("addItemSearch") }}
                                    FocusInput={store.getFocusInput}
                                />
                            ))}
                            {
                                edit && <>
                                    <li className={className}>
                                        <Input autoFocus={store.getFocusInput === "editItem"} onChange={(e) => { setEditData({ ...editData, name: e.target.value }); store.setFocusInput("editItem") }} value={editData.name} />
                                        <FormButton onClick={() => { store.updateItem(editData); setEditData(""); setEdit(false) }}><Plus size={15} /></FormButton>
                                    </li>
                                </>
                            }
                        </Ul>
                        <Button onClick={() => { store.addItem(); store.setFocusInput("editItem"); }}>
                            Add New Item
                         </Button>
                    </Section>
                    <Section>
                        <TagInput autoFocus={store.getFocusInput === "tagSearch"} key={"tagInput"} name="tagInput" ref={tagInputRef} type="text" onChange={(e) => { store.setFilter(e.target.value); setFilter(e.target.value); store.setFocusInput("tagSearch") }} value={filter} placeholder="search a tag" />
                    </Section>
                    <Section>
                        <Header2>
                            <span>In Progress</span>
                        </Header2>

                        <Ul>
                            {store.inProgressItems.map(item => (

                                <InProgressItem key={item.id} item={item} deleteTag={store.deleteTag} handleAddTag={handleAddTag} onEdit={handleEdit} onDelete={() => { store.deleteItem(item.id) }} setAnimate={() => { store.setAnimate(item.id) }} onComplete={() => { store.setCompleted(item.id) }} />
                            ))}
                        </Ul>
                        < Header2>
                            <span>Completed Items</span>
                        </Header2>

                        <Ul>
                            {store.completedItems.map(item => (

                                <CompletedItem key={item.id} item={item} deleteTag={store.deleteTag} handleAddTag={handleAddTag} setAnimate={() => { store.setAnimate(item.id) }} onDelete={() => { store.deleteItem(item.id) }} />
                            ))}
                        </Ul>

                        <Header2>
                            <span>Tags</span>
                        </Header2>

                        <TagsWrapper>
                            {store.getUniquetags?.map(item => (<TagWrap key={item} onClick={() => { store.setFilter(item); setFilter(item) }}>{item}<span></span></TagWrap>))}
                            <TagWrap onClick={() => { store.setFilter(""); setFilter("") }}> Reset </TagWrap>
                        </TagsWrapper>
                        <Header2>
                            <span>Action Logs</span>
                        </Header2>
                        <ul style={{ listStyle: "none", textAlign: "initial" }}>
                            {
                                store.getActionLogs?.map(log => (<li>{log}</li>))
                            }
                        </ul>

                    </Section>
                </InnerWrapper>
            </Wrapper>
        </div>
    )
}


export default styled(observer(TodoList))`
    background-color: lightgray;
    padding:10px;

    .title {
        color: #3b82f5;
        text-align:center;
    };

    .completedTitle{
        margin-left:10px;
        background-color: white
    }

`
