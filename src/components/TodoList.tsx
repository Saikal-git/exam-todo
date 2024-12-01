"use client";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/redux/api/todo";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TodoList.module.scss";

const TodoList = () => {
  const { data, isLoading } = useGetTodosQuery();
  console.log("🚀 ~ TodoList ~ data:", data);
  const [editTodoMutation] = useEditTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [editId, setEditId] = useState<number | null>(null);
  const { register, handleSubmit, setValue } = useForm<ITodo>();

  const editTodo: SubmitHandler<ITodo> = async (data) => {
    await editTodoMutation({ _id: editId!, data });
    setEditId(null);
  };

  return (
    <div className={scss.TodoListBlock}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            {data?.map((item) => (
              <div key={item._id}>
                {editId === item._id ? (
                  <>
                    <form
                      className={scss.formListBlock}
                      onSubmit={handleSubmit(editTodo)}
                    >
                      <input
                        placeholder="edit title"
                        type="text"
                        {...register("title", { required: true })}
                      />
                      <input
                        placeholder="edit description"
                        type="text"
                        {...register("description", { required: true })}
                      />
                      <button type="submit">save</button>
                    </form>
                  </>
                ) : (
                  <div className={scss.TodoListDiv}>
                    <div className={scss.TodoListDiv2}>
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                      <img src={item.img} alt={item.title} />
                      <button onClick={() => deleteTodoMutation(item._id!)}>
                        remove
                      </button>
                      <button
                        onClick={() => {
                          setEditId(item._id!);
                          setValue("title", item.title);
                          setValue("description", item.description);
                        }}
                      >
                        edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
