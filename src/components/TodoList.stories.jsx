import React from 'react'

import TodoList from './TodoList'


const CONFIG = {
    title: 'Demo',
    component: TodoList,
    // argTypes: {
    //     // backgroundColor: { control: 'color' },
    // },
}

export default CONFIG;
export function Todo(args) {
    return (
        <TodoList
            {...args}
        />
    )
}
