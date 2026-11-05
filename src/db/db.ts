import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Todo } from "./todo";
import { Lesson, School, StudentEntity } from "@/types";

const DB_Name = "yoonbeeseo-db";
const DB_VERSION = 1;

type DB = DBSchema & {
  todos: {
    key: string;
    value: Todo;
    indexes: {
      "by-created-at": number;
    };
  };
  lessons: {
    key: string;
    value: Lesson;
    indexes: {
      "by-created-at": number;
      "by-updated-at": number;
    };
  };
  schools: {
    key: string;
    value: School;
    indexes: {
      "by-created-at": number;
      "by-updated-at": number;
    };
  };
  students: {
    key: string;
    value: StudentEntity;
    indexes: {
      "by-created-at": number;
      "by-updated-at": number;
      "by-school": string;
      "by-lesson": string;
      "by-mobile": string;
      "by-name": string;
    };
  };
  //! add stores
};

let dbPromise: Promise<IDBPDatabase<DB>> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("Client Only function");
  }
  if (!dbPromise) {
    dbPromise = openDB<DB>(DB_Name, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("todos")) {
          const store = db.createObjectStore("todos", { keyPath: "id" });
          store.createIndex("by-created-at", "createdAt");
        }
        if (!db.objectStoreNames.contains("schools")) {
          const store = db.createObjectStore("schools", { keyPath: "id" });
          store.createIndex("by-created-at", "createdAt");
          store.createIndex("by-updated-at", "updatedAt");
        }
        if (!db.objectStoreNames.contains("lessons")) {
          const store = db.createObjectStore("lessons", { keyPath: "id" });
          store.createIndex("by-created-at", "createdAt");
          store.createIndex("by-updated-at", "updatedAt");
        }
        if (!db.objectStoreNames.contains("students")) {
          const store = db.createObjectStore("students", { keyPath: "id" });
          store.createIndex("by-created-at", "createdAt");
          store.createIndex("by-updated-at", "updatedAt");
          store.createIndex("by-lesson", "lessons");
          store.createIndex("by-school", "schools");
          store.createIndex("by-mobile", "mobile");
          store.createIndex("by-name", "name");
        }
      },
    }).catch((error) => {
      dbPromise = null;
      throw error;
    });
  }
  return dbPromise;
}
