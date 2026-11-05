"use client";

import { fromNow } from "@/utils";
import { useBizStore } from "../zustand";

const SettingsPage = () => {
  const { biz, patch } = useBizStore();
  if (!biz)
    return (
      <div>
        <h1>No Biz</h1>
        <button onClick={() => patch({ name: "둔산점 ㄱㄱ" })}>init</button>
      </div>
    );
  return (
    <div>
      <div className="flex gap-2">
        <button>{biz.name}</button>
        <button>{biz.ceo}</button>
        <p>{new Date(biz.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-2">
        <button>{biz.regiNo}</button>
        <ul>
          {biz.subjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </div>
      <p>updated {fromNow(biz.updatedAt)} ago</p>
    </div>
  );
};

export default SettingsPage;
