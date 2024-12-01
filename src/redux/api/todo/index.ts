import { api as index } from "..";

const ENDPOINT = "/da0ccb98035a1ed0eed79e2d00ae6fb7/exam";
const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TODO.GetTodosResponse, TODO.GetTodosRequest>({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodos: builder.mutation<TODO.GetTodosResponse, TODO.GetTodosRequest>({
      query: (data) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["todo"],
    }),
    editTodo: builder.mutation<TODO.EditTodoResponse, TODO.EditTodoRequest>({
      query: ({ _id, data }) => ({
        url: `/${ENDPOINT}/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation<
      TODO.DeleteTodoResponse,
      TODO.DeleteTodoRequest
    >({
      query: (id) => ({
        url: `/${ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useEditTodoMutation,
  useDeleteTodoMutation,
  usePostTodosMutation,
} = api;
