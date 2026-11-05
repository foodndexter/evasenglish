import { getDB } from "./db";

export type Todo = {
  title: string;
  id: string;
  isDone: boolean;
  createdAt: number;
  updatedAt: number;
};

type TodoPayload = Omit<Todo, "createdAt" | "updatedAt" | "id">;

export async function createTodo(payload: TodoPayload) {
  const db = await getDB();
  const createdAt = Date.now();
  const todo: Todo = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt,
    updatedAt: createdAt,
  };
  try {
    await db.add("todos", todo);
    return todo;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    return null;
  }
}

export async function getTodos() {
  const db = await getDB();
  const todos = await db.getAllFromIndex("todos", "by-created-at");
  return todos;
}

export async function getSingleTodo(id: string) {
  const db = await getDB();
  const todo = await db.get("todos", id);
  if (!todo) throw new Error("No such Todo");
  return todo;
}

export async function replaceTodo(payload: Todo) {
  const db = await getDB();
  const updatedTodo: Todo = { ...payload, updatedAt: Date.now() };
  await db.put("todos", updatedTodo);

  return updatedTodo;
}
