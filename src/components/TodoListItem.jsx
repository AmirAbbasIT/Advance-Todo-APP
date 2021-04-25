import { observer } from 'mobx-react'
import styled from 'styled-components'
import { Plus } from 'react-feather';
import './index.css';
import { useRef } from 'react';

function TodoListItem({ className, name, onComplete, onChange, FocusInput }) {

    const ref = useRef();

    const Input = styled.input`
            width:300px;
            padding:15px;
            display:inline-block;        
    `;

    const Button = styled.li`
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

    return (

        <li className={className}>
            <Input autoFocus={FocusInput === "addItemSearch"} key={"add-item"} ref={ref} onChange={(e) => { onChange(e, ref) }} value={name} />
            <Button onClick={onComplete}><Plus size={15} /></Button>
        </li>

    )
}

export default styled(observer(TodoListItem))`
   width:100%;
`
