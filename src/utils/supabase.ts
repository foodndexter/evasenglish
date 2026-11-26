import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_KEY!;

export const supabase = createClient(url, key);

type SupabaseTable =
  | "users"
  | "user_biz"
  | "biz_parent"
  | "biz_lesson"
  | "biz_organization"
  | "biz_subject"
  | "biz_contact"
  | "biz_student"
  | "biz_payment"
  | "payment_item"
  | "user_tokens";

export const db = (table: SupabaseTable) => supabase.from(table);

export const userDB = db("users");
export const tokenDB = db("user_tokens");
export const bizDB = db("user_biz");
export const bizSubjectDB = db("biz_subject");
export const bizContactDB = db("biz_contact");
export const studentDB = db("biz_student");
export const lessonDB = db("biz_lesson");
export const parentDB = db("biz_parent");
export const organizationDB = db("biz_organization");
export const paymentDB = db("biz_payment");
export const paymentItemDB = db("payment_item");

export const userSelectQuery =
  "id, name, mobile, dob, juso, email, created_at, updated_at";
export const loginSelectQuery = `${userSelectQuery}, biz:user_biz(*, subejcts:biz_subject(value))`;
