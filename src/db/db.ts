import { DBSchema, IDBPDatabase, openDB } from "idb";
import { Todo } from "./todo";
import { Lesson, Memo, Parent, School, StudentEntity } from "@/types";

const DB_Name = "yoonbeeseo-db";
const DB_VERSION = 5;

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
  parents: {
    key: string;
    value: Parent;
    indexes: {
      "by-created-at": number;
      "by-updated-at": number;
      "by-student-id": string;
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
      "by-parent": string;
      "by-payment-date": number;
    };
  };
  count: {
    key: number;
    value: number;
  };
  memos: {
    key: string;
    value: Memo;
    indexes: {
      "by-created-at": number;
      "by-updated-at": number;
      "by-student-id": string;
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
          store.createIndex("by-parent", "parents");
          store.createIndex("by-payment-date", "paymentDate");
        }
        if (!db.objectStoreNames.contains("parents")) {
          const store = db.createObjectStore("parents", { keyPath: "id" });
          store.createIndex("by-created-at", "createdAt");
          store.createIndex("by-updated-at", "updatedAt");
          store.createIndex("by-student-id", "studentIds");
        }
        if (!db.objectStoreNames.contains("count")) {
          db.createObjectStore("count");
        }
        if (!db.objectStoreNames.contains("memos")) {
          const store = db.createObjectStore("memos", {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("by-created-at", "createdAt");
          store.createIndex("by-updated-at", "updatedAt");
          store.createIndex("by-student-id", "stduentId");
        }
        console.log("db upgraded");
      },
    }).catch((error) => {
      dbPromise = null;
      throw error;
    });
  }
  return dbPromise;
}
