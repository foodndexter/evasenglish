import { Student } from "@/types";
import { useToggle } from "./components";
import {
  LessonForm,
  StudentForm,
  useLessonForm,
  useSchoolForm,
} from "./features";
import {
  IoCheckbox,
  IoCheckboxOutline,
  IoSquareOutline,
} from "react-icons/io5";
import { twMerge } from "tailwind-merge";

type Props = Student & {
  index: number;
  isIcon: boolean;
  numOfRow: number;
  selected: boolean;
  onSelect: () => void;
};
const StudentLi = ({
  index,
  isIcon,
  numOfRow,
  selected,
  onSelect,
  ...student
}: Props) => {
  const Edit = useToggle();

  const L = useToggle();
  const LF = useLessonForm({ payload: student.lessons });

  const S = useToggle();
  const SF = useSchoolForm(student.schools);

  const P = useToggle();

  return (
    <li>
      <div
        className={twMerge(
          "flex items-center hover:bg-primary/5",
          index % 2 &&
            "border-t border-zinc-200 dark:border-zinc-700 bg-primary/2",
        )}
      >
        <button
          onClick={Edit.handler}
          className="flex-1 p-1 items-center gap-1"
        >
          <span className="rounded px-1 size-5 flex justify-center items-center text-xs dark:bg-zinc-800 bg-zinc-100">
            {index + 1}
          </span>
          <p>{student.name}</p>
        </button>
        <div className="flex-1 flex md-mobile:flex-2 md:flex-3 flex-wrap items-center gap-2 text-xs">
          <ul className="flex flex-wrap gap-1" onClick={L.handler}>
            {student.lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="border rounded px-0.5 border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700"
              >
                {lesson.name}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-1" onClick={S.handler}>
            {student.schools.map((school) => (
              <li
                key={school.id}
                className="border rounded px-0.5 border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700"
              >
                {school.name} {school.description && school.description}
              </li>
            ))}
          </ul>
        </div>
        <button
          className={twMerge(
            "p-2 hover:text-primary",
            selected && "text-primary",
          )}
          onClick={onSelect}
        >
          {!selected ? <IoSquareOutline /> : <IoCheckbox />}
        </button>
      </div>
      {Edit.toggled && (
        <Edit.Modal>
          <Edit.ModalBase className="p-2">
            <StudentForm cancelHandler={Edit.handler} payload={student} />
          </Edit.ModalBase>
        </Edit.Modal>
      )}
      {L.toggled && (
        <L.Modal>
          <L.ModalBase>
            <LF.Component {...LF.props} />
          </L.ModalBase>
        </L.Modal>
      )}
      {S.toggled && (
        <S.Modal>
          <S.ModalBase>
            <SF.Component {...SF.props} />
          </S.ModalBase>
        </S.Modal>
      )}
    </li>
  );
};

export default StudentLi;
