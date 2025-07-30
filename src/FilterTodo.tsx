import React from 'react';
import {Status, statusLabel, Todo} from './type';


type filterTodoProps = {
    status: string;
    onSelect: (value: string) => void;
}

const FilterTodo: React.FC<filterTodoProps> = ({status, onSelect}) => {
    return (
        <div>
            <label htmlFor='filter'>ステータスで絞り込み</label>
            <select value={status} onChange={(e) => onSelect(e.target.value)}>
                <option value="all">全て</option>
                <option value="pending">未着手</option>
                <option value="in-progress">進行中</option>
                <option value="done">完了</option>
            </select>
        </div>
    );
};

export default FilterTodo;