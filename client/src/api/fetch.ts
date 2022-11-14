import { SetStateAction } from "react"
import { dbService } from "../firebase"

export const fetchSetting = async (email?: string) => {
  await dbService.collection("evas").onSnapshot((snap) => {
    const copy = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    console.log(copy)
  })
}
