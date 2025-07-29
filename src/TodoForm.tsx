import React from 'react';
import {Status, Todo} from '../type'

type TodoFormProps = {
    formData: {
        title: string;
        detail: string;
        status: Status;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isEditing: boolean;
};

const TodoForm: React.FC<TodoFormProps> = ({formData, onChange, onSubmit, isEditing}) => {
    return (
        <>
        <form onSubmit={onSubmit}>
            <input
            name="title"
            type="text"
            placeholder="タイトル"
            value={formData.title}
            onChange={onChange}
            />
            <br />
            <textarea
            name="detail"
            placeholder="詳細"
            value={formData.detail}
            onChange={onChange}
            />
            <br />
            <select name="status" value={formData.status} onChange={onChange}>
                <option value="pending">未着手</option>
                <option value="in-progress">進行中</option>
                <option value="done">完了</option>
            </select>
            <br />
            <button type="submit">{isEditing ? '編集' : '追加'}</button>
        </form>
        </>
    );
};

export default TodoForm;