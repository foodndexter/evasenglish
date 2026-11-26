"use client";

const SettingsPage = () => {
  // const { biz, patch } = useBizStore();
  // if (!biz)
  return (
    <div>
      <h1>No Biz</h1>
    </div>
    //   );
    // return (
    //   <div>
    //     <div className="flex gap-2">
    //       <button
    //         onClick={async () => {
    //           const res = await fetch("/api/juso", { method: "PATCH" });
    //           const data = await res.json();
    //           console.log(data);
    //         }}
    //       >
    //         {biz.name}
    //       </button>
    //       <button>{biz.ceo}</button>
    //       <p>{new Date(biz.createdAt).toLocaleDateString()}</p>
    //     </div>
    //     <div className="flex gap-2">
    //       <button>{biz.regiNo}</button>
    //       <ul>
    //         {biz.subjects.map((subject) => (
    //           <li key={subject}>{subject}</li>
    //         ))}
    //       </ul>
    //     </div>
    //     <p>updated {fromNow(biz.updatedAt)} ago</p>
    //   </div>
  );
};

export default SettingsPage;
