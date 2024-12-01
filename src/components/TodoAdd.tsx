"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUploadFileMutation } from "@/redux/api/upload";
import scss from "./TodoList.module.scss";
import { usePostTodosMutation } from "@/redux/api/todo";

interface ITodo {
  title: string;
  description: string;
  img?: string; // Make sure these fields align with your backend
  file?: FileList;
}

const TodoAdd = () => {
  const [postTodosMutation] = usePostTodosMutation();
  const [uploadFileMutation] = useUploadFileMutation();
  const { register, handleSubmit, reset } = useForm<ITodo>();

  const sendTodo: SubmitHandler<ITodo> = async (data) => {
    try {
      const file = data.file![0];
      const formData = new FormData();
      formData.append("file", file);

      // Upload the file
      const { data: responseImage } = await uploadFileMutation(formData);

      // Prepare data for mutation
      const newTodoData = {
        title: data.title,
        description: data.description,
        img: responseImage?.url || "",
      };

      // Pass the prepared data
      await postTodosMutation(newTodoData);

      // Reset the form
      reset();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className={scss.TodoAddBlock}>
      <form className={scss.FormBlock} onSubmit={handleSubmit(sendTodo)}>
        <h2>Todo Add</h2>
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
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default TodoAdd;
