"use client";

import { useToggle } from "./components";
import { StudentForm } from "./features";

const HomePage = () => {
  const M = useToggle();
  return (
    <main>
      {/* students here
      <button onClick={M.handler}>open modal</button>
      {M.toggled && (
        <M.Modal>
          <M.ModalBase>
            <StudentForm cancelHandler={M.handler} />
          </M.ModalBase>
        </M.Modal>
      )} */}
      <StudentForm cancelHandler={() => console.log("cancel!")} />
    </main>
  );
};

export default HomePage;
