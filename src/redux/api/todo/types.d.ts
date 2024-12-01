namespace TODO {
	type GetTodosResponse = ITodo[];
	type GetTodosRequest = void;


	type EditTodoResponse = ITodo[];
	type EditTodoRequest = {
		_id: number;
		data: ITodo;
	};

	type DeleteTodoResponse = ITodo[];
	type DeleteTodoRequest = number;

}
