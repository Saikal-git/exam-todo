"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadFileMutation } from "@/redux/api/upload";
import scss from "./TodoList.module.scss";
import { usePostTodosMutation } from "@/redux/api/todo";
const TodoAdd = () => {
  const [postTodosMutation] = usePostTodosMutation();
  const [uploadFileMutation] = useUploadFileMutation();
  const { register, handleSubmit, reset } = useForm<ITodo>();

  const sendTodo: SubmitHandler<ITodo> = async (data) => {
    const file = data.file![0];
    const formData = new FormData();
    formData.append("file", file);
    const { data: responseImage } = await uploadFileMutation(formData);
    let newDAta = {
      title: data.title,
      description: data.description,
      img: responseImage?.url,
    };
    await postTodosMutation(newDAta);
    reset();
  };

  return (
    <div className={scss.TodoAddBlock}>
      <form className={scss.FormBlock} onSubmit={handleSubmit(sendTodo)}>
        <h2> TodoAdd</h2>
        <input
          placeholder="title"
          type="text"
          {...register("title", { required: true })}
        />
        <input
          placeholder="description"
          type="text"
          {...register("description", { required: true })}
        />
        <input
          className={scss.inputFile}
          type="file"
          {...register("file", { required: true })}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default TodoAdd;