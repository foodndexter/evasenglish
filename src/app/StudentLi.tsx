import { Student } from "@/types";
import { useToggle } from "./components";
import { StudentForm } from "./features";

type Props = Student & { index: number; isIcon: boolean; numOfRow: number };
const StudentLi = ({ index, isIcon, numOfRow, ...student }: Props) => {
  const Edit = useToggle();

  const L = useToggle();
  const S = useToggle();
  const P = useToggle();

  return (
    <li>
      <div className="flex items-center hover:bg-primary/10">
        <button onClick={Edit.handler} className="flex-1 p-1">
          <span>{index + 1}</span>
          <p>{student.name}</p>
        </button>
        <div className="flex-1">
          <div>{student.lessons.length}개 수강중</div>
        </div>
      </div>
      {Edit.toggled && (
        <Edit.Modal>
          <Edit.ModalBase className="p-2">
            <StudentForm cancelHandler={Edit.handler} payload={student} />
          </Edit.ModalBase>
        </Edit.Modal>
      )}
    </li>
  );
};

export default StudentLi;
