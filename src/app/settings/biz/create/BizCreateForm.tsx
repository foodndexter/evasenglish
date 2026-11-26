"use client";

import { useTextInput } from "@/app/components";
import { Biz } from "@/types";


type Props ={
    user_id:string 
    payload?: Biz
}
const BizCreateForm = ({ user_id, payload}:Props) => {
    const Name = useTextInput({ value:payload?.name})
    const Regi =useTextInput({ value: payload?.regi, validator: r=> })
    const Ceo = useTextInput()
  return <div>BizCreateForm</div>;
};

export default BizCreateForm;
