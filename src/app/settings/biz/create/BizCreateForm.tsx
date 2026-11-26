"use client";

import {
  Button,
  useForm,
  useTextForm,
  useTextInput,
  useToggle,
} from "@/components";
import { useJusoForm } from "@/app/features";
import { Biz } from "@/types";
import { regiValidator } from "@/validators";

type Props = {
  user_id: string;
  payload?: Biz;
};
const BizCreateForm = ({ user_id, payload }: Props) => {
  const Name = useTextInput({ value: payload?.name });
  const Regi = useTextInput({
    value: payload?.regi,
    validator: (r) => regiValidator(r),
  });
  const Ceo = useTextInput({ value: payload?.ceo });
  const Address = useJusoForm();
  const Add_Modal = useToggle();
  const Sub = useTextForm();
  const Sub_Modal = useToggle();

  const { Form, isPending, handler } = useForm();

  return (
    <>
      <Form>
        <Name.Component {...Name.props} />
        <Ceo.Component {...Ceo.props} />
        <Regi.Component {...Regi.props} />
        <Add_Modal.Trigger
          title="사업장 주소"
          button={
            Address.props.juso
              ? `${Address.props.juso.roadAddr}, ${Address.props.juso.rest}`
              : "주소 찾기"
          }
        />
        <Sub.Trigger
          title="교습 과목"
          button={"추가하기"}
          handler={Sub_Modal.handler}
        />
      </Form>
      <Sub.Component {...Sub.props} />
      {Add_Modal.toggled && (
        <Add_Modal.Modal>
          <Add_Modal.ModalBase>
            <Address.Component
              {...Address.props}
              cancelHandler={Add_Modal.handler}
            />
          </Add_Modal.ModalBase>
        </Add_Modal.Modal>
      )}
      {Sub_Modal.toggled && (
        <Sub_Modal.Modal>
          <Sub_Modal.ModalBase>
            <Sub.Component {...Sub.props} />
          </Sub_Modal.ModalBase>
        </Sub_Modal.Modal>
      )}
    </>
  );
};

export default BizCreateForm;
